import { lazy, Suspense, useCallback, useState } from 'react';
import type { NodeId } from '../data';
import InfoPanel from './InfoPanel';

const Scene3D = lazy(() => import('./Scene3D'));

const Universe = () => {
  const [hovered, setHovered] = useState(false);
  const [activeNode, setActiveNode] = useState<NodeId | null>(null);

  const handleHover = useCallback((h: boolean) => setHovered(h), []);
  const handleSelect = useCallback((id: NodeId) => setActiveNode(id), []);
  const closeModal = useCallback(() => setActiveNode(null), []);

  return (
    <div className="universe">
      <div className="universe-scene" style={{ cursor: hovered ? 'pointer' : 'grab' }}>
        <Suspense
          fallback={
            <div className="grid h-full w-full place-items-center" aria-hidden="true">
              <div className="loading-core" />
            </div>
          }
        >
          <Scene3D onHover={handleHover} onSelect={handleSelect} />
        </Suspense>
      </div>

      <p className="universe-hint">drag to explore</p>

      <InfoPanel node={activeNode} onClose={closeModal} />
    </div>
  );
};

export default Universe;