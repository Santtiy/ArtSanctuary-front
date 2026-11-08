
import { CommonModule } from '@angular/common';

import {
  Component,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { ToolCard } from '../../components/tool-card/tool-card';
import { TOOLS } from '../../data/tools';
import type { Tool } from '../../models/tool.model';

@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [CommonModule, ToolCard],
  templateUrl: './tools.html',
  styleUrl: './tools.scss'
})
export class Tools implements OnInit {

  // Colección reactiva de herramientas.
  readonly tools = signal<Tool[]>(TOOLS);

  // Identificador de la herramienta seleccionada.
  readonly highlightedId = signal<number | null>(null);

  // Cantidad de herramientas gratuitas.
  readonly freeCount = computed(() =>
    this.tools().filter((tool) => tool.free).length
  );

  // Herramienta seleccionada, derivada del estado.
  readonly selectedTool = computed<Tool | null>(() =>
    this.tools().find(
      (tool) => tool.id === this.highlightedId()
    ) ?? null
  );

  // Servicio para obtener parámetros de la URL.
  private readonly route = inject(ActivatedRoute);

  // Inicialización de la página.
  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('tool');

    if (id !== null) {
      const toolId = Number(id);

      // Verifica que el ID exista en la colección.
      const exists = this.tools().some(
        (tool) => tool.id === toolId
      );

      if (id.trim() !== '' && Number.isFinite(toolId) && exists) {
        this.highlightedId.set(toolId);
      }
    }
  }

  // Selecciona o deselecciona una herramienta.
  onToolSelected(tool: Tool): void {
    this.highlightedId.update((currentId) =>
      currentId === tool.id ? null : tool.id
    );
  }
}
