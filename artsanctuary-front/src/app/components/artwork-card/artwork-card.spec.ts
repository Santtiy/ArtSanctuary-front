import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtworkCard } from './artwork-card';

describe('ArtworkCard', () => {
  let component: ArtworkCard;
  let fixture: ComponentFixture<ArtworkCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtworkCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtworkCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('artwork', {
      id: 1,
      title: 'Semilla',
      author: 'Carlos Muñoz',
      category: 'sculpture',
      image: '/images/artworks/artwork-13.jpg',
      likes: 2,
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add one to the total when liked', () => {
    expect(component.totalLikes).toBe(2);
    fixture.componentRef.setInput('liked', true);
    expect(component.totalLikes).toBe(3);
  });

  describe('template', () => {
    const element = () => fixture.nativeElement as HTMLElement;
    const likeButton = () => element().querySelector('.artwork-card__like') as HTMLButtonElement;

    it('should show the artwork data', () => {
      const image = element().querySelector('.artwork-card__image') as HTMLImageElement;

      expect(image.getAttribute('src')).toBe('/images/artworks/artwork-13.jpg');
      expect(image.getAttribute('alt')).toBe('Semilla');
      expect(element().querySelector('.artwork-card__badge')?.textContent).toContain('SCULPTURE');
      expect(element().querySelector('.artwork-card__title')?.textContent).toContain('SEMILLA');
      expect(element().querySelector('.artwork-card__author')?.textContent).toContain(
        'Carlos Muñoz',
      );
    });

    it('should show the inactive heart and the base counter', () => {
      expect(likeButton().classList.contains('artwork-card__like--active')).toBe(false);
      expect(likeButton().textContent).toContain('2');
    });

    it('should show the active heart and one more like', async () => {
      fixture.componentRef.setInput('liked', true);
      await fixture.whenStable();

      expect(likeButton().classList.contains('artwork-card__like--active')).toBe(true);
      expect(likeButton().textContent).toContain('3');
    });

    it('should emit the artwork id once when the heart is clicked', () => {
      const emitted: number[] = [];
      component.likeToggled.subscribe((id) => emitted.push(id));

      likeButton().click();

      expect(emitted).toEqual([1]);
    });

    it('should not propagate the heart click to the card', () => {
      let propagated = false;
      element().addEventListener('click', () => (propagated = true));

      likeButton().click();

      expect(propagated).toBe(false);
    });
  });
});
