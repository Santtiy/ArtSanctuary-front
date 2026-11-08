import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { Explore } from './explore';

describe('Explore', () => {
  let component: Explore;
  let fixture: ComponentFixture<Explore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Explore],
      providers: [provideRouter([{ path: 'gallery', children: [] }])],
    }).compileComponents();

    fixture = TestBed.createComponent(Explore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('template', () => {
    const element = () => fixture.nativeElement as HTMLElement;
    const input = () => element().querySelector('.explore__input') as HTMLInputElement;
    const clear = () => element().querySelector('.explore__clear') as HTMLElement | null;
    const empty = () => element().querySelector('.explore__empty')?.textContent?.trim();
    const headings = () =>
      Array.from(element().querySelectorAll('h2')).map((title) => title.textContent?.trim());
    const lastHeading = () => headings().at(-1);
    const results = () => element().querySelectorAll('.explore__grid .explore__item');
    const chips = () => Array.from(element().querySelectorAll<HTMLElement>('.chip'));
    const tags = () => Array.from(element().querySelectorAll<HTMLElement>('.tag'));

    const search = async (value: string) => {
      input().value = value;
      input().dispatchEvent(new Event('input'));
      await fixture.whenStable();
    };

    const toggleFilters = async () => {
      (element().querySelector('.explore__filters') as HTMLElement).click();
      await fixture.whenStable();
    };

    const selectChip = async (label: string) => {
      chips()
        .find((chip) => chip.textContent?.trim() === label)
        ?.click();
      await fixture.whenStable();
    };

    const clickTag = async (label: string) => {
      tags()
        .find((tag) => tag.textContent?.trim() === label)
        ?.click();
      await fixture.whenStable();
    };

    it('should show new records when nothing is being searched', () => {
      expect(lastHeading()).toBe('New records');
      expect(element().querySelectorAll('.explore__row .explore__item').length).toBe(6);
      expect(results().length).toBe(0);
      expect(clear()).toBeNull();
    });

    it('should list the disciplines with their totals', () => {
      const disciplines = Array.from(element().querySelectorAll('.explore__discipline')).map(
        (item) => [
          item.querySelector('.explore__discipline-name')?.textContent?.trim(),
          item.querySelector('.explore__discipline-count')?.textContent?.trim(),
        ],
      );

      expect(disciplines).toEqual([
        ['PAINTING', '10 Registered works'],
        ['ILLUSTRATION', '9 Registered works'],
        ['SCULPTURE', '8 Registered works'],
      ]);
    });

    it('should navigate to the gallery filtered by discipline', async () => {
      (element().querySelector('.explore__discipline') as HTMLElement).click();
      await fixture.whenStable();

      expect(TestBed.inject(Router).url).toBe('/gallery?category=painting');
    });

    it('should search by author', async () => {
      await search('maría');

      expect(lastHeading()).toBe('Results (10)');
      expect(results().length).toBe(10);
    });

    it('should search by title without matching case', async () => {
      await search('SEMILLA');

      expect(lastHeading()).toBe('Results (1)');
    });

    it('should search by category', async () => {
      await search('sculpture');

      expect(lastHeading()).toBe('Results (8)');
    });

    it('should ignore surrounding spaces', async () => {
      await search('  semilla  ');
      expect(lastHeading()).toBe('Results (1)');

      await search('   ');
      expect(lastHeading()).toBe('New records');
    });

    it('should show the searched text when there are no results', async () => {
      await search('zzz');

      expect(lastHeading()).toBe('Results (0)');
      expect(empty()).toBe('No results for “zzz”');
    });

    it('should clear the search with the clear button', async () => {
      await search('maría');

      clear()?.click();
      await fixture.whenStable();

      expect(input().value).toBe('');
      expect(lastHeading()).toBe('New records');
      expect(clear()).toBeNull();
    });

    it('should open and close the filter panel', async () => {
      expect(chips().length).toBe(0);

      await toggleFilters();
      expect(chips().map((chip) => chip.textContent?.trim())).toEqual([
        'ALL',
        'PAINTING',
        'SCULPTURE',
        'ILLUSTRATION',
        'PHOTOGRAPHY',
      ]);

      await toggleFilters();
      expect(chips().length).toBe(0);
    });

    it.each([
      ['PAINTING', 10],
      ['SCULPTURE', 8],
      ['ILLUSTRATION', 9],
    ])('should filter %s with %i results', async (label, total) => {
      await toggleFilters();
      await selectChip(label);

      const active = chips().filter((chip) => chip.classList.contains('chip--active'));

      expect(lastHeading()).toBe(`Results (${total})`);
      expect(active.map((chip) => chip.textContent?.trim())).toEqual([label]);
    });

    it('should show a category message when a category has no artworks', async () => {
      await toggleFilters();
      await selectChip('PHOTOGRAPHY');

      expect(lastHeading()).toBe('Results (0)');
      expect(empty()).toBe('No works in this category yet.');
    });

    it('should combine the text and the category', async () => {
      await toggleFilters();
      await search('maría');

      await selectChip('PAINTING');
      expect(lastHeading()).toBe('Results (10)');

      await selectChip('SCULPTURE');
      expect(lastHeading()).toBe('Results (0)');
      expect(empty()).toBe('No results for “maría”');
    });

    it('should return to new records with the ALL filter', async () => {
      await toggleFilters();
      await selectChip('SCULPTURE');
      await selectChip('ALL');

      expect(lastHeading()).toBe('New records');
    });

    it('should search the selected tag and mark it', async () => {
      await clickTag('#ABSTRACT');

      const active = tags().filter((tag) => tag.classList.contains('tag--active'));

      expect(input().value).toBe('abstract');
      expect(active.map((tag) => tag.textContent?.trim())).toEqual(['#ABSTRACT']);
      expect(empty()).toBe('No results for “abstract”');
    });

    it('should move the mark when another tag is selected', async () => {
      await clickTag('#ABSTRACT');
      await clickTag('#OIL');

      const active = tags().filter((tag) => tag.classList.contains('tag--active'));

      expect(input().value).toBe('oil');
      expect(active.map((tag) => tag.textContent?.trim())).toEqual(['#OIL']);
    });

    it('should clear the search when the selected tag is clicked again', async () => {
      await clickTag('#ABSTRACT');
      await clickTag('#ABSTRACT');

      expect(input().value).toBe('');
      expect(tags().some((tag) => tag.classList.contains('tag--active'))).toBe(false);
      expect(lastHeading()).toBe('New records');
    });
  });
});
