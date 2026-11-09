import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, signal } from '@angular/core';
import { Project } from '../../models/project.model';

@Component({
  imports: [CommonModule],
  selector: 'app-workspace',
  styleUrl: './workspace.scss',
  templateUrl: './workspace.html',
})
export class Workspace implements OnInit {
  private readonly STORAGE_KEY = 'as_projects';
  projects = signal<Project[]>([]);
  showForm = signal(false);
  total = computed(() => this.projects().length);
  accreditedCount = computed(() => this.projects().filter(p => p.accredited).length);

  ngOnInit(): void {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (raw) this.projects.set(JSON.parse(raw));
  }

  private save(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.projects()));
  }

  openForm(): void { this.showForm.set(true); }
  closeForm(): void { this.showForm.set(false); }

  createProject(name: string): void {
    name = name.trim();
    if (!name) return;
    this.projects.update(list => [...list, {
      id: Date.now(), name, accredited: false, createdAt: new Date().toISOString(),
    }]);
    this.save();
    this.closeForm();
  }

  toggleAccreditation(id: number): void {
    this.projects.update(list => list.map(p => p.id === id ? { ...p, accredited: !p.accredited } : p));
    this.save();
  }

  deleteProject(id: number): void {
    this.projects.update(list => list.filter(p => p.id !== id));
    this.save();
  }
}
