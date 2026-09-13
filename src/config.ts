import type { NodeId } from './data';

export const corePositions: Record<NodeId, [number, number, number]> = {
  about: [0, 0, 0],
  projects: [-2.75, -0.08, 1.05],
  github: [2.3, 0.42, -1.15],
  discord: [-0.7, 1.15, -1.9],
  games: [1.75, -1.5, 1.15],
};

export const nodeSize: Record<NodeId, number> = {
  about: 0.4,
  projects: 0.3,
  github: 0.3,
  discord: 0.3,
  games: 0.3,
};