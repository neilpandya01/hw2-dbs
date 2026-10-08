"use client";

import { useEffect, useRef, type KeyboardEvent, type PointerEvent } from "react";
import type { Airport } from "@/data/flights";
import { landDots } from "@/data/landDots";
import { cx } from "@/components/ui/mid-flight/styles";

// A dotted night-side globe, like the seatback flight map: land as LED dots,
// every flight as a great-circle arc lifted off the surface.
// Drawn on a canvas (orthographic projection) so it can turn smoothly.

// Mid Flight tokens (globals.css). Canvas can't read Tailwind classes.
const C = {
  bg: "#09102a",
  surface: "#0f1a40",
  raised: "#192656",
  border: "#283670",
  control: "#6474aa",
  text: "#e6ecfb",
  muted: "#909dc0",
  focus: "#7fd3ff", // aisle light: routes, selected
  led: "#5b8cff", // LED strip: rim glow
};

export type Route = { id: string; a: Airport; b: Airport };

type Props = {
  routes: Route[];
  /** Routes outside this set fade back (filtered out). Omit to show all at full strength. */
  activeIds?: Set<string>;
  /** One route drawn bright, labelled, with a plane moving along it. */
  highlightId?: string | null;
  /** Turn the globe to face this point. */
  focus?: { lat: number; lon: number } | null;
  home?: string;
  /** Off: airports only (the highlighted flight still draws). */
  showRoutes?: boolean;
  autoRotate?: boolean;
  onAirportClick?: (code: string) => void;
  /** Clicking an arc. Gets the id of the route under the pointer. */
  onRouteClick?: (id: string) => void;
  label: string;
  className?: string;
};

type Vec = [number, number, number];
const D = Math.PI / 180;
const toVec = (lat: number, lon: number): Vec => [Math.cos(lat * D) * Math.cos(lon * D), Math.cos(lat * D) * Math.sin(lon * D), Math.sin(lat * D)];
const wrap = (deg: number) => ((((deg + 180) % 360) + 360) % 360) - 180;

export function midpoint(a: Airport, b: Airport) {
  const [x1, y1, z1] = toVec(a.lat, a.lon), [x2, y2, z2] = toVec(b.lat, b.lon);
  const x = x1 + x2, y = y1 + y2, z = z1 + z2;
  return { lat: Math.atan2(z, Math.hypot(x, y)) / D, lon: Math.atan2(y, x) / D };
}

// Great circle from a to b, lifted into an arch so long flights stand off the globe.
function arcPoints(a: Airport, b: Airport, n = 64): Vec[] {
  const va = toVec(a.lat, a.lon), vb = toVec(b.lat, b.lon);
  const w = Math.acos(Math.min(1, va[0] * vb[0] + va[1] * vb[1] + va[2] * vb[2]));
  const lift = Math.min(0.17, w * 0.12);
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n, s = Math.sin(w) || 1;
    const ka = Math.sin((1 - t) * w) / s, kb = Math.sin(t * w) / s, h = 1 + lift * Math.sin(Math.PI * t);
    return [(ka * va[0] + kb * vb[0]) * h, (ka * va[1] + kb * vb[1]) * h, (ka * va[2] + kb * vb[2]) * h];
  });
}

const LAND: Vec[] = [];
for (let i = 0; i < landDots.length; i += 2) LAND.push(toVec(landDots[i], landDots[i + 1]));

