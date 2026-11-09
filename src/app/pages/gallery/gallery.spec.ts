import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { LikesService } from '../../services/likes.service';
import { Gallery } from './gallery';

describe('Gallery', () => {
  let component: Gallery;
  let fixture: ComponentFixture<Gallery>;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [Gallery],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Gallery);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('template', () => {
    const element = () => fixture.nativeElement as HTMLElement;
    const cards = () => element().querySelectorAll('app-artwork-card');
    const count = () => element().querySelector('.gallery__count')?.textContent?.trim();
    const empty = () => element().querySelector('.gallery__empty');
    const tabs = () => Array.from(element().querySelectorAll<HTMLElement>('.gallery__tab'));
    const activeTabs = () => tabs().filter((tab) => tab.classList.contains('gallery__tab--active'));

    const selectTab = async (label: string) => {
      tabs()
        .find((tab) => tab.textContent?.trim() === label)
        ?.click();
      await fixture.whenStable();
    };

    it('should show the five filters in uppercase', () => {
      expect(tabs().map((tab) => tab.textContent?.trim())).toEqual([
        'ALL',
        'PAINTING',
        'SCULPTURE',
        'ILLUSTRATION',
        'PHOTOGRAPHY',
      ]);
    });

    it('should show every artwork by default', () => {
      expect(cards().length).toBe(27);
      expect(count()).toBe('27 works');
      expect(activeTabs().map((tab) => tab.textContent?.trim())).toEqual(['ALL']);
      expect(empty()).toBeNull();
    });

    it.each([
      ['PAINTING', 10],
      ['SCULPTURE', 8],
      ['ILLUSTRATION', 9],
    ])('should filter %s with %i artworks', async (label, total) => {
      await selectTab(label);

      expect(cards().length).toBe(total);
      expect(count()).toBe(`${total} works`);
      expect(activeTabs().map((tab) => tab.textContent?.trim())).toEqual([label]);
      expect(empty()).toBeNull();
    });

    it('should show the empty state for a category without artworks', async () => {
      await selectTab('PHOTOGRAPHY');

      expect(cards().length).toBe(0);
      expect(count()).toBe('0 works');
      expect(empty()?.textContent).toContain('No works in this category yet.');
    });

    it('should return to every artwork after filtering', async () => {
      await selectTab('PHOTOGRAPHY');
      await selectTab('ALL');

      expect(cards().length).toBe(27);
      expect(empty()).toBeNull();
    });

    it('should toggle a like through the shared service', async () => {
      const firstLike = () => element().querySelector('.artwork-card__like') as HTMLElement;

      firstLike().click();
      await fixture.whenStable();

      expect(TestBed.inject(LikesService).isLiked(1)).toBe(true);
      expect(firstLike().classList.contains('artwork-card__like--active')).toBe(true);
    });
  });
});

describe('Gallery query params', () => {
  const createWithCategory = async (category: string | null) => {
    await TestBed.configureTestingModule({
      imports: [Gallery],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { queryParamMap: convertToParamMap(category ? { category } : {}) },
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(Gallery);
    await fixture.whenStable();

    return fixture;
  };

  it('should select the category from the URL', async () => {
    const fixture = await createWithCategory('sculpture');

    expect(fixture.componentInstance.selected()).toBe('sculpture');
    expect(fixture.componentInstance.filteredArtworks().length).toBe(8);
  });

  it('should show the empty state when the URL has a category without artworks', async () => {
    const fixture = await createWithCategory('photography');
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('.gallery__empty')).not.toBeNull();
  });

  it('should ignore an unknown category', async () => {
    const fixture = await createWithCategory('unknown');

    expect(fixture.componentInstance.selected()).toBe('all');
    expect(fixture.componentInstance.filteredArtworks().length).toBe(27);
  });

  it('should use all when the URL has no category', async () => {
    const fixture = await createWithCategory(null);

    expect(fixture.componentInstance.selected()).toBe('all');
  });
});
