import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tool } from '../../models/tool.model';

@Component({
  imports: [CommonModule],
  selector: 'app-tool-card',
  styleUrl: './tool-card.scss',
  templateUrl: './tool-card.html',
})
export class ToolCard {
  @Input({ required: true }) tool!: Tool;
  @Input() variant: 'home' | 'page' = 'home';
  @Input() highlighted = false;

  @Output() selectTool = new EventEmitter<Tool>();

  onSelect(): void {
    this.selectTool.emit(this.tool);
  }
}
