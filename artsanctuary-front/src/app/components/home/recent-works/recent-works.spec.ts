import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RecentWorks } from './recent-works';

describe('RecentWorks', () => {
  let component: RecentWorks;
  let fixture: ComponentFixture<RecentWorks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentWorks],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(RecentWorks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show six artworks', () => {
    expect(component.artworks().length).toBe(6);
  });
});
