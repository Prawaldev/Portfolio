import { useEffect, useMemo, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { NodeId } from '../data';
import { profile, projects, socials, favoriteGames } from '../data';

interface InfoPanelProps {
  node: NodeId | null;
  onClose: () => void;
}

const InfoPanel = ({ node, onClose }: InfoPanelProps) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = node !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const content = useMemo(() => (open ? getContent(node) : null), [open, node]);

  return (
    <AnimatePresence>
      {open && content && (
        <motion.div
          className="info-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="panel-title"
            className="info-wrap"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <div className="flex items-center justify-between">
              <h2 id="panel-title" className="info-title" style={{ color: content.color }}>
                {content.title}
              </h2>
              <button
                type="button"
                ref={closeRef}
                onClick={onClose}
                aria-label="Close"
                className="info-close"
              >
                ×
              </button>
            </div>

            <div className="mt-5 text-sm leading-relaxed">{content.body}</div>

            {content.footer && <div className="mt-6">{content.footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface PanelContent {
  title: string;
  color: string;
  body: React.ReactNode;
  footer?: React.ReactNode;
}

function getContent(node: NodeId): PanelContent {
  switch (node) {
    case 'about':
      return {
        title: 'About me',
        color: '#a78bfa',
        body: (
          <>
            <p className="text-ink/60">{profile.bio}</p>
            <div className="mt-5">
              <p className="panel-label text-ink/40">technologies</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {profile.technologies.map((t) => (
                  <span key={t} className="tech-chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </>
        ),
      };

    case 'projects':
      return {
        title: 'Projects',
        color: '#22d3ee',
        body: (
          <div className="space-y-4">
            {projects.map((p) => (
              <div key={p.title} className="border border-white/10 bg-black/40 p-3">
                <div className="flex items-start gap-3">
                  <a href={p.live} target="_blank" rel="noopener noreferrer" aria-label={`Open ${p.title} live`}>
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-14 w-20 flex-none border border-white/10 object-cover transition hover:opacity-80"
                      loading="lazy"
                      draggable={false}
                    />
                  </a>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-lg font-bold text-ink">{p.title}</h3>
                    </div>
                    <p className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-cyan-300/50">
                      {p.tech.join(' · ')}
                    </p>
                    <p className="mt-2 text-[13px] leading-relaxed text-ink/60">{p.description}</p>
                    <div className="mt-2 flex gap-3">
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className="panel-link">
                        github ↗
                      </a>
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="panel-link">
                        live ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ),
      };

    case 'github': {
      const github = socials.find((s) => s.label === 'GitHub');
      return {
        title: 'GitHub',
        color: '#c4b5fd',
        body: <p className="text-ink/60">Explore my repositories.</p>,
        footer: github && (
          <a href={github.url} target="_blank" rel="noopener noreferrer" className="panel-cta">
            Open GitHub ↗
          </a>
        ),
      };
    }

    case 'discord': {
      const discord = socials.find((s) => s.label === 'Discord');
      return {
        title: 'Discord',
        color: '#5865f2',
        body: (
          <>
            <img
              src="/discord.png"
              alt="Discord"
              className="mb-5 block h-auto w-full border border-white/10 bg-white/5 object-contain"
              loading="lazy"
              draggable={false}
            />
            <p className="text-ink/60">Connect with me on Discord.</p>
          </>
        ),
        footer: discord && (
          <a href={discord.url} target="_blank" rel="noopener noreferrer" className="panel-cta">
            Open Discord ↗
          </a>
        ),
      };
    }

    case 'games':
      return {
        title: 'Games',
        color: '#fb7185',
        body: (
          <div className="space-y-3">
            {favoriteGames.map((g) => (
              <a
                key={g.name}
                href={g.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border border-white/10 bg-black/40 p-2.5 transition hover:opacity-85 hover:border-white/25"
              >
                <img
                  src={g.image}
                  alt={g.name}
                  className="h-12 w-16 flex-none border border-white/10 object-cover"
                  loading="lazy"
                  draggable={false}
                />
                <span className="text-sm font-semibold text-ink">{g.name}</span>
              </a>
            ))}
          </div>
        ),
      };
  }
}

export default InfoPanel;