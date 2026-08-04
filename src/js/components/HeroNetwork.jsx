import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 70;          // number of nodes
const CONNECT_DIST = 11;   // max distance to draw a link
const MIN_DIST = 5.5;      // minimum spacing kept between nodes (anti-bunching)
const N_PULSES = 26;       // data packets travelling along the links
const HALF_W = 0.07;       // half-gap between a link's two outline rails (~1-2px apart)
const NODE_COLOR = '#3f7fc4';

// Crisp, hard-edged dot sprite (defined "digital" node, not a fuzzy glow orb).
function makeDotTexture() {
  const s = 64;
  const c = document.createElement('canvas');
  c.width = c.height = s;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, s, s);
  ctx.beginPath();
  ctx.arc(s / 2, s / 2, s / 2 - 4, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  const tex = new THREE.CanvasTexture(c);
  return tex;
}

function Network() {
  const group = useRef();
  const pointsGeo = useRef();
  const linesGeo = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const dot = useMemo(makeDotTexture, []);
  const base = useMemo(() => new THREE.Color(NODE_COLOR), []);

  const pulseGeo = useRef();
  const { nodes, pulses, posArr, pulsePos, linePos, lineCol, mstIn, mstMin, mstFrom } = useMemo(() => {
    const nodes = [];
    for (let i = 0; i < COUNT; i++) {
      nodes.push({
        p: new THREE.Vector3(
          (Math.random() - 0.5) * 90,
          (Math.random() - 0.5) * 54,
          (Math.random() - 0.5) * 22
        ),
        v: new THREE.Vector3(
          (Math.random() - 0.5) * 0.12,
          (Math.random() - 0.5) * 0.12,
          (Math.random() - 0.5) * 0.06
        ),
      });
    }
    const pulses = [];
    for (let i = 0; i < N_PULSES; i++) {
      pulses.push({
        from: (Math.random() * COUNT) | 0,
        to: (Math.random() * COUNT) | 0,
        t: Math.random(),
        speed: 0.5 + Math.random() * 0.6,
      });
    }
    return {
      nodes,
      pulses,
      posArr: new Float32Array(COUNT * 3),
      pulsePos: new Float32Array(N_PULSES * 3),
      // Each link becomes two rails (4 verts), so allow extra room.
      linePos: new Float32Array(COUNT * COUNT * 12),
      lineCol: new Float32Array(COUNT * COUNT * 12),
      // Scratch buffers for the per-frame minimum spanning tree (Prim's).
      mstIn: new Uint8Array(COUNT),
      mstMin: new Float32Array(COUNT),
      mstFrom: new Int32Array(COUNT),
    };
  }, []);

  // Track the mouse across the page (canvas itself ignores pointer events).
  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05) * 60;
    const hw = state.viewport.width / 2;
    const hh = state.viewport.height / 2;
    const hd = 12;
    const mx = mouse.current.x * hw;
    const my = mouse.current.y * hh;
    const R = 20;

    // 1) Cursor attraction + drift + bounce.
    for (let i = 0; i < COUNT; i++) {
      const n = nodes[i];
      const dx = mx - n.p.x;
      const dy = my - n.p.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < R * R) {
        const d = Math.sqrt(d2) || 1;
        const f = (1 - d / R) * 0.03;
        n.v.x += (dx / d) * f;
        n.v.y += (dy / d) * f;
      }
      n.v.multiplyScalar(0.97);
      n.p.x += n.v.x * dt;
      n.p.y += n.v.y * dt;
      n.p.z += n.v.z * dt;
      if (n.p.x > hw || n.p.x < -hw) { n.v.x *= -1; n.p.x = THREE.MathUtils.clamp(n.p.x, -hw, hw); }
      if (n.p.y > hh || n.p.y < -hh) { n.v.y *= -1; n.p.y = THREE.MathUtils.clamp(n.p.y, -hh, hh); }
      if (n.p.z > hd || n.p.z < -hd) { n.v.z *= -1; n.p.z = THREE.MathUtils.clamp(n.p.z, -hd, hd); }
    }

    // 2) Separation: push apart any pair closer than MIN_DIST so nodes never bunch.
    for (let i = 0; i < COUNT; i++) {
      const a = nodes[i].p;
      for (let j = i + 1; j < COUNT; j++) {
        const b = nodes[j].p;
        const dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z;
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 > 1e-6 && d2 < MIN_DIST * MIN_DIST) {
          const d = Math.sqrt(d2);
          const push = (MIN_DIST - d) * 0.5;
          const nx = dx / d, ny = dy / d, nz = dz / d;
          a.x += nx * push; a.y += ny * push; a.z += nz * push;
          b.x -= nx * push; b.y -= ny * push; b.z -= nz * push;
        }
      }
    }

    // 3) Clamp back inside bounds and write the point buffer.
    for (let i = 0; i < COUNT; i++) {
      const n = nodes[i];
      n.p.x = THREE.MathUtils.clamp(n.p.x, -hw, hw);
      n.p.y = THREE.MathUtils.clamp(n.p.y, -hh, hh);
      n.p.z = THREE.MathUtils.clamp(n.p.z, -hd, hd);
      posArr[i * 3] = n.p.x;
      posArr[i * 3 + 1] = n.p.y;
      posArr[i * 3 + 2] = n.p.z;
    }
    if (pointsGeo.current) pointsGeo.current.attributes.position.needsUpdate = true;

    // Data packets travelling node-to-node along the network (digital transmission).
    const pdt = Math.min(delta, 0.05);
    for (let k = 0; k < N_PULSES; k++) {
      const p = pulses[k];
      p.t += p.speed * pdt;
      if (p.t >= 1) {
        p.from = p.to;
        // Continue toward a randomly chosen connected neighbour (reservoir pick).
        const fp = nodes[p.from].p;
        let cand = -1, seen = 0;
        for (let v = 0; v < COUNT; v++) {
          if (v === p.from) continue;
          const q = nodes[v].p;
          const dx = fp.x - q.x, dy = fp.y - q.y, dz = fp.z - q.z;
          if (dx * dx + dy * dy + dz * dz < CONNECT_DIST * CONNECT_DIST) {
            seen++;
            if (Math.random() < 1 / seen) cand = v;
          }
        }
        if (cand < 0) cand = (Math.random() * COUNT) | 0;
        p.to = cand;
        p.t -= 1;
        if (p.t < 0) p.t = 0;
        p.speed = 0.5 + Math.random() * 0.6;
      }
      const a = nodes[p.from].p, b = nodes[p.to].p;
      const tt = p.t;
      pulsePos[k * 3] = a.x + (b.x - a.x) * tt;
      pulsePos[k * 3 + 1] = a.y + (b.y - a.y) * tt;
      pulsePos[k * 3 + 2] = a.z + (b.z - a.z) * tt;
    }
    if (pulseGeo.current) pulseGeo.current.attributes.position.needsUpdate = true;

    // Rebuild links between nearby nodes; fade by distance.
    let li = 0;
    // Draw a link as two thin parallel rails (offset perpendicular), leaving the
    // middle transparent so only the connection's outline is visible.
    const pushRail = (ax, ay, az, bx, by, bz, cr, cg, cb) => {
      const ex = bx - ax, ey = by - ay;
      const len = Math.hypot(ex, ey) || 1;
      const px = (-ey / len) * HALF_W, py = (ex / len) * HALF_W;
      const put = (idx, x, y, z) => {
        const o = idx * 3;
        linePos[o] = x; linePos[o + 1] = y; linePos[o + 2] = z;
        lineCol[o] = cr; lineCol[o + 1] = cg; lineCol[o + 2] = cb;
      };
      put(li, ax + px, ay + py, az);
      put(li + 1, bx + px, by + py, bz);
      put(li + 2, ax - px, ay - py, az);
      put(li + 3, bx - px, by - py, bz);
      li += 4;
    };
    for (let i = 0; i < COUNT; i++) {
      const a = nodes[i].p;
      for (let j = i + 1; j < COUNT; j++) {
        const b = nodes[j].p;
        const dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z;
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < CONNECT_DIST) {
          const c = (1 - d / CONNECT_DIST) * 0.28;
          pushRail(a.x, a.y, a.z, b.x, b.y, b.z, base.r * c, base.g * c, base.b * c);
        }
      }
    }

    // Minimum spanning tree (Prim's) guarantees ONE connected component — draw
    // only the "bridge" edges longer than CONNECT_DIST (short ones already exist
    // as proximity links) so no node or cluster is ever left stranded.
    mstIn.fill(0);
    mstFrom.fill(-1);
    for (let i = 0; i < COUNT; i++) mstMin[i] = Infinity;
    mstMin[0] = 0;
    for (let iter = 0; iter < COUNT; iter++) {
      let u = -1, best = Infinity;
      for (let k = 0; k < COUNT; k++) {
        if (!mstIn[k] && mstMin[k] < best) { best = mstMin[k]; u = k; }
      }
      if (u < 0) break;
      mstIn[u] = 1;
      const from = mstFrom[u];
      if (from >= 0 && best >= CONNECT_DIST) {
        const a = nodes[u].p, b = nodes[from].p;
        const c = 0.18;
        pushRail(a.x, a.y, a.z, b.x, b.y, b.z, base.r * c, base.g * c, base.b * c);
      }
      const up = nodes[u].p;
      for (let v = 0; v < COUNT; v++) {
        if (mstIn[v]) continue;
        const vp = nodes[v].p;
        const dx = up.x - vp.x, dy = up.y - vp.y, dz = up.z - vp.z;
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < mstMin[v]) { mstMin[v] = d; mstFrom[v] = u; }
      }
    }

    if (linesGeo.current) {
      linesGeo.current.attributes.position.needsUpdate = true;
      linesGeo.current.attributes.color.needsUpdate = true;
      linesGeo.current.setDrawRange(0, li);
    }

    // Parallax the whole field toward the mouse for a 3D feel.
    if (group.current) {
      group.current.rotation.y += (mouse.current.x * 0.1 - group.current.rotation.y) * 0.04;
      group.current.rotation.x += (-mouse.current.y * 0.07 - group.current.rotation.x) * 0.04;
    }
  });

  return (
    <group ref={group}>
      <points frustumCulled={false}>
        <bufferGeometry ref={pointsGeo}>
          <bufferAttribute attach="attributes-position" array={posArr} count={COUNT} itemSize={3} usage={THREE.DynamicDrawUsage} />
        </bufferGeometry>
        <pointsMaterial
          map={dot}
          color="#69a9e6"
          size={2}
          sizeAttenuation
          transparent
          alphaTest={0.5}
          depthWrite={false}
          opacity={0.9}
        />
      </points>
      <lineSegments frustumCulled={false}>
        <bufferGeometry ref={linesGeo}>
          <bufferAttribute attach="attributes-position" array={linePos} count={COUNT * COUNT * 4} itemSize={3} usage={THREE.DynamicDrawUsage} />
          <bufferAttribute attach="attributes-color" array={lineCol} count={COUNT * COUNT * 4} itemSize={3} usage={THREE.DynamicDrawUsage} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.5} depthWrite={false} blending={THREE.AdditiveBlending} />
      </lineSegments>

      {/* Glowing data packets travelling along the links. */}
      <points frustumCulled={false}>
        <bufferGeometry ref={pulseGeo}>
          <bufferAttribute attach="attributes-position" array={pulsePos} count={N_PULSES} itemSize={3} usage={THREE.DynamicDrawUsage} />
        </bufferGeometry>
        <pointsMaterial
          color="#bfe3ff"
          size={2}
          sizeAttenuation={false}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={1}
        />
      </points>
    </group>
  );
}

export default function HeroNetwork() {
  return (
    <Canvas
      camera={{ position: [0, 0, 60], fov: 50, near: 0.1, far: 400 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    >
      <Network />
    </Canvas>
  );
}
