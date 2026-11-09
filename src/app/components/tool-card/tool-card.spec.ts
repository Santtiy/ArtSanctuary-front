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

  describe('template', () => {
    const element = () => fixture.nativeElement as HTMLElement;
    const card = () => element().querySelector('.tool-card') as HTMLElement;

    it('should use the home variant by default', () => {
      expect(card().classList.contains('tool-card--home')).toBe(true);
      expect(card().classList.contains('tool-card--page')).toBe(false);
    });

    it('should show the home structure', () => {
      expect(element().querySelector('.tool-card__home-icon')?.textContent).toContain('dashboard');
      expect(element().querySelector('.tool-card__description')?.textContent).toContain(
        'Infinite canvas',
      );
      expect(element().querySelector('.tool-card__bar-name')?.textContent).toContain('BOARDS');
      expect(element().querySelector('.tool-card__arrow')).not.toBeNull();
      expect(element().querySelector('.tool-card__name')).toBeNull();
      expect(element().querySelector('.tool-card__free')).toBeNull();
    });

    it('should show the page structure', async () => {
      fixture.componentRef.setInput('variant', 'page');
      await fixture.whenStable();

      expect(card().classList.contains('tool-card--page')).toBe(true);
      expect(card().classList.contains('tool-card--home')).toBe(false);
      expect(element().querySelector('.tool-card__page-icon')?.textContent).toContain('dashboard');
      expect(element().querySelector('.tool-card__name')?.textContent).toContain('Boards');
      expect(element().querySelector('.tool-card__text')?.textContent).toContain(
        'Infinite canvas',
      );
      expect(element().querySelector('.tool-card__free')?.textContent).toContain('FREE');
      expect(element().querySelector('.tool-card__bar')).toBeNull();
    });

    it('should hide the FREE label when the tool is not free', async () => {
      fixture.componentRef.setInput('variant', 'page');
      fixture.componentRef.setInput('tool', { ...component.tool, free: false });
      await fixture.whenStable();

      expect(element().querySelector('.tool-card__free')).toBeNull();
    });

    it('should apply the highlighted class only when requested', async () => {
      expect(card().classList.contains('tool-card--highlighted')).toBe(false);

      fixture.componentRef.setInput('highlighted', true);
      await fixture.whenStable();

      expect(card().classList.contains('tool-card--highlighted')).toBe(true);
    });

    it.each(['home', 'page'])('should emit the tool when the %s card is clicked', async (variant) => {
      const emitted: unknown[] = [];
      component.selectTool.subscribe((tool) => emitted.push(tool));
      fixture.componentRef.setInput('variant', variant);
      await fixture.whenStable();

      card().click();

      expect(emitted).toEqual([component.tool]);
    });
  });
});
