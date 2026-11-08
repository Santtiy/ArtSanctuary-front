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
});
