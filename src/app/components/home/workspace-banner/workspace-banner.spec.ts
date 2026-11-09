import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { WorkspaceBanner } from './workspace-banner';

describe('WorkspaceBanner', () => {
  let component: WorkspaceBanner;
  let fixture: ComponentFixture<WorkspaceBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceBanner],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkspaceBanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('links to the workspace page', () => {
    const link: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
    expect(link.getAttribute('href')).toBe('/dashboard/workspaces');
  });
});
