import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolCard } from './tool-card';

describe('ToolCard', () => {
  let component: ToolCard;
  let fixture: ComponentFixture<ToolCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tool', {
      id: 1,
      name: 'Boards',
      description: 'Infinite canvas',
      icon: 'dashboard',
      free: true,
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
