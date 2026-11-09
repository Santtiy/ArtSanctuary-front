import { Tool } from '../models/tool.model';

export const TOOLS: Tool[] = [
  { id: 1, name: 'Boards', icon: 'dashboard', free: true, description: 'Miro-like infinite canvas: images, text, and shapes on graph paper. Save your boards per account.' },
  { id: 2, name: 'Crop', icon: 'crop', free: true, description: 'Crop images, manual and automatic. Export PNG.' },
  { id: 3, name: 'Remove background', icon: 'background_replace', free: true, description: 'Remove the background (AI or magic wand). Export a transparent PNG.' },
  { id: 4, name: 'Reference Grid', icon: 'select_all', free: true, description: 'Overlays a grid on your reference images.' },
  { id: 5, name: 'Notan', icon: 'contrast', free: true, description: 'Simplifies light and shadow values for strong compositions.' },
  { id: 6, name: 'Color Mixing', icon: 'palette', free: true, description: 'Experiment with digital mixes of traditional pigments.' },
  { id: 7, name: 'Gesture Drawing', icon: 'schedule', free: true, description: 'Timed practice sessions with random references.' },
  { id: 8, name: 'Proportion Canon', icon: 'accessibility_new', free: true, description: 'Technical guide of human proportions based on head units for anatomical studies.' },
];