export default function Globe({ routes, activeIds, highlightId, focus, home, showRoutes = true, autoRotate = true, onAirportClick, onRouteClick, label, className }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const props = useRef({ routes, activeIds, highlightId, home, showRoutes, onAirportClick, autoRotate });
  props.current = { routes, activeIds, highlightId, home, showRoutes, onAirportClick, autoRotate };

  // View state lives in a ref: it changes every frame and shouldn't re-render React.
  const view = useRef({ lon: -60, lat: 28, target: null as null | { lon: number; lat: number }, drag: null as null | { x: number; y: number; moved: number }, hover: null as string | null, hoverRoute: null as string | null, idleUntil: 0 });

  const airportsOnScreen = useRef(new Map<string, Vec>());
  // Visible stretches of each drawn arc, in canvas pixels, for clicking routes.
  const routesOnScreen = useRef<{ id: string; lines: number[][] }[]>([]);
  const arcs = useRef(new Map<string, Vec[]>());
  useEffect(() => {
    const next = new Map<string, Vec[]>();
    for (const r of routes) next.set(r.id, arcs.current.get(r.id) ?? arcPoints(r.a, r.b));
    arcs.current = next;
  }, [routes]);

  useEffect(() => {
    if (focus) view.current.target = { lon: focus.lon, lat: Math.max(-50, Math.min(55, focus.lat)) };
  }, [focus]);

  useEffect(() => {
    const canvas = canvasRef.current!, box = wrapRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mono = getComputedStyle(canvas).getPropertyValue("--font-dm-mono").trim() || "ui-monospace, monospace";
    let size = 0, dpr = 1, raf = 0, last = performance.now(), visible = true;

    const resize = () => {
      size = box.clientWidth;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = canvas.height = Math.round(size * dpr);
      canvas.style.height = `${size}px`;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(box);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(canvas);

    function frame(now: number) {
      if (!visible) return;
      const dt = Math.min(64, now - last);
      last = now;
      step(dt, now);
      draw(now);
      raf = requestAnimationFrame(frame);
    }

    function step(dt: number, now: number) {
      const v = view.current, p = props.current;
      if (v.target) {
        const dl = wrap(v.target.lon - v.lon), dp = v.target.lat - v.lat;
        const k = reduce.matches ? 1 : 1 - Math.exp(-dt / 220);
        v.lon = wrap(v.lon + dl * k);
        v.lat += dp * k;
        if (Math.abs(dl) < 0.05 && Math.abs(dp) < 0.05) v.target = null;
      } else if (p.autoRotate && !reduce.matches && !v.drag && !p.highlightId && !v.hover && !v.hoverRoute && now > v.idleUntil) {
        v.lon = wrap(v.lon - dt * 0.004);
      }
    }

    function draw(now: number) {
      const v = view.current, p = props.current;
      const W = size * dpr, cxp = W / 2, cyp = W / 2, R = W * 0.4;
      const cl = Math.cos(v.lon * D), sl = Math.sin(v.lon * D), ct = Math.cos(v.lat * D), st = Math.sin(v.lat * D);
      // → [screen x, screen y, depth]; depth > 0 faces the viewer.
      const proj = (q: Vec): Vec => {
        const x1 = q[0] * cl + q[1] * sl, y1 = -q[0] * sl + q[1] * cl;
        return [cxp + R * y1, cyp - R * (-x1 * st + q[2] * ct), x1 * ct + q[2] * st];
      };
      const shows = (s: Vec) => s[2] > 0 || (s[0] - cxp) ** 2 + (s[1] - cyp) ** 2 > R * R;

      ctx.clearRect(0, 0, W, W);

      // Cabin-light halo, then the night side of the sphere.
      const halo = ctx.createRadialGradient(cxp, cyp, R * 0.9, cxp, cyp, R * 1.22);
      halo.addColorStop(0, "rgba(91,140,255,0.3)");
      halo.addColorStop(0.35, "rgba(91,140,255,0.1)");
      halo.addColorStop(1, "rgba(91,140,255,0)");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, W, W);
      const body = ctx.createRadialGradient(cxp - R * 0.35, cyp - R * 0.4, R * 0.1, cxp, cyp, R);
      body.addColorStop(0, C.raised);
      body.addColorStop(0.6, C.surface);
      body.addColorStop(1, C.bg);
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cxp, cyp, R, 0, Math.PI * 2);
      ctx.fill();

      // Land: dots fade toward the limb. Bucketed so it's a handful of fills, not thousands.
      const buckets: Path2D[] = [new Path2D(), new Path2D(), new Path2D(), new Path2D()];
      const d = 1.7 * dpr;
      for (const q of LAND) {
        const s = proj(q);
        if (s[2] <= 0.02) continue;
        buckets[Math.min(3, Math.floor(s[2] * 4))].rect(s[0] - d / 2, s[1] - d / 2, d, d);
      }
      ctx.fillStyle = C.control;
      buckets.forEach((b, i) => {
        ctx.globalAlpha = 0.25 + i * 0.22;
        ctx.fill(b);
      });
      ctx.globalAlpha = 1;
      ctx.strokeStyle = C.border;
      ctx.lineWidth = dpr;
      ctx.beginPath();
      ctx.arc(cxp, cyp, R, 0, Math.PI * 2);
      ctx.stroke();

      // Routes. Filtered-out ones stay as faint traces so the shape of the whole log never disappears.
      const strokeArc = (pts: Vec[]) => {
        const lines: number[][] = [];
        ctx.beginPath();
        let pen = false;
        for (const q of pts) {
          const s = proj(q);
          if (!shows(s)) {
            pen = false;
            continue;
          }
          if (pen) {
            ctx.lineTo(s[0], s[1]);
            lines[lines.length - 1].push(s[0], s[1]);
          } else {
            ctx.moveTo(s[0], s[1]);
            lines.push([s[0], s[1]]);
          }
          pen = true;
        }
        ctx.stroke();
        return lines;
      };
      const onScreen: { id: string; lines: number[][] }[] = [];
      ctx.lineCap = "round";
      ctx.strokeStyle = C.focus;
      const active = (id: string) => !p.activeIds || p.activeIds.has(id);
      for (const r of p.routes) {
        if (r.id === p.highlightId || !p.showRoutes) continue;
        const on = active(r.id), hovered = r.id === v.hoverRoute;
        ctx.globalAlpha = hovered ? 1 : on ? (p.highlightId ? 0.3 : 0.55) : 0.1;
        ctx.lineWidth = (hovered ? 2.25 : on ? 1.25 : 1) * dpr;
        const lines = strokeArc(arcs.current.get(r.id) ?? arcPoints(r.a, r.b));
        if (on) onScreen.push({ id: r.id, lines });
      }
      ctx.globalAlpha = 1;

      // Airports: visited ones glow; size grows a little with visits.
      const visits = new Map<string, { ap: Airport; n: number; on: boolean }>();
      for (const r of p.routes)
        for (const ap of [r.a, r.b]) {
          const e = visits.get(ap.iata) ?? { ap, n: 0, on: false };
          e.n++;
          e.on ||= active(r.id);
          visits.set(ap.iata, e);
        }
      const screen = new Map<string, Vec>();
      for (const [code, { ap, n, on }] of visits) {
        const s = proj(toVec(ap.lat, ap.lon));
        if (s[2] <= 0) continue;
        screen.set(code, s);
        const r = (2 + Math.min(2, n / 6)) * dpr;
        if (on) {
          ctx.fillStyle = "rgba(127,211,255,0.28)";
          ctx.beginPath();
          ctx.arc(s[0], s[1], r * 2.6, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = on ? "#ffffff" : C.control;
        ctx.beginPath();
        ctx.arc(s[0], s[1], r, 0, Math.PI * 2);
        ctx.fill();
        if (code === p.home) {
          ctx.strokeStyle = C.text;
          ctx.lineWidth = 1.25 * dpr;
          ctx.beginPath();
          ctx.arc(s[0], s[1], r + 4 * dpr, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      airportsOnScreen.current = screen;

      // The highlighted flight: bright arc, glowing, with a plane travelling it.
      const hl = p.highlightId ? p.routes.find((r) => r.id === p.highlightId) : null;
      const labels = new Set<string>();
      if (hl) {
        const pts = arcs.current.get(hl.id) ?? arcPoints(hl.a, hl.b);
        ctx.save();
        ctx.shadowColor = C.focus;
        ctx.shadowBlur = 12 * dpr;
        ctx.lineWidth = 2.5 * dpr;
        onScreen.push({ id: hl.id, lines: strokeArc(pts) });
        ctx.restore();
        const t = reduce.matches ? 0.62 : (now / 4000) % 1;
        const s = proj(pts[Math.round(t * (pts.length - 1))]);
        if (shows(s)) {
          ctx.fillStyle = "rgba(91,140,255,0.55)";
          ctx.beginPath();
          ctx.arc(s[0], s[1], 7 * dpr, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(s[0], s[1], 2.5 * dpr, 0, Math.PI * 2);
          ctx.fill();
        }
        labels.add(hl.a.iata).add(hl.b.iata);
      }
      if (v.hover) labels.add(v.hover);
      const hr = v.hoverRoute ? p.routes.find((r) => r.id === v.hoverRoute) : null;
      if (hr) labels.add(hr.a.iata).add(hr.b.iata);
      routesOnScreen.current = onScreen;

      ctx.font = `500 ${11 * dpr}px ${mono}`;
      ctx.textBaseline = "middle";
      for (const code of labels) {
        const s = screen.get(code);
        if (!s) continue;
        const w = ctx.measureText(code).width + 10 * dpr;
        const x = s[0] + 9 * dpr, y = s[1] - 14 * dpr;
        ctx.fillStyle = "rgba(9,16,42,0.85)";
        ctx.strokeStyle = C.control;
        ctx.lineWidth = dpr;
        ctx.beginPath();
        ctx.roundRect(x, y - 9 * dpr, w, 18 * dpr, 4 * dpr);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = C.text;
        ctx.fillText(code, x + 5 * dpr, y + dpr);
      }
    }

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const airportAt = (e: PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const dpr = canvasRef.current!.width / rect.width;
    const x = (e.clientX - rect.left) * dpr, y = (e.clientY - rect.top) * dpr;
    let best: string | null = null, bestD = (14 * dpr) ** 2;
    for (const [code, s] of airportsOnScreen.current) {
      const dd = (s[0] - x) ** 2 + (s[1] - y) ** 2;
      if (dd < bestD) [best, bestD] = [code, dd];
    }
    return best;
  };

  // Nearest arc within a few pixels of the pointer (the highlighted one is checked last, so it wins ties).
  const routeAt = (e: PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const dpr = canvasRef.current!.width / rect.width;
    const x = (e.clientX - rect.left) * dpr, y = (e.clientY - rect.top) * dpr;
    let best: string | null = null, bestD = (7 * dpr) ** 2;
    for (const { id, lines } of routesOnScreen.current)
      for (const l of lines)
        for (let i = 2; i < l.length; i += 2) {
          const [ax, ay, bx, by] = [l[i - 2], l[i - 1], l[i], l[i + 1]];
          const len = (bx - ax) ** 2 + (by - ay) ** 2 || 1;
          const t = Math.max(0, Math.min(1, ((x - ax) * (bx - ax) + (y - ay) * (by - ay)) / len));
          const dd = (ax + t * (bx - ax) - x) ** 2 + (ay + t * (by - ay) - y) ** 2;
          if (dd <= bestD) [best, bestD] = [id, dd];
        }
    return best;
  };

  const onPointerDown = (e: PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    view.current.drag = { x: e.clientX, y: e.clientY, moved: 0 };
    view.current.target = null;
  };
  const onPointerMove = (e: PointerEvent<HTMLCanvasElement>) => {
    const v = view.current;
    if (v.drag) {
      const k = 57.3 / (e.currentTarget.clientWidth * 0.4);
      const dx = e.clientX - v.drag.x, dy = e.clientY - v.drag.y;
      v.lon = wrap(v.lon - dx * k);
      v.lat = Math.max(-70, Math.min(70, v.lat + dy * k));
      v.drag = { x: e.clientX, y: e.clientY, moved: v.drag.moved + Math.abs(dx) + Math.abs(dy) };
      return;
    }
    if (e.pointerType !== "mouse") return;
    v.hover = onAirportClick ? airportAt(e) : null;
    v.hoverRoute = !v.hover && onRouteClick ? routeAt(e) : null;
    e.currentTarget.style.cursor = v.hover || v.hoverRoute ? "pointer" : "grab";
  };
  const onPointerUp = (e: PointerEvent<HTMLCanvasElement>) => {
    const v = view.current;
    if (v.drag && v.drag.moved < 5) {
      const code = onAirportClick ? airportAt(e) : null;
      const route = !code && onRouteClick ? routeAt(e) : null;
      if (code) onAirportClick?.(code);
      else if (route) onRouteClick?.(route);
    }
    v.drag = null;
    v.idleUntil = performance.now() + 2500;
  };
  const onKeyDown = (e: KeyboardEvent) => {
    const v = view.current;
    const moves: Record<string, [number, number]> = { ArrowLeft: [-15, 0], ArrowRight: [15, 0], ArrowUp: [0, 10], ArrowDown: [0, -10] };
    const m = moves[e.key];
    if (!m) return;
    e.preventDefault();
    const from = v.target ?? v;
    v.target = { lon: wrap(from.lon + m[0]), lat: Math.max(-70, Math.min(70, from.lat + m[1])) };
    v.idleUntil = performance.now() + 4000;
  };

  return (
    <div ref={wrapRef} className={cx("relative w-full", className)}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={label}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={() => {
          view.current.hover = null;
          view.current.hoverRoute = null;
        }}
        onKeyDown={onKeyDown}
        className="block w-full cursor-grab touch-pan-y rounded-full select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mf-focus active:cursor-grabbing"
      />
    </div>
  );
}
