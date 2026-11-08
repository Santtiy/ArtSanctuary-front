import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TOOLS } from '../../../data/tools';
import { Tool } from '../../../models/tool.model';
import { ToolCard } from '../../tool-card/tool-card';

@Component({
  imports: [CommonModule, ToolCard],
  selector: 'app-tools-section',
  styleUrl: './tools-section.scss',
  templateUrl: './tools-section.html',
})
export class ToolsSection {
  private router = inject(Router);

  tools = signal<Tool[]>(TOOLS);

  onToolSelected(tool: Tool): void {
    console.log('Herramienta seleccionada:', tool.name);
    this.router.navigate(['/dashboard/tools'], { queryParams: { tool: tool.id } });
  }
}
