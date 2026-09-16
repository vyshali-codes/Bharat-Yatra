import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { LOCATIONS_DATA, SPECIAL_BLOCK_CONFIG } from '../data/locations';
import { LocationData } from '../types/game';
import { SpecialBlockBadge } from './SpecialBlockBadge';
import { getIndiaOutlineSvgPath, getProjectedLocationCoord, MAP_CONFIG } from '../data/indiaGeoMap';
import { MapPin, Navigation, ZoomIn, ZoomOut, RotateCcw, Compass, Info, X } from 'lucide-react';

interface Props {
  interactive?: boolean;
  compact?: boolean;
  highlightCurrentPlayer?: boolean;
}

export const IndiaMapBoard: React.FC<Props> = ({
  interactive = true,
  compact = false,
  highlightCurrentPlayer = true
}) => {
  const { players, currentPlayer, currentLocation } = useGame();
  const [selectedNode, setSelectedNode] = useState<LocationData | null>(null);
  const [hoveredNode, setHoveredNode] = useState<LocationData | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Group players by position
  const playersByPosition: Record<number, typeof players> = {};
  players.forEach((p) => {
    if (!playersByPosition[p.position]) {
      playersByPosition[p.position] = [];
    }
    playersByPosition[p.position].push(p);
  });

  // Calculate polyline coordinates for the connecting journey route (1 -> 80)
  const routePoints = LOCATIONS_DATA.map((loc) => {
    const pt = getProjectedLocationCoord(loc.id);
    return `${pt.x},${pt.y}`;
  }).join(' ');

  // Accurate SVG boundary path
  const indiaOutlinePath = getIndiaOutlineSvgPath();

  const activeNode = selectedNode || hoveredNode || currentLocation;

  return (
    <div
      id="india-board-container"
      className="relative flex flex-col w-full bg-linear-to-b from-[#FFFDF9] to-[#FDF8EE] border border-amber-200/90 rounded-2xl shadow-sm overflow-hidden"
    >
      {/* Map Header & Controls */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-amber-200/60 bg-white/80 backdrop-blur-xs">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-700">
            <Compass className="w-4 h-4" />
          </span>
          <div>
            <h3 className="font-serif-heritage text-sm font-bold text-slate-900 tracking-wide">
              Bharat Yatra Geographic Route (80 Milestones)
            </h3>
            <p className="text-xs text-slate-500">
              Kanyakumari (1) → Deccan → West → Central → East → Northeast → Himalayas (80)
            </p>
          </div>
        </div>

        {/* Zoom controls */}
        {!compact && (
          <div className="flex items-center gap-1 bg-amber-100/60 p-1 rounded-lg border border-amber-200 text-slate-700">
            <button
              id="zoom-in-btn"
              onClick={() => setZoomLevel((z) => Math.min(1.75, z + 0.15))}
              className="p-1.5 hover:bg-white rounded text-slate-700 hover:text-amber-800 transition cursor-pointer"
              title="Zoom In"
              aria-label="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              id="zoom-out-btn"
              onClick={() => setZoomLevel((z) => Math.max(0.85, z - 0.15))}
              className="p-1.5 hover:bg-white rounded text-slate-700 hover:text-amber-800 transition cursor-pointer"
              title="Zoom Out"
              aria-label="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              id="zoom-reset-btn"
              onClick={() => setZoomLevel(1)}
              className="p-1.5 hover:bg-white rounded text-slate-700 hover:text-amber-800 transition cursor-pointer"
              title="Reset Zoom"
              aria-label="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* SVG Map Canvas with Accurate Geographic India Base Layer */}
      <div className="relative w-full overflow-auto flex-1 min-h-[460px] max-h-[660px] p-2 bg-[#FFFDF8] flex items-center justify-center">
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top center',
            transition: 'transform 0.2s ease-out'
          }}
          className="relative w-full max-w-[850px] aspect-4/5 select-none"
        >
          <svg
            viewBox={MAP_CONFIG.viewBox}
            className="w-full h-full drop-shadow-xs"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Radial gradient for route glow */}
              <linearGradient id="routeGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#ea580c" />
                <stop offset="50%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#16a34a" />
              </linearGradient>

              {/* Subcontinent landmass linear gradient */}
              <linearGradient id="indiaLandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF9EE" />
                <stop offset="50%" stopColor="#FAF2DF" />
                <stop offset="100%" stopColor="#F5EBD0" />
              </linearGradient>

              {/* Glow filter for active player and special landmarks */}
              <filter id="glowEffect" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Surrounding oceanic water tint */}
            <rect width="920" height="1060" fill="#F4F8FA" rx="16" />

            {/* Coastline soft shadow / bathymetry ring */}
            <path
              d={indiaOutlinePath}
              fill="none"
              stroke="#DCEAF2"
              strokeWidth="16"
              strokeLinejoin="round"
              strokeLinecap="round"
              className="opacity-70"
            />

            {/* Accurate Geographic Outline of India (Bundled vector path) */}
            <path
              id="india-mainland-boundary"
              d={indiaOutlinePath}
              fill="url(#indiaLandGradient)"
              stroke="#D4B982"
              strokeWidth="2.5"
              strokeLinejoin="round"
              className="drop-shadow-xs"
            />

            {/* Andaman & Nicobar Islands (Stylized archipelago representation) */}
            <g id="andaman-nicobar" fill="#FAF2DF" stroke="#D4B982" strokeWidth="1.5">
              <ellipse cx="845" cy="740" rx="6" ry="14" />
              <ellipse cx="848" cy="775" rx="5" ry="10" />
              <ellipse cx="854" cy="830" rx="7" ry="12" />
              <text x="845" y="855" fontSize="7.5px" fill="#78716c" fontFamily="sans-serif" textAnchor="middle">
                Andaman & Nicobar
              </text>
            </g>

            {/* Lakshadweep Islands */}
            <g id="lakshadweep" fill="#FAF2DF" stroke="#D4B982" strokeWidth="1.5">
              <circle cx="165" cy="760" r="4.5" />
              <circle cx="170" cy="785" r="4" />
              <circle cx="175" cy="820" r="4.5" />
              <text x="170" y="840" fontSize="7.5px" fill="#78716c" fontFamily="sans-serif" textAnchor="middle">
                Lakshadweep
              </text>
            </g>

            {/* Subcontinent Waterways (Ganga, Brahmaputra, Narmada, Godavari subtle curves) */}
            <g stroke="#C6E2EE" strokeWidth="1.8" fill="none" opacity="0.65" strokeLinecap="round">
              {/* Ganga */}
              <path d="M 330 255 Q 450 330 580 430 Q 640 480 670 540" />
              {/* Brahmaputra */}
              <path d="M 750 250 Q 820 280 810 330 Q 750 360 670 530" />
              {/* Narmada */}
              <path d="M 440 540 Q 320 545 220 550" />
              {/* Godavari */}
              <path d="M 230 630 Q 340 650 490 690" />
            </g>

            {/* Decorative Subcontinent Watermark */}
            <text
              x="450"
              y="570"
              textAnchor="middle"
              className="text-[44px] fill-amber-900/8 font-serif-heritage font-black tracking-[0.35em] uppercase pointer-events-none select-none"
            >
              BHARAT
            </text>

            {/* Connecting Travel Route (1 -> 80) */}
            <polyline
              points={routePoints}
              fill="none"
              stroke="url(#routeGradient)"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="5 3"
              className="opacity-85"
            />

            {/* 80 Location Markers (Requirement 11 & 12) */}
            {LOCATIONS_DATA.map((loc) => {
              const pt = getProjectedLocationCoord(loc.id);
              const specialConfig = SPECIAL_BLOCK_CONFIG[loc.specialBlock];
              const isSelected = activeNode?.id === loc.id;
              const hasCurrentPlayer = currentPlayer.position === loc.id;
              const playersHere = playersByPosition[loc.id] || [];

              const isGolden = loc.specialBlock === 'Golden Heritage';
              const isFinal = loc.specialBlock === 'Final';
              const isSpecial = loc.specialBlock !== 'Normal';

              // Marker radius
              const radius = isFinal ? 14 : isGolden || isSpecial ? 10.5 : 8.5;

              return (
                <g
                  key={`geo-node-${loc.id}`}
                  onClick={() => interactive && setSelectedNode(loc)}
                  onMouseEnter={() => setHoveredNode(loc)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="cursor-pointer transition-transform duration-150"
                  id={`board-node-${loc.id}`}
                >
                  {/* Outer pulse animation if current player is on this block */}
                  {hasCurrentPlayer && highlightCurrentPlayer && (
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={radius + 7}
                      fill="none"
                      stroke="#ea580c"
                      strokeWidth="2.5"
                      className="animate-ping opacity-75"
                    />
                  )}

                  {/* Selection halo */}
                  {isSelected && (
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={radius + 4.5}
                      fill="none"
                      stroke="#d97706"
                      strokeWidth="2.5"
                    />
                  )}

                  {/* Marker Circle */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={radius}
                    fill={isFinal ? '#fbbf24' : isSpecial ? specialConfig.color : '#ffffff'}
                    stroke={hasCurrentPlayer ? '#ea580c' : isSpecial ? '#ffffff' : '#64748b'}
                    strokeWidth={isSpecial ? 2 : 1.5}
                    filter={isSpecial || hasCurrentPlayer ? 'url(#glowEffect)' : undefined}
                  />

                  {/* Location Number inside marker */}
                  <text
                    x={pt.x}
                    y={pt.y + (radius > 10 ? 3.5 : 3)}
                    textAnchor="middle"
                    fill={isSpecial && !isFinal ? '#ffffff' : '#0f172a'}
                    fontSize={radius > 11 ? '9.5px' : radius > 9 ? '8.5px' : '7.5px'}
                    fontWeight="800"
                    fontFamily="sans-serif"
                    className="pointer-events-none select-none"
                  >
                    {loc.id}
                  </text>

                  {/* City Label for special nodes, selected node, or major milestone stops */}
                  {(isSpecial || isSelected || loc.id % 8 === 0 || loc.id === 1 || loc.id === 80) && (
                    <text
                      x={pt.x}
                      y={pt.y - radius - 3.5}
                      textAnchor="middle"
                      fill={isSelected ? '#b45309' : '#334155'}
                      fontSize="9px"
                      fontWeight={isSelected ? '800' : '600'}
                      fontFamily="sans-serif"
                      className="pointer-events-none drop-shadow-xs select-none"
                    >
                      {loc.city}
                    </text>
                  )}

                  {/* Player Token(s) Avatar */}
                  {playersHere.length > 0 && (
                    <g transform={`translate(${pt.x - 12}, ${pt.y - radius - 18})`}>
                      <rect
                        width={24 + (playersHere.length - 1) * 12}
                        height="18"
                        rx="9"
                        fill="#0f172a"
                        stroke="#f59e0b"
                        strokeWidth="1.5"
                      />
                      {playersHere.map((p, pIdx) => (
                        <text
                          key={`tok-${p.id}`}
                          x={12 + pIdx * 12}
                          y="13"
                          textAnchor="middle"
                          fontSize="11px"
                        >
                          {p.tokenSymbol}
                        </text>
                      ))}
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Floating Hover Tooltip (Requirement 12) */}
          {hoveredNode && (
            <div
              className="absolute z-20 pointer-events-none bg-slate-900/95 text-white p-3 rounded-xl shadow-xl border border-amber-400/40 text-xs w-64 backdrop-blur-xs transition-all"
              style={{
                left: `${Math.min(70, Math.max(10, (getProjectedLocationCoord(hoveredNode.id).x / MAP_CONFIG.width) * 100))}%`,
                top: `${Math.min(75, Math.max(10, (getProjectedLocationCoord(hoveredNode.id).y / MAP_CONFIG.height) * 100))}%`
              }}
            >
              <div className="flex items-center justify-between pb-1 border-b border-slate-700/80 mb-1.5">
                <span className="font-bold text-amber-400 font-mono">
                  Block #{hoveredNode.id}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold uppercase">
                  {hoveredNode.questionCategory}
                </span>
              </div>
              <p className="font-bold text-slate-100 text-sm">{hoveredNode.city}</p>
              <p className="text-[11px] text-slate-400">{hoveredNode.state}</p>
              <p className="text-[11px] text-amber-300 font-serif-heritage mt-1 font-semibold">
                ★ {hoveredNode.heritageSite}
              </p>
              {hoveredNode.specialBlock !== 'Normal' && (
                <div className="mt-1.5">
                  <SpecialBlockBadge type={hoveredNode.specialBlock} size="sm" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Selected / Current Location Detail Panel (Requirement 12) */}
      <div className="p-3 md:p-4 bg-amber-50/80 border-t border-amber-200/90 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs md:text-sm">
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center justify-center w-11 h-11 rounded-xl bg-amber-600 text-white font-bold shadow-xs shrink-0">
            <span className="text-[10px] uppercase opacity-80">Stop</span>
            <span className="text-sm font-serif-heritage">{activeNode.id}</span>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-900 text-sm md:text-base">
                {activeNode.city}, {activeNode.state}
              </span>
              <span className="text-slate-400">•</span>
              <span className="font-serif-heritage text-amber-800 font-semibold">
                {activeNode.heritageSite}
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 text-[10px] font-bold uppercase">
                {activeNode.questionCategory}
              </span>
              <SpecialBlockBadge type={activeNode.specialBlock} size="sm" />
            </div>
            <p className="text-slate-600 text-xs mt-0.5 line-clamp-2 md:line-clamp-1">
              {activeNode.description}
            </p>
          </div>
        </div>

        {/* Legend pills */}
        <div className="flex items-center gap-2 flex-wrap text-xs text-slate-600 self-start md:self-auto shrink-0">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>Golden</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span>Hunt</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
            <span>Culture</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
            <span>Festival</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Ladder</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
            <span>Trap</span>
          </div>
        </div>
      </div>
    </div>
  );
};
