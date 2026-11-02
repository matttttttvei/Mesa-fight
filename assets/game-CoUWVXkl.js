import {
  T as Vt,
  S as rt,
  N as Nt,
  L as Kt,
  F as Yt,
  G as qt,
  M as R,
  D as V,
  a as S,
  B as Tt,
  V as d,
  R as Pt,
  b as At,
  c as Et,
  P as Ct,
  I as Xt,
  d as pt,
  e as ot,
  f as Zt,
  U as Jt,
  g as k,
  h as ht,
  i as N,
  j as Qt,
  k as B,
  C as dt,
  l as A,
  m as K,
  n as Y,
  o as te,
  p as Rt,
  q as Z,
  r as ee,
  H as Dt,
  s as Lt,
  t as G,
  u as nt,
  A as _,
  v as se,
  w as Ft,
  x as It,
  y as Ot,
  z as _t,
  E as Bt,
  J as ie,
  K as ae,
  O as oe,
  Q as ne,
  W as re,
  X as Gt,
  Y as he,
  Z as ce,
  _ as le,
  $ as me,
  a0 as $t,
  a1 as pe,
  a2 as de,
  a3 as ue,
} from "./three-BPGvv_1k.js";
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) s(i);
  new MutationObserver((i) => {
    for (const a of i)
      if (a.type === "childList")
        for (const o of a.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && s(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function e(i) {
    const a = {};
    return (
      i.integrity && (a.integrity = i.integrity),
      i.referrerPolicy && (a.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (a.credentials = "include")
        : i.crossOrigin === "anonymous"
          ? (a.credentials = "omit")
          : (a.credentials = "same-origin"),
      a
    );
  }
  function s(i) {
    if (i.ep) return;
    i.ep = !0;
    const a = e(i);
    fetch(i.href, a);
  }
})();
function fe(c) {
  const t = new Map(),
    e = new Map(),
    s = c.clone();
  return (
    Wt(c, s, function (i, a) {
      (t.set(a, i), e.set(i, a));
    }),
    s.traverse(function (i) {
      if (!i.isSkinnedMesh) return;
      const a = i,
        o = t.get(i),
        n = o.skeleton.bones;
      ((a.skeleton = o.skeleton.clone()),
        a.bindMatrix.copy(o.bindMatrix),
        (a.skeleton.bones = n.map(function (r) {
          return e.get(r);
        })),
        a.bind(a.skeleton, a.bindMatrix));
    }),
    s
  );
}
function Wt(c, t, e) {
  e(c, t);
  for (let s = 0; s < c.children.length; s++)
    Wt(c.children[s], t.children[s], e);
}
const z = (c, t, e) => Math.max(t, Math.min(e, c)),
  b = (c, t) => c + Math.random() * (t - c),
  ut = (c) => c[Math.floor(Math.random() * c.length)],
  M = (c, t, e, s) => c + (t - c) * (1 - Math.exp(-e * s)),
  F = (c) => (c * Math.PI) / 180;
function ge(c, t, e, s) {
  const i = Math.atan2(Math.sin(t - c), Math.cos(t - c));
  return c + i * (1 - Math.exp(-12 * s));
}
function ft(c, t, e, s) {
  const i = t - c.x,
    a = e - c.z,
    o = Math.hypot(i, a),
    n = o > s ? s / o : 1;
  ((c.x += i * n), (c.z += a * n));
}
const gt = new WeakSet();
function ye(c) {
  return (
    !c.isMeshStandardMaterial ||
      gt.has(c) ||
      (gt.add(c),
      (c.dithering = !0),
      (c.onBeforeCompile = (t) => {
        ((t.vertexShader = `varying vec3 vArenaPosition;
${t.vertexShader}`.replace(
          "#include <project_vertex>",
          `
      #include <project_vertex>
      vec4 arenaPosition = vec4(transformed, 1.0);
      #ifdef USE_BATCHING
        arenaPosition = batchingMatrix * arenaPosition;
      #endif
      #ifdef USE_INSTANCING
        arenaPosition = instanceMatrix * arenaPosition;
      #endif
      vArenaPosition = (modelMatrix * arenaPosition).xyz;
    `,
        )),
          (t.fragmentShader = `varying vec3 vArenaPosition;
${t.fragmentShader}`.replace(
            "#include <lights_fragment_maps>",
            `
      vec2 arenaEdge = smoothstep(vec2(11.0), vec2(20.5), abs(vArenaPosition.xz));
      float arenaOpen = (1.0 - arenaEdge.x) * (1.0 - arenaEdge.y);
      float arenaLow = 1.0 - 0.65 * smoothstep(2.5, 8.0, vArenaPosition.y);
      vec3 arenaNormal = inverseTransformDirection(geometryNormal, viewMatrix);
      float arenaFacing = 0.68 + 0.32 * arenaNormal.y;
      irradiance += vec3(0.38, 0.46, 0.54) * arenaOpen * arenaLow * arenaFacing;
      #include <lights_fragment_maps>
    `,
          )));
      }),
      (c.customProgramCacheKey = () => "arena-bounce-v1"),
      (c.needsUpdate = !0)),
    c
  );
}
function ct(c) {
  c.traverse((t) => {
    if (t.isMesh)
      for (const e of Array.isArray(t.material) ? t.material : [t.material])
        ye(e);
  });
}
const yt = {
    crowbar: {
      path: "weapons/crowbar/source/crowbar.fbx",
      texture: "weapons/crowbar/textures/crowbarColor.png",
      normal: "weapons/crowbar/textures/crowbarNormal.png",
    },
    pistol: {
      path: "weapons/pistol/scene.gltf",
      texture: "weapons/pistol/textures/Scene_-_Root_diffuse.png",
      normal: "weapons/pistol/textures/Scene_-_Root_normal.png",
      metalness: 0.6,
    },
    smg: { path: "weapons/smg/scene.gltf" },
    shotgun: { path: "weapons/shotgun/scene.gltf" },
    mouse: {
      path: "enemies/mouse/source/Ratlow.fbx",
      texture: "enemies/mouse/textures/Ratlow_Rat_AlbedoTransparency.png",
    },
    rat: {
      path: "enemies/rat/source/tushkano.fbx",
      texture: "enemies/rat/textures/act_rat01.tga.png",
    },
    capybara: {
      path: "enemies/capybara/source/prase_sketchfab.fbx",
      texture:
        "enemies/capybara/textures/prase_low_poly_Default_OBJ_BaseColor.png",
    },
    medkit: { path: "pickups/medkit/scene.gltf" },
    battery: { path: "pickups/battery/scene.gltf" },
    ammo_pistol: { path: "pickups/ammo_pistol/scene.gltf" },
    ammo_shotgun: { path: "pickups/ammo_shotgun/scene.gltf" },
    ammo_smg: {
      path: "pickups/ammo_smg/source/SM_AmmoCrate.fbx",
      texture: "pickups/ammo_smg/textures/AmmoPack2.png",
    },
    barrel: { path: "props/barrel/scene.gltf" },
    pillar: { path: "props/pillar/scene.gltf" },
    lamp: { path: "props/lamp/scene.gltf" },
  },
  wt = {
    floor: "concrete/floor_concrete.jpg",
    wall: "concrete/wall_concrete.jpg",
    crate: "props/wood_crate.jpg",
    rust: "props/rusty_metal.jpg",
    bullet: "decals/bullet_hole.png",
    blood: "decals/blood_splatter.png",
  },
  we =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScLbtAAAAABJRU5ErkJggg==";
class ve {
  constructor(t) {
    ((this.models = new Map()),
      (this.textures = new Map()),
      (this.warnings = []),
      (this.anisotropy = Math.min(8, t.capabilities.getMaxAnisotropy())),
      (this.textureLoader = new Vt()));
  }
  url(t) {
    return `./assets/${t}`;
  }
  async texture(t, e = !0) {
    const s = await this.textureLoader.loadAsync(this.url(t));
    return ((s.colorSpace = e ? rt : Nt), (s.anisotropy = this.anisotropy), s);
  }
  async load(t) {
    let e = 0;
    const s = [
        ...Object.entries(wt).map(([a, o]) => ({
          name: o,
          run: async () =>
            this.textures.set(a, await this.texture(`textures/${o}`)),
        })),
        ...Object.entries(yt).map(([a, o]) => ({
          name: a,
          run: () => this.loadModel(a, o),
        })),
      ],
      i = async () => {
        for (let a; (a = s.shift()); ) {
          try {
            await a.run();
          } catch (o) {
            (this.warnings.push(a.name),
              console.warn(
                `Ресурс ${a.name}: используется резервная модель.`,
                o,
              ));
          }
          t(++e / (Object.keys(wt).length + Object.keys(yt).length), a.name);
        }
      };
    await Promise.all(Array.from({ length: 4 }, i));
  }
  async loadModel(t, e) {
    let s, i;
    const a = this.url(`models/${e.path}`);
    if (e.path.endsWith(".fbx")) {
      const n = new Kt();
      (n.setURLModifier((r) =>
        /\.(png|jpg|jpeg|tga|bmp|dds)(?:\?|$)/i.test(r) ? we : r,
      ),
        (s = await new Yt(n).loadAsync(a)),
        (i = s.animations));
    } else {
      const n = await fetch(a);
      if (!n.ok) throw new Error(`HTTP ${n.status}: ${a}`);
      const r = await n.json();
      for (const m of r.materials ?? []) {
        const l = m.extensions?.KHR_materials_pbrSpecularGlossiness;
        l &&
          ((m.pbrMetallicRoughness = {
            baseColorTexture: l.diffuseTexture,
            baseColorFactor: l.diffuseFactor ?? [1, 1, 1, 1],
            metallicFactor: 0,
            roughnessFactor: 0.6,
          }),
          delete m.extensions.KHR_materials_pbrSpecularGlossiness);
      }
      for (const m of ["extensionsUsed", "extensionsRequired"])
        r[m] &&
          (r[m] = r[m].filter(
            (l) => l !== "KHR_materials_pbrSpecularGlossiness",
          ));
      const h = await new qt().parseAsync(
        JSON.stringify(r),
        a.slice(0, a.lastIndexOf("/") + 1),
      );
      ((s = h.scene), (i = h.animations));
    }
    if (e.texture) {
      const n = await this.texture(`models/${e.texture}`),
        r = e.normal ? await this.texture(`models/${e.normal}`, !1) : null;
      e.path.endsWith(".gltf") && ((n.flipY = !1), r && (r.flipY = !1));
      const h = new R({
        map: n,
        normalMap: r,
        roughness: 0.75,
        metalness: e.metalness ?? 0,
        side: V,
      });
      s.traverse((m) => {
        m.isMesh && (m.material = h);
      });
    }
    const o = [];
    (s.traverse((n) => {
      ((n.isLight ||
        n.isCamera ||
        (n.isMesh && /ground|background/i.test(n.name))) &&
        o.push(n),
        n.isMesh &&
          ((n.castShadow = !0),
          (n.receiveShadow = !0),
          (n.frustumCulled = !n.isSkinnedMesh)));
    }),
      o.forEach((n) => n.removeFromParent()),
      this.models.set(t, { model: s, animations: i ?? [] }));
  }
  instantiate(
    t,
    {
      dimension: e = "y",
      size: s = 1,
      rotation: i = [0, 0, 0],
      uniqueMaterials: a = !1,
    } = {},
  ) {
    const o = this.models.get(t);
    if (!o) return null;
    const n = fe(o.model),
      r = new S();
    (r.rotation.set(...i.map(F)), r.add(n), r.updateMatrixWorld(!0));
    const h = new Tt().setFromObject(r);
    if (h.isEmpty()) return null;
    const m = h.getSize(new d()),
      l = s / Math.max(m[e], 1e-5),
      p = h.getCenter(new d()),
      u = new S();
    (u.add(r),
      r.position.set(-p.x, -h.min.y, -p.z).multiplyScalar(l),
      r.scale.setScalar(l));
    const y = new Map();
    return (
      a &&
        n.traverse((f) => {
          if (!f.isMesh) return;
          const g = (w) => (y.has(w) || y.set(w, w.clone()), y.get(w));
          f.material = Array.isArray(f.material)
            ? f.material.map(g)
            : g(f.material);
        }),
      (u.userData.model = n),
      (u.userData.animations = o.animations),
      (u.userData.ownedMaterials = [...y.values()]),
      ["crowbar", "pistol", "smg", "shotgun"].includes(t) || ct(u),
      u
    );
  }
  repeatedTexture(t, e, s) {
    const i = this.textures.get(t);
    if (!i) return null;
    const a = i.clone();
    return (
      (a.wrapS = a.wrapT = Pt),
      a.repeat.set(e, s),
      (a.needsUpdate = !0),
      a
    );
  }
}
function Ht(c) {
  (c?.removeFromParent(),
    c?.userData.ownedMaterials?.forEach((t) => t.dispose()),
    c?.traverse((t) => {
      t.isSkinnedMesh && t.skeleton.dispose();
    }));
}
function H(c, t, e) {
  const s = z(c.x, e.min.x, e.max.x),
    i = z(c.z, e.min.z, e.max.z);
  return (c.x - s) ** 2 + (c.z - i) ** 2 < t ** 2;
}
class xe {
  constructor() {
    ((this.colliders = []), (this.version = 0));
  }
  addBox(t, e, s = null) {
    const a = {
      box: new Tt(
        new d(t.x - e.x / 2, t.y - e.y / 2, t.z - e.z / 2),
        new d(t.x + e.x / 2, t.y + e.y / 2, t.z + e.z / 2),
      ),
      target: s,
      active: !0,
    };
    return (this.colliders.push(a), this.version++, a);
  }
  setActive(t, e) {
    t.active !== e && ((t.active = e), this.version++);
  }
  canStand(t, e) {
    return !this.colliders.some(
      ({ box: s, active: i }) =>
        i &&
        t.position.y + t.height <= s.min.y + 0.01 &&
        t.position.y + e > s.min.y &&
        H(t.position, t.radius, s),
    );
  }
  move(t, e) {
    const s = t.velocity.length() * e,
      i = Math.max(1, Math.ceil(s / 0.15)),
      a = e / i,
      o = t.position;
    t.onGround = !1;
    for (let n = 0; n < i; n++) {
      ((o.x += t.velocity.x * a), (o.z += t.velocity.z * a));
      for (const { box: h, active: m } of this.colliders) {
        if (!m || o.y >= h.max.y - 0.001 || o.y + t.height <= h.min.y + 0.001)
          continue;
        const l = z(o.x, h.min.x, h.max.x),
          p = z(o.z, h.min.z, h.max.z),
          u = o.x - l,
          y = o.z - p,
          f = Math.hypot(u, y);
        if (!(f >= t.radius))
          if (f > 1e-5) {
            const g = u / f,
              w = y / f;
            ((o.x += g * (t.radius - f)), (o.z += w * (t.radius - f)));
            const T = t.velocity.x * g + t.velocity.z * w;
            T < 0 && ((t.velocity.x -= T * g), (t.velocity.z -= T * w));
          } else {
            const g = [
                o.x - h.min.x,
                h.max.x - o.x,
                o.z - h.min.z,
                h.max.z - o.z,
              ],
              w = g.indexOf(Math.min(...g));
            (w === 0 &&
              ((o.x = h.min.x - t.radius),
              (t.velocity.x = Math.min(0, t.velocity.x))),
              w === 1 &&
                ((o.x = h.max.x + t.radius),
                (t.velocity.x = Math.max(0, t.velocity.x))),
              w === 2 &&
                ((o.z = h.min.z - t.radius),
                (t.velocity.z = Math.min(0, t.velocity.z))),
              w === 3 &&
                ((o.z = h.max.z + t.radius),
                (t.velocity.z = Math.max(0, t.velocity.z))));
          }
      }
      const r = o.y;
      o.y += t.velocity.y * a;
      for (const { box: h, active: m } of this.colliders)
        !m ||
          !H(o, t.radius, h) ||
          (t.velocity.y <= 0 && r >= h.max.y - 0.001 && o.y <= h.max.y
            ? ((o.y = h.max.y), (t.velocity.y = 0), (t.onGround = !0))
            : t.velocity.y > 0 &&
              r + t.height <= h.min.y + 0.001 &&
              o.y + t.height >= h.min.y &&
              ((o.y = h.min.y - t.height), (t.velocity.y = 0)));
    }
    t.velocity.y <= 0 &&
      (t.onGround = this.colliders.some(
        ({ box: n, active: r }) =>
          r && Math.abs(o.y - n.max.y) < 0.002 && H(o, t.radius, n),
      ));
  }
  raycast(t, e, s = 120) {
    const i = new At(t, e);
    let a = null;
    for (const o of this.colliders) {
      if (!o.active) continue;
      const n = i.intersectBox(o.box, new d());
      if (!n) continue;
      const r = t.distanceTo(n);
      if (r > s || (a && r >= a.distance)) continue;
      const h = o.box,
        m = [
          Math.abs(n.x - h.min.x),
          Math.abs(n.x - h.max.x),
          Math.abs(n.y - h.min.y),
          Math.abs(n.y - h.max.y),
          Math.abs(n.z - h.min.z),
          Math.abs(n.z - h.max.z),
        ],
        l = [
          [-1, 0, 0],
          [1, 0, 0],
          [0, -1, 0],
          [0, 1, 0],
          [0, 0, -1],
          [0, 0, 1],
        ];
      a = {
        point: n,
        distance: r,
        normal: new d(...l[m.indexOf(Math.min(...m))]),
        target: o.target,
      };
    }
    return a;
  }
  isFree(t, e = 0.6, s = 0.8) {
    return !this.colliders.some(
      ({ box: i, active: a }) =>
        a && i.max.y > t.y + 0.05 && i.min.y < t.y + s && H(t, e, i),
    );
  }
}
function Me(c, t, e, s, i) {
  const a = Math.max(0, i / 2 - s),
    o = new At(c, t);
  let n = 1 / 0;
  for (const y of [-1, 1]) {
    const f = e.clone();
    f.y += y * a;
    const g = o.intersectSphere(new Et(f, s), new d());
    g && (n = Math.min(n, c.distanceTo(g)));
  }
  const r = c.x - e.x,
    h = c.z - e.z,
    m = t.x ** 2 + t.z ** 2,
    l = 2 * (r * t.x + h * t.z),
    p = r ** 2 + h ** 2 - s ** 2,
    u = l * l - 4 * m * p;
  if (m > 1e-6 && u >= 0)
    for (const y of [
      (-l - Math.sqrt(u)) / (2 * m),
      (-l + Math.sqrt(u)) / (2 * m),
    ]) {
      const f = c.y + t.y * y;
      y >= 0 && f >= e.y - a && f <= e.y + a && (n = Math.min(n, y));
    }
  return Number.isFinite(n) ? n : null;
}
function q(c, t) {
  try {
    return JSON.parse(localStorage.getItem(`rodent-outbreak:${c}`)) ?? t;
  } catch {
    return t;
  }
}
function X(c, t) {
  try {
    localStorage.setItem(`rodent-outbreak:${c}`, JSON.stringify(t));
  } catch {}
}
class be {
  constructor() {
    ((this.status = "menu"),
      (this.score = 0),
      (this.wave = 1),
      (this.bestScore = Number(q("best", 0)) || 0),
      (this.sensitivity = z(
        Number(q("sensitivity", 0.0022)) || 0.0022,
        5e-4,
        0.008,
      )));
  }
  addScore(t) {
    ((this.score += t),
      this.score > this.bestScore &&
        ((this.bestScore = this.score), X("best", this.bestScore)));
  }
  setSensitivity(t) {
    ((this.sensitivity = z(t, 5e-4, 0.008)),
      X("sensitivity", this.sensitivity));
  }
  reset() {
    ((this.score = 0), (this.wave = 1));
  }
}
class ke {
  constructor(t, e) {
    ((this.canvas = t),
      (this.game = e),
      (this.keys = new Set()),
      (this.pressed = new Set()),
      (this.buttons = new Set()),
      (this.buttonPressed = new Set()),
      (this.wheel = 0),
      (this.hadPointerLock = !1),
      (this.lockRequest = null),
      window.addEventListener("keydown", (s) => {
        (s.target instanceof HTMLInputElement &&
          !["Escape", "Enter"].includes(s.code)) ||
          ([
            "Space",
            "ArrowUp",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight",
            "F3",
            "F6",
          ].includes(s.code) && s.preventDefault(),
          s.repeat ||
            (this.pressed.add(s.code),
            s.code === "Escape" && e.togglePause(),
            ["Enter", "KeyR"].includes(s.code) &&
              e.state.status === "game-over" &&
              e.start(!0),
            s.code === "F3" && e.hud.toggleDebug(),
            s.code === "F6" && e.weapons?.toggleCalibration(),
            e.weapons?.calibrate(s.code)),
          this.keys.add(s.code));
      }),
      window.addEventListener("keyup", (s) => this.keys.delete(s.code)),
      window.addEventListener("mousemove", (s) => {
        (this.locked || (e.noCapture && this.buttons.has(1))) &&
          e.state.status === "playing" &&
          e.player.look(s.movementX, s.movementY);
      }),
      t.addEventListener("mousedown", (s) => {
        (!this.locked && !e.noCapture) ||
          e.state.status !== "playing" ||
          (s.button === 1 && s.preventDefault(),
          this.buttons.add(s.button),
          this.buttonPressed.add(s.button));
      }),
      window.addEventListener("mouseup", (s) => this.buttons.delete(s.button)),
      t.addEventListener(
        "wheel",
        (s) => {
          (s.preventDefault(),
            (this.locked || e.noCapture) &&
              (this.wheel += Math.sign(s.deltaY)));
        },
        { passive: !1 },
      ),
      t.addEventListener("contextmenu", (s) => s.preventDefault()),
      document.addEventListener("pointerlockchange", () => {
        const s = this.hadPointerLock;
        ((this.hadPointerLock = this.locked),
          this.locked
            ? this.lockRequest
              ? this.finishLock()
              : (e.state.status !== "playing" || e.noCapture) && this.unlock()
            : s &&
              !this.lockRequest &&
              !e.noCapture &&
              (this.clear(), e.pause(!1)));
      }),
      document.addEventListener("pointerlockerror", () =>
        this.finishLock(new Error("Захват мыши отклонён браузером.")),
      ),
      window.addEventListener("blur", () => {
        (this.clear(), e.pause());
      }),
      document.addEventListener("visibilitychange", () => {
        document.hidden && e.pause();
      }));
  }
  get locked() {
    return document.pointerLockElement === this.canvas;
  }
  down(...t) {
    return t.some((e) => this.keys.has(e));
  }
  just(t) {
    return this.pressed.has(t);
  }
  endFrame() {
    (this.pressed.clear(), this.buttonPressed.clear(), (this.wheel = 0));
  }
  clear() {
    (this.keys.clear(), this.buttons.clear(), this.endFrame());
  }
  finishLock(t) {
    const e = this.lockRequest;
    e && ((this.lockRequest = null), t ? e.reject(t) : e.resolve());
  }
  cancelLock() {
    const t = new Error("Запуск отменён при потере фокуса.");
    ((t.name = "AbortError"), this.finishLock(t));
  }
  unlock() {
    (this.cancelLock(),
      (this.hadPointerLock = !1),
      this.locked && document.exitPointerLock());
  }
  lock() {
    if (this.locked) return ((this.hadPointerLock = !0), Promise.resolve());
    if (!this.canvas.requestPointerLock)
      return Promise.reject(new Error("Браузер не поддерживает захват мыши."));
    if (this.lockRequest) return this.lockRequest.promise;
    const t = {};
    ((t.promise = new Promise((e, s) => {
      ((t.resolve = e), (t.reject = s));
    })),
      (this.lockRequest = t));
    try {
      Promise.resolve(this.canvas.requestPointerLock()).catch((e) => {
        this.lockRequest === t && this.finishLock(e);
      });
    } catch (e) {
      this.finishLock(e);
    }
    return t.promise;
  }
}
const v = Object.freeze({
    walkSpeed: 5.2,
    sprintSpeed: 8.2,
    crouchSpeed: 2.6,
    jumpSpeed: 5.4,
    acceleration: 12,
    friction: 6,
    airAcceleration: 3.5,
    gravity: 18,
    staminaMax: 100,
    staminaDrain: 22,
    staminaRegen: 18,
    staminaDelay: 0.8,
    staminaRecover: 25,
    radius: 0.42,
    height: 1.8,
    crouchHeight: 1,
    eyeHeight: 1.55,
    crouchEyeHeight: 0.85,
    armorAbsorb: 0.66,
    fov: 90,
  }),
  Se = [
    {
      id: 0,
      name: "МОНТИРОВКА",
      short: "ЛОМ",
      melee: !0,
      damage: 25,
      rate: 0.42,
      range: 2.3,
      capacity: 0,
      ammoType: "",
      unlocked: !0,
      kick: 0,
      pitch: 0,
    },
    {
      id: 1,
      name: "ПИСТОЛЕТ 9MM",
      short: "9MM",
      damage: 18,
      rate: 0.22,
      capacity: 12,
      ammoType: "pistol",
      pellets: 1,
      spread: 0.6,
      kick: 0.05,
      pitch: 0.02,
      reloadTime: 1.3,
      unlocked: !0,
    },
    {
      id: 2,
      name: "АВТОМАТ SMG",
      short: "SMG",
      damage: 14,
      rate: 0.09,
      capacity: 30,
      ammoType: "smg",
      pellets: 1,
      spread: 2.2,
      kick: 0.04,
      pitch: 0.015,
      reloadTime: 1.6,
      automatic: !0,
      unlocked: !1,
    },
    {
      id: 3,
      name: "ДРОБОВИК",
      short: "12G",
      damage: 11,
      rate: 0.85,
      capacity: 6,
      ammoType: "shotgun",
      pellets: 8,
      spread: 4.2,
      kick: 0.12,
      pitch: 0.055,
      reloadTime: 2.2,
      unlocked: !1,
      altCost: 2,
      altPellets: 16,
      altSpread: 6.5,
      altRate: 1.2,
    },
  ],
  ze = { pistol: 36, smg: 90, shotgun: 18 },
  vt = { pistol: 150, smg: 250, shotgun: 60 },
  Te = {
    mouse: {
      name: "Мышь",
      health: 16,
      speed: 6.98,
      damage: 10,
      range: 2,
      cooldown: 0.55,
      score: 50,
      dropChance: 0.25,
      stagger: 0.35,
      radius: 0.28,
      height: 0.58,
      hitRadius: 0.546,
      hitHeight: 1.04,
      hitY: 0.35,
    },
    rat: {
      name: "Крыса",
      health: 45,
      speed: 6.55,
      damage: 18,
      range: 3.2,
      cooldown: 0.8,
      score: 120,
      dropChance: 0.4,
      stagger: 0.35,
      radius: 0.55,
      height: 1.95,
      hitRadius: 0.845,
      hitHeight: 2.73,
      hitY: 1.05,
      leap: !0,
      leapMin: 2.2,
      leapMax: 12,
      leapSpeed: 15,
      leapHeight: 6.2,
      leapCooldown: 2.4,
      leapUnseenTime: 2.5,
      leapWatchTime: 0.7,
      rageThreshold: 0.35,
      rageSpeed: 1.35,
      rageLeap: 1.35,
    },
    capybara: {
      name: "Капибара-танк",
      health: 500,
      speed: 3.44,
      damage: 40,
      range: 3.8,
      cooldown: 1.2,
      score: 350,
      dropChance: 0.7,
      stagger: 0.1,
      stun: !0,
      radius: 0.9,
      height: 1.95,
      hitRadius: 1.43,
      hitHeight: 2.86,
      hitY: 1,
      charge: !0,
      chargeMin: 5,
      chargeMax: 15,
      chargeSpeed: 7.8,
      chargeDuration: 1.6,
      chargeCooldown: 6.5,
    },
  },
  Pe = [
    [-9, -6.5],
    [-8, -5.5],
    [12.5, -11.5],
    [-13.5, 8.5],
    [9.5, 6.5],
    [9.8, 8],
    [-2, 13],
  ],
  Ae = [
    [-15, -10],
    [-15.5, -4.5],
    [-15, 10],
    [15, -10],
    [15.5, 4.5],
    [15, 10],
    [-8, -15],
    [8, -15],
    [-8, 15],
    [8, 15],
  ];
function xt(c) {
  const t = 6 + (c - 1) * 3;
  return c % 5 === 0 ? Math.floor(t * 1.3) : t;
}
function Ee(c) {
  return Math.max(0.6, 2.2 - c * 0.12);
}
function Ce(c, t = Math.random()) {
  if (c === 1) return t < 0.5 ? "rat" : "mouse";
  if (c === 2) return t < 0.7 ? "rat" : "mouse";
  if (c === 3) return t < 0.55 ? "rat" : t < 0.85 ? "mouse" : "capybara";
  if (c === 4) return t < 0.5 ? "rat" : t < 0.75 ? "mouse" : "capybara";
  const e = c % 5 === 0 ? 0.3 : 0.2;
  return t < e ? "capybara" : t < e + 0.5 ? "rat" : "mouse";
}
function Re(c, t) {
  const e = Math.min(t, c * v.armorAbsorb);
  return { healthDamage: c - e, armor: t - e };
}
const E = 18,
  C = 5.2,
  De = (c) => c - Math.floor(c),
  O = (c, t) => De(Math.sin(c * 127.1 + t * 311.7) * 43758.5453),
  I = (c, t, e) => {
    const s = Math.max(0, Math.min(1, (e - c) / (t - c)));
    return s * s * (3 - 2 * s);
  };
function U(c, t) {
  const e = Math.floor(c),
    s = Math.floor(t),
    i = I(0, 1, c - e),
    a = I(0, 1, t - s),
    o = O(e, s),
    n = O(e + 1, s),
    r = O(e, s + 1),
    h = O(e + 1, s + 1);
  return (o + (n - o) * i) * (1 - a) + (r + (h - r) * i) * a;
}
function Le() {
  const e = new Uint8Array(262144);
  for (let i = 0; i < 4; i++)
    for (let a = 0; a < 128; a++)
      for (let o = 0; o < 128; o++) {
        const n = ((o + 0.5) / 128) * 2 - 1,
          r = ((a + 0.5) / 128) * 2 - 1,
          h = n * 3 + i * 13.7,
          m = r * 3 + i * 7.3,
          l = U(h, m),
          p =
            0.58 * l + 0.28 * U(h * 2.1, m * 2.1) + 0.14 * U(h * 4.3, m * 4.3),
          u = Math.hypot(n + (U(h + 4, m) - 0.5) * 0.26, r + (l - 0.5) * 0.24),
          f =
            (1 - I(0.25, 0.96, u)) *
            I(0.19, 0.76, p) *
            (1 - I(0.87, 0.99, Math.max(Math.abs(n), Math.abs(r)))),
          g = ((a + Math.floor(i / 2) * 128) * 256 + o + (i % 2) * 128) * 4;
        ((e[g] = e[g + 1] = e[g + 2] = Math.round((0.25 + p * 0.75) * 255)),
          (e[g + 3] = Math.round(f * 255)));
      }
  const s = new ht(e, 256, 256);
  return ((s.magFilter = s.minFilter = N), (s.needsUpdate = !0), s);
}
class Fe {
  constructor(t, e) {
    ((this.barrels = e),
      (this.emitters = e.map((a) => ({ barrel: a, stopped: a.exploded }))),
      (this.puffs = []),
      (this.order = []),
      (this.time = 0));
    const s = e.length * E;
    ((this.centers = new Float32Array(s * 3)),
      (this.params = new Float32Array(s * 4)),
      (this.texture = Le()));
    const i = new Ct(1, 1);
    ((this.geometry = new Xt()),
      (this.geometry.index = i.index),
      this.geometry.setAttribute("position", i.attributes.position),
      this.geometry.setAttribute("uv", i.attributes.uv),
      this.geometry.setAttribute(
        "smokeCenter",
        new pt(this.centers, 3).setUsage(ot),
      ),
      this.geometry.setAttribute(
        "smokeParams",
        new pt(this.params, 4).setUsage(ot),
      ),
      (this.geometry.instanceCount = s),
      (this.material = new Zt({
        uniforms: { ...Jt.clone(Qt.fog), atlas: { value: this.texture } },
        transparent: !0,
        depthWrite: !1,
        fog: !0,
        vertexShader: `
        attribute vec3 smokeCenter;
        attribute vec4 smokeParams;
        varying vec2 vUv;
        varying float vOpacity;
        varying float vHeat;
        varying float vHeight;
        #include <fog_pars_vertex>
        void main() {
          float c = cos(smokeParams.y), s = sin(smokeParams.y);
          vec2 offset = mat2(c, -s, s, c) * position.xy * smokeParams.x;
          vec4 mvPosition = modelViewMatrix * vec4(smokeCenter, 1.0);
          vOpacity = smokeParams.z * smoothstep(0.35, 1.5, -mvPosition.z);
          mvPosition.xy += offset;
          vHeight = smokeCenter.y + offset.x * viewMatrix[1][0] + offset.y * viewMatrix[1][1];
          vHeat = 1.0 - smoothstep(1.6, 2.6, smokeCenter.y);
          float tile = smokeParams.w;
          vUv = (uv * 0.992 + 0.004 + vec2(mod(tile, 2.0), floor(tile / 2.0))) * 0.5;
          gl_Position = projectionMatrix * mvPosition;
          #include <fog_vertex>
        }
      `,
        fragmentShader: `
        uniform sampler2D atlas;
        varying vec2 vUv;
        varying float vOpacity;
        varying float vHeat;
        varying float vHeight;
        #include <fog_pars_fragment>
        void main() {
          vec4 cloud = texture2D(atlas, vUv);
          float alpha = cloud.a * vOpacity * smoothstep(1.35, 1.75, vHeight);
          if (alpha < 0.002) discard;
          vec3 soot = mix(vec3(0.008, 0.010, 0.013), vec3(0.034, 0.038, 0.043), cloud.r);
          soot += vec3(0.11, 0.031, 0.006) * vHeat * cloud.r;
          gl_FragColor = vec4(soot, alpha);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
          #include <fog_fragment>
        }
      `,
      })),
      (this.mesh = new k(this.geometry, this.material)),
      (this.mesh.name = "Barrel smoke (single instanced draw)"),
      (this.mesh.frustumCulled = !1),
      (this.mesh.onBeforeRender = (a, o, n) => this.pack(n)),
      t.add(this.mesh),
      e.forEach((a, o) => {
        for (let n = 0; n < E; n++) {
          const r = O(o + 1, n + 1),
            h = {
              barrel: a,
              seed: r,
              age: (n / E) * C,
              x: 0,
              y: 0,
              z: 0,
              size: 0,
              opacity: 0,
              rotation: 0,
              tile: n % 4,
              depth: 0,
            };
          (this.puffs.push(h), this.order.push(h));
        }
      }),
      this.update(0));
  }
  reset() {
    ((this.time = 0),
      this.emitters.forEach((t) => {
        t.stopped = t.barrel.exploded;
      }),
      this.puffs.forEach((t, e) => {
        t.age = ((e % E) / E) * C;
      }),
      this.update(0));
  }
  update(t) {
    ((this.time += t),
      this.emitters.forEach((e, s) => {
        if (e.stopped && !e.barrel.exploded)
          for (let i = 0; i < E; i++) {
            const a = this.puffs[s * E + i];
            a.age >= C && (a.age = (-i / E) * C);
          }
        e.stopped = e.barrel.exploded;
      }));
    for (const e of this.puffs) {
      if (((e.age += t), e.age < 0)) {
        e.opacity = 0;
        continue;
      }
      e.age >= C && !e.barrel.exploded && (e.age %= C);
      const s = Math.min(e.age, C),
        i = s / C,
        a = e.seed * Math.PI * 2,
        o = 0.06 + i * 0.6;
      ((e.x = e.barrel.position.x + Math.sin(s * 1.25 + a) * o + i * 0.25),
        (e.z = e.barrel.position.z + Math.cos(s * 1.05 + a) * o),
        (e.y = 1.65 + s * (0.68 + e.seed * 0.12)),
        (e.size = 0.65 + s * (0.43 + e.seed * 0.12)),
        (e.opacity = 0.78 * I(0, 0.12, i) * (1 - I(0.48, 1, i))),
        (e.rotation = a + s * (e.seed - 0.5) * 0.35));
    }
  }
  pack(t) {
    const e = t.matrixWorldInverse.elements;
    for (const i of this.order)
      i.depth = e[2] * i.x + e[6] * i.y + e[10] * i.z + e[14];
    this.order.sort((i, a) => i.depth - a.depth);
    let s = 0;
    for (const i of this.order) {
      if (i.opacity <= 0.001) continue;
      const a = s * 3,
        o = s * 4;
      ((this.centers[a] = i.x),
        (this.centers[a + 1] = i.y),
        (this.centers[a + 2] = i.z),
        (this.params[o] = i.size),
        (this.params[o + 1] = i.rotation),
        (this.params[o + 2] = i.opacity),
        (this.params[o + 3] = i.tile),
        s++);
    }
    ((this.geometry.instanceCount = s),
      (this.geometry.attributes.smokeCenter.needsUpdate = !0),
      (this.geometry.attributes.smokeParams.needsUpdate = !0));
  }
}
class Ie {
  constructor(t) {
    ((this.game = t),
      (this.root = new S()),
      t.scene.add(this.root),
      (this.barrels = []),
      (this.lights = []),
      (this.time = 0),
      (this.fogSprites = []),
      (this.staticMeshes = []),
      (this.sharedStaticGeometry = new Set()),
      (this.burrows = Ae.map(([e, s]) => new d(e, 0.05, s))),
      this.build(),
      this.batchStaticMeshes(),
      ct(this.root),
      (this.smoke = new Fe(this.root, this.barrels)));
  }
  material(t, e, s = [1, 1]) {
    return new R({
      map: this.game.assets.repeatedTexture(t, ...s),
      color: e,
      roughness: 0.9,
    });
  }
  box(t, e, s, i = !0) {
    const a = new k(new B(...e), s);
    return (
      a.position.set(...t),
      (a.castShadow = !0),
      (a.receiveShadow = !0),
      this.root.add(a),
      this.staticMeshes.push(a),
      i && this.game.physics.addBox(a.position, new d(...e)),
      a
    );
  }
  build() {
    const t = this.material("floor", 10134182),
      e = this.material("wall", 9147029);
    ((t.userData.worldUV = 0.5), (e.userData.worldUV = 0.5));
    const s = this.material("wall", 8949652, [2, 1]),
      i = this.material("crate", 16777215);
    this.box([0, -0.5, 0], [44, 1, 44], t);
    for (const o of [-1, 1]) {
      for (const n of [-11.6, 11.6])
        (this.box([n, 4, o * 20.75], [19.8, 8, 1.5], e, !1),
          this.box([o * 20.75, 4, n], [1.5, 8, 19.8], e, !1));
      (this.box([0, 6.2, o * 20.75], [3.4, 3.6, 1.5], e, !1),
        this.box([o * 20.75, 6.2, 0], [1.5, 3.6, 3.4], e, !1),
        this.game.physics.addBox(new d(0, 4, o * 20.75), new d(43, 8, 1.5)),
        this.game.physics.addBox(new d(o * 20.75, 4, 0), new d(1.5, 8, 40)));
    }
    (this.box(
      [0, 8.4, 0],
      [44, 0.8, 44],
      new R({ color: 2436145, roughness: 1 }),
      !1,
    ),
      this.buildDepthIllusions(e, t));
    for (const [o, n, r, h] of [
      [-8, 0.75, -8, 1.5],
      [-7, 0.5, -9.5, 1],
      [10, 1, -10, 2],
      [11.5, 0.5, -8.5, 1],
      [-12, 0.75, 10, 1.5],
      [-10.5, 0.5, 11, 1],
      [8, 0.75, 8, 1.5],
      [6.5, 0.5, 9, 1],
      [0, 0.6, -14, 1.2],
      [0, 0.6, 14, 1.2],
    ])
      this.box([o, n, r], [h, h, h], i);
    for (const [o, n] of [
      [
        [-4, 0.6, 2],
        [3, 1.2, 0.8],
      ],
      [
        [4, 0.6, -2],
        [3, 1.2, 0.8],
      ],
      [
        [-14, 0.6, 0],
        [0.8, 1.2, 3.5],
      ],
      [
        [14, 0.6, 0],
        [0.8, 1.2, 3.5],
      ],
    ])
      this.box(o, n, s);
    for (const [o, n] of [
      [-7, -7],
      [7, -7],
      [-7, 7],
      [7, 7],
    ]) {
      const r = this.game.assets.instantiate("pillar", { size: 8 });
      (r
        ? (r.position.set(o, 0, n), this.root.add(r), this.collectStaticProp(r))
        : this.box([o, 4, n], [1.5, 8, 1.5], s, !1),
        this.game.physics.addBox(new d(o, 4, n), new d(1.5, 8, 1.5)));
    }
    const a = new R({ color: 2169363, roughness: 1 });
    for (const o of this.burrows) {
      const n = new k(new dt(0.9, 0.7, 0.12, 20), a);
      (n.position.copy(o), this.root.add(n));
      for (let r = 0; r < 6; r++) {
        const h = (r * Math.PI) / 3,
          m = this.box(
            [o.x + Math.cos(h), 0.12, o.z + Math.sin(h)],
            [b(0.2, 0.35), b(0.12, 0.22), b(0.2, 0.35)],
            a,
            !1,
          );
        m.rotation.y = b(0, Math.PI * 2);
      }
    }
    for (const [o, n] of Pe) this.createBarrel(o, n);
    this.buildLighting();
  }
  buildDepthIllusions(t, e) {
    const s = new R({ color: 2700348, roughness: 0.85, metalness: 0.35 }),
      i = new A({ color: 330254 }),
      a = new A({ color: 7951416 }),
      o = new A({ color: 3558744 });
    for (const [n, r, h] of [
      [0, -20, Math.PI],
      [0, 20, 0],
      [-20, 0, -Math.PI / 2],
      [20, 0, Math.PI / 2],
    ]) {
      const m = new S();
      (m.position.set(n, 0, r),
        (m.rotation.y = h),
        (m.name = "depth-corridor"),
        this.root.add(m));
      const l = (p, u, y) => {
        const f = new k(new B(...u), y);
        return (f.position.set(...p), m.add(f), this.staticMeshes.push(f), f);
      };
      (l([0, -0.5, 14], [4.4, 1, 24], e),
        l([-2, 2.2, 13.75], [0.6, 4.4, 24.5], t),
        l([2, 2.2, 13.75], [0.6, 4.4, 24.5], t),
        l([0, 4.6, 13.75], [4.4, 0.4, 24.5], s),
        l([0, 2.2, 26], [4.4, 4.4, 0.3], i));
      for (const p of [5, 10, 16, 23])
        (l([-1.65, 2.1, p], [0.15, 4.2, 0.2], s),
          l([1.65, 2.1, p], [0.15, 4.2, 0.2], s),
          l([0, 4.1, p], [3.4, 0.18, 0.2], s),
          l([0, 3.9, p + 0.3], [1, 0.08, 0.12], p < 10 ? a : o));
      for (const p of [-1, 1]) l([p * 1.63, 2.2, -0.08], [0.14, 4.4, 0.2], s);
      (l([0, 4.35, -0.08], [3.4, 0.16, 0.2], s),
        l([0, 0.06, -0.08], [3.4, 0.12, 0.25], s));
      for (let p = -2; p <= 2; p++)
        l([p * 0.6, 2.18, 0.05], [0.055, 4.24, 0.055], s);
      l([0, 1.8, 0.05], [3.4, 0.08, 0.08], s);
    }
    for (const [n, r] of [
      [-12, -5],
      [12, 5],
      [0, -12],
      [0, 12],
    ]) {
      const h = new K(
        new Y({
          map: this.game.effects.smokeTexture,
          color: 4546155,
          opacity: 0.12,
          transparent: !0,
          depthWrite: !1,
        }),
      );
      (h.position.set(n, 0.4, r),
        h.scale.set(9, 1.1, 1),
        this.root.add(h),
        this.fogSprites.push(h));
    }
  }
  batchStaticMeshes() {
    this.root.updateMatrixWorld(!0);
    const t = new Map();
    for (const e of this.staticMeshes) {
      e.material.userData.worldUV &&
        this.projectTexture(e, e.material.userData.worldUV);
      const s =
          e.userData.staticSector ??
          (e.parent === this.root
            ? `${Math.sign(e.position.x)}:${Math.sign(e.position.z)}`
            : e.parent.id),
        i = Object.keys(e.geometry.attributes)
          .sort()
          .map((o) => `${o}:${e.geometry.attributes[o].itemSize}`)
          .join(","),
        a = `${s}:${e.material.id}:${e.castShadow}:${e.receiveShadow}:${!!e.geometry.index}:${i}`;
      (t.has(a) || t.set(a, []), t.get(a).push(e));
    }
    for (const e of t.values()) {
      if (e.length < 2) continue;
      const s = e.map((n) => n.geometry.clone().applyMatrix4(n.matrixWorld)),
        i = te(s),
        a = e[0],
        o = new k(i, a.material);
      ((o.castShadow = a.castShadow),
        (o.receiveShadow = a.receiveShadow),
        (o.matrixAutoUpdate = !1),
        this.root.add(o));
      for (const n of e)
        (n.removeFromParent(),
          this.sharedStaticGeometry.has(n.geometry) || n.geometry.dispose());
      s.forEach((n) => n.dispose());
    }
    ((this.staticMeshes.length = 0), this.sharedStaticGeometry.clear());
  }
  projectTexture(t, e) {
    const { position: s, normal: i, uv: a } = t.geometry.attributes,
      o = new d(),
      n = new d(),
      r = new Rt().getNormalMatrix(t.matrixWorld);
    for (let h = 0; h < s.count; h++)
      (o.fromBufferAttribute(s, h).applyMatrix4(t.matrixWorld),
        n.fromBufferAttribute(i, h).applyMatrix3(r).normalize(),
        Math.abs(n.y) > 0.5
          ? a.setXY(h, o.x * e, o.z * e)
          : a.setXY(h, (Math.abs(n.x) > 0.5 ? o.z : o.x) * e, o.y * e));
    a.needsUpdate = !0;
  }
  collectStaticProp(t) {
    const e = `prop:${Math.sign(t.position.x)}:${Math.sign(t.position.z)}`;
    t.traverse((s) => {
      !s.isMesh ||
        s.isSkinnedMesh ||
        Array.isArray(s.material) ||
        Object.keys(s.geometry.morphAttributes).length ||
        ((s.userData.staticSector = e),
        this.staticMeshes.push(s),
        this.sharedStaticGeometry.add(s.geometry));
    });
  }
  buildLighting() {
    ((this.game.scene.background = new Z(198153)),
      (this.game.scene.fog = new ee(594714, 0.034)),
      (this.game.renderer.toneMappingExposure = 0.95),
      this.root.add(new Dt(5797001, 1380363, 0.14)));
    const t = new Lt(7441064, 0.035);
    (t.position.set(-10, 25, -8), this.root.add(t));
    const e = new A({ color: 16765849 });
    for (const [s, i, a] of [
      [0, 0, !1],
      [-10, -10, !0],
      [10, -10, !1],
      [-10, 10, !1],
      [10, 10, !0],
    ]) {
      const o = this.game.assets.instantiate("lamp", {
        dimension: "x",
        size: 0.7,
      });
      o &&
        (o.position.set(s, 6.7, i),
        this.root.add(o),
        this.collectStaticProp(o));
      const n = new k(new G(0.12, 8, 6), e);
      (n.position.set(s, 6.65, i), this.root.add(n));
      const r = new nt(
        a ? 16761743 : 16767413,
        s === 0 ? 155 : 135,
        30,
        1.12,
        1,
        2,
      );
      (r.position.set(s, 6.5, i),
        r.target.position.set(s, 0, i),
        (r.userData.baseIntensity = r.intensity),
        s === 0 &&
          ((r.castShadow = !0),
          r.shadow.mapSize.set(1024, 1024),
          (r.shadow.camera.near = 0.5),
          (r.shadow.camera.far = 22),
          (r.shadow.bias = -2e-4),
          (r.shadow.normalBias = 0.045)),
        this.root.add(r, r.target));
      const h = new K(
        new Y({
          map: this.game.effects.glowTexture,
          color: 16766626,
          opacity: 0.23,
          depthWrite: !1,
          blending: _,
        }),
      );
      (h.position.set(s, 6.6, i),
        h.scale.setScalar(1.3),
        this.root.add(h),
        (r.userData.halo = h),
        a && this.lights.push(r));
    }
  }
  createBarrel(t, e) {
    const s =
      this.game.assets.instantiate("barrel", { size: 1.45 }) ??
      new k(new dt(0.5, 0.5, 1.45, 16), this.material("rust", 11941154));
    s.position.set(t, s.isMesh ? 0.725 : 0, e);
    const i = {
        position: new d(t, 0, e),
        mesh: s,
        exploded: !1,
        takeDamage: () => this.explode(i),
      },
      a = s.isMesh ? e : e + 0.2768;
    ((i.light = new nt(16738340, 12, 5.5, 1.35, 1, 2)),
      (i.light.userData.barrelEmitter = !0),
      i.light.position.set(t, 1.451, a),
      i.light.target.position.set(t, 2.451, a),
      this.root.add(i.light, i.light.target),
      (i.glow = new k(
        new se(0.055, 24),
        new A({
          map: this.game.effects.glowTexture,
          color: 16740895,
          transparent: !0,
          opacity: 0.95,
          depthWrite: !1,
          blending: _,
        }),
      )),
      (i.glow.rotation.x = -Math.PI / 2),
      i.glow.position.set(t, s.isMesh ? 1.451 : 1.439, a),
      this.root.add(i.glow),
      (i.collider = this.game.physics.addBox(
        new d(t, 0.725, e),
        new d(1, 1.45, 1),
        i,
      )),
      this.barrels.push(i),
      this.root.add(s));
  }
  explode(t) {
    if (t.exploded) return;
    ((t.exploded = !0),
      (t.mesh.visible = !1),
      this.game.physics.setActive(t.collider, !1),
      t.light && ((t.light.intensity = 0), (t.glow.visible = !1)));
    const e = t.position.clone().add(new d(0, 0.7, 0));
    this.game.effects.explosion(e);
    for (const a of this.game.enemies) {
      if (a.dead) continue;
      const o = a.position.distanceTo(e);
      if (o > 6) continue;
      const n = 1 - o / 6,
        r = a.position.clone().sub(e).normalize();
      (a.takeDamage(160 * n, e, r),
        a.velocity.addScaledVector(r, 12 * n),
        (a.velocity.y += 5 * n));
    }
    const s = this.game.player,
      i = s.position.distanceTo(e);
    if (
      ((s.shake = Math.max(s.shake, Math.max(0, (1 - i / 18) * 0.22))), i <= 6)
    ) {
      const a = 1 - i / 6,
        o = s.position.clone().sub(e).normalize();
      (s.takeDamage(65 * a, o),
        s.velocity.addScaledVector(o, 10 * a),
        (s.velocity.y += 4 * a));
    }
    for (const a of this.barrels)
      a !== t &&
        !a.exploded &&
        a.position.distanceTo(e) <= 5.1 &&
        this.game.schedule(0.08, () => this.explode(a));
  }
  respawnBarrels() {
    let t = 0;
    for (const e of this.barrels)
      e.exploded &&
        (this.game.player.position.distanceTo(e.position) < 1.5 ||
          this.game.enemies.some(
            (s) => !s.dead && s.position.distanceTo(e.position) < 1.5,
          ) ||
          ((e.exploded = !1),
          (e.mesh.visible = !0),
          this.game.physics.setActive(e.collider, !0),
          e.light && ((e.light.intensity = 12), (e.glow.visible = !0)),
          t++));
    return t;
  }
  reset() {
    ((this.time = 0), this.respawnBarrels());
    for (const t of this.lights) t.intensity = t.userData.baseIntensity;
    (this.smoke.reset(), this.update(0));
  }
  update(t) {
    this.time += t;
    for (const e of this.lights) {
      const s = e.userData.baseIntensity,
        i = this.time * 2.8 + e.position.x * 0.23,
        a = s * (0.96 + 0.035 * Math.sin(i) + 0.015 * Math.sin(i * 3.7));
      ((e.intensity = M(e.intensity, a, 5, t)),
        (e.userData.halo.material.opacity = (0.23 * e.intensity) / s));
    }
    for (const e of this.barrels) {
      if (e.exploded) continue;
      const s = 0.85 + Math.sin(this.time * 7 + e.position.x) * 0.15;
      ((e.light.intensity = 12 * s), (e.glow.material.opacity = 0.95 * s));
    }
    (this.fogSprites.forEach((e, s) => {
      e.material.opacity = 0.1 + Math.sin(this.time * 0.22 + s) * 0.025;
    }),
      this.smoke.update(t));
  }
}
class Oe {
  constructor(t) {
    ((this.game = t),
      (this.position = new d()),
      (this.velocity = new d()),
      (this.radius = v.radius),
      (this.camera = new Ft(v.fov, innerWidth / innerHeight, 0.025, 140)),
      (this.camera.rotation.order = "YXZ"),
      t.scene.add(this.camera),
      (this.flashlight = new nt(
        15660543,
        70,
        28,
        (Math.PI * 38) / 180,
        0.45,
        1,
      )),
      this.flashlight.position.set(0, -0.05, 0),
      this.flashlight.target.position.set(0, 0, -10),
      this.camera.add(this.flashlight, this.flashlight.target),
      this.reset());
  }
  reset() {
    (this.position.set(0, 0.2, 0),
      this.velocity.set(0, 0, 0),
      (this.health = 100),
      (this.armor = 100),
      (this.dead = !1),
      (this.stamina = v.staminaMax),
      (this.staminaDelay = 0),
      (this.exhausted = !1),
      (this.sprinting = !1),
      (this.yaw = 0),
      (this.pitch = 0),
      (this.height = v.height),
      (this.crouching = !1),
      (this.onGround = !1),
      (this.eyeHeight = v.eyeHeight),
      (this.bobTime = 0),
      (this.landingDip = 0),
      (this.stun = 0),
      (this.shake = 0),
      (this.damagePitch = 0),
      (this.deathTime = 0),
      (this.flashlightOn = !1),
      (this.flashlightCharge = 100),
      (this.flashlight.intensity = 0),
      this.updateCamera(0));
  }
  look(t, e) {
    ((this.yaw -= t * this.game.state.sensitivity),
      (this.pitch = z(
        this.pitch - e * this.game.state.sensitivity,
        -Math.PI * 0.4944,
        Math.PI * 0.4944,
      )),
      this.game.weapons.addSway(t, e));
  }
  update(t) {
    if (this.dead) {
      ((this.deathTime += t),
        (this.eyeHeight = M(this.eyeHeight, 0.25, 5, t)),
        this.updateCamera(t));
      return;
    }
    const e = this.game.input;
    (this.game.noCapture &&
      ((this.yaw +=
        (Number(e.down("KeyQ")) - Number(e.down("KeyE"))) * t * 1.8),
      (this.pitch = z(
        this.pitch +
          (Number(e.down("PageUp")) - Number(e.down("PageDown"))) * t * 1.2,
        -1.553,
        1.553,
      ))),
      (this.stun = Math.max(0, this.stun - t)),
      e.down("ControlLeft", "ControlRight", "KeyC")
        ? (this.crouching = !0)
        : this.game.physics.canStand(this, v.height) && (this.crouching = !1),
      (this.height = this.crouching ? v.crouchHeight : v.height),
      (this.eyeHeight = M(
        this.eyeHeight,
        this.crouching ? v.crouchEyeHeight : v.eyeHeight,
        12,
        t,
      )));
    let i =
        Number(e.down("KeyD", "ArrowRight")) -
        Number(e.down("KeyA", "ArrowLeft")),
      a =
        Number(e.down("KeyS", "ArrowDown")) - Number(e.down("KeyW", "ArrowUp"));
    const o = Math.hypot(i, a);
    o && ((i /= o), (a /= o));
    const n = Math.cos(this.yaw),
      r = Math.sin(this.yaw);
    this.sprinting =
      e.down("ShiftLeft", "ShiftRight") &&
      a < 0 &&
      this.onGround &&
      !this.crouching &&
      !this.stun &&
      !this.exhausted &&
      this.stamina > 0;
    let h = this.crouching
      ? v.crouchSpeed
      : this.sprinting
        ? v.sprintSpeed
        : v.walkSpeed;
    this.stun && (h *= 0.55);
    const m = (i * n + a * r) * h,
      l = (-i * r + a * n) * h;
    (this.onGround
      ? ft(this.velocity, m, l, (o ? v.acceleration : v.friction) * t)
      : o && ft(this.velocity, m, l, v.airAcceleration * t),
      e.just("Space") &&
        this.onGround &&
        !this.crouching &&
        (this.velocity.y = v.jumpSpeed),
      (this.velocity.y -= v.gravity * t));
    const p = this.onGround,
      u = this.velocity.y,
      y = this.position.x,
      f = this.position.z;
    (this.game.physics.move(this, t),
      this.updateStamina(
        t,
        this.sprinting &&
          Math.hypot(this.position.x - y, this.position.z - f) > t * 0.5,
      ));
    for (const g of this.game.enemies) {
      if (
        g.dead ||
        g.state === "emerging" ||
        this.position.y >= g.position.y + g.height ||
        this.position.y + this.height <= g.position.y
      )
        continue;
      const w = this.position.x - g.position.x,
        T = this.position.z - g.position.z,
        P = Math.hypot(w, T),
        D = this.radius + g.radius;
      P > 0.001 &&
        P < D &&
        ((this.position.x += (w / P) * (D - P)),
        (this.position.z += (T / P) * (D - P)));
    }
    (!p &&
      this.onGround &&
      (this.landingDip = z(Math.abs(u) * 0.02, 0.04, 0.22)),
      (this.landingDip = M(this.landingDip, 0, 10, t)),
      this.onGround && Math.hypot(this.velocity.x, this.velocity.z) > 0.5
        ? (this.bobTime += (t * 12 * this.velocity.length()) / v.walkSpeed)
        : (this.bobTime = 0),
      this.updateFlashlight(t),
      this.updateCamera(t));
  }
  updateStamina(t, e) {
    if (e)
      ((this.stamina = Math.max(0, this.stamina - v.staminaDrain * t)),
        (this.staminaDelay = v.staminaDelay),
        this.stamina === 0 && ((this.exhausted = !0), (this.sprinting = !1)));
    else {
      const s = Math.max(0, t - this.staminaDelay);
      ((this.staminaDelay = Math.max(0, this.staminaDelay - t)),
        (this.stamina = Math.min(
          v.staminaMax,
          this.stamina + v.staminaRegen * s,
        )),
        this.stamina >= v.staminaRecover && (this.exhausted = !1));
    }
  }
  updateFlashlight(t) {
    (this.game.input.just("KeyF") &&
      (this.flashlightOn || this.flashlightCharge > 5) &&
      (this.flashlightOn = !this.flashlightOn),
      (this.flashlightCharge = z(
        this.flashlightCharge + (this.flashlightOn ? -5 : 4) * t,
        0,
        100,
      )),
      this.flashlightCharge <= 0 && (this.flashlightOn = !1),
      (this.flashlight.intensity = this.flashlightOn ? 70 : 0));
  }
  updateCamera(t) {
    ((this.shake = M(this.shake, 0, 18, t)),
      (this.damagePitch = M(this.damagePitch, 0, 25, t)),
      this.camera.position.copy(this.position),
      (this.camera.position.y +=
        this.eyeHeight +
        Math.sin(this.bobTime) * 0.05 -
        this.landingDip +
        b(-this.shake, this.shake)),
      (this.camera.position.x +=
        Math.cos(this.bobTime * 0.5) * (this.bobTime ? 0.025 : 0) +
        b(-this.shake, this.shake)),
      this.camera.rotation.set(
        this.pitch + this.damagePitch,
        this.yaw,
        this.dead ? Math.min(1, this.deathTime / 0.8) * 0.663 : 0,
        "YXZ",
      ),
      this.camera.updateMatrixWorld(!0));
  }
  takeDamage(t, e = new d()) {
    if (this.dead || this.game.state.status !== "playing") return;
    const s = Re(t, this.armor);
    ((this.armor = s.armor),
      (this.health = Math.max(0, this.health - s.healthDamage)),
      (this.damagePitch = -0.022),
      (this.shake = Math.max(this.shake, 0.02)),
      this.game.hud.damage(e),
      this.health <= 0 &&
        ((this.dead = !0),
        (this.deathTime = 0),
        (this.flashlight.intensity = 0),
        this.game.input.clear(),
        this.game.schedule(0.8, () => this.game.gameOver())));
  }
  heal(t) {
    return this.health >= 100 || this.dead
      ? !1
      : ((this.health = Math.min(100, this.health + t)), !0);
  }
  addArmor(t) {
    return this.armor >= 100 || this.dead
      ? !1
      : ((this.armor = Math.min(100, this.armor + t)), !0);
  }
}
const _e = ["crowbar", "pistol", "smg", "shotgun"],
  j = [
    [20, 170, -20],
    [180, 0, 180],
    [0, 180, 0],
    [0, -90, 0],
  ],
  Mt = [0.7, 0.32, 0.8, 0.78];
class Be {
  constructor(t) {
    ((this.game = t),
      (this.root = new S()),
      (this.basePosition = new d(0.24, -0.22, -0.42)),
      this.root.position.copy(this.basePosition),
      (this.scene = new It()),
      this.scene.add(this.root, new Dt(16379352, 4538682, 2.3)));
    const e = new Lt(16777215, 2.5);
    (e.position.set(1, 3, 2),
      this.scene.add(e),
      (this.camera = new Ft(75, t.player.camera.aspect, 0.01, 10)),
      (this.rotations = j.map((i, a) => {
        const o = q(`weapon-${a}`, i);
        return Array.isArray(o) && o.length === 3 && o.every(Number.isFinite)
          ? o
          : [...i];
      })),
      (this.models = _e.map((i, a) => {
        const o =
          t.assets.instantiate(i, {
            dimension: a === 0 ? "y" : "z",
            size: Mt[a],
            rotation: j[a],
          }) ?? this.fallback(a);
        return (
          o.rotation.set(...this.rotations[a].map((n, r) => F(n - j[a][r]))),
          o.position.set(
            a === 0 ? 0.09 : 0.04,
            a === 0 ? -0.2 : -0.08,
            a === 1 ? -0.1 : -0.25,
          ),
          a === 0
            ? ((this.crowbarPivot = new S()),
              this.crowbarPivot.position.copy(o.position),
              (this.crowbarPivot.position.y += 0.3),
              o.position.set(0, -0.3, 0),
              this.crowbarPivot.add(o),
              this.root.add(this.crowbarPivot))
            : this.root.add(o),
          o
        );
      })),
      (this.flash = new Ot(16763491, 4, 4)));
    const s = new k(new G(0.04, 8, 6), new A({ color: 16766322 }));
    ((this.flashMesh = s),
      this.flash.add(s),
      this.root.add(this.flash),
      (this.calibrating = !1),
      this.reset());
  }
  fallback(t) {
    const e = new S(),
      s = new R({
        color: t === 0 ? 11020574 : 3159356,
        metalness: 0.7,
        roughness: 0.4,
      }),
      i = new k(
        new B(
          t === 0 ? 0.035 : 0.06,
          t === 0 ? 0.6 : 0.07,
          t === 0 ? 0.035 : Mt[t],
        ),
        s,
      );
    if ((t === 0 && (i.position.y = 0.3), e.add(i), t !== 0)) {
      const a = new k(new B(0.045, 0.13, 0.06), s);
      (a.position.set(0, -0.07, 0.07), e.add(a));
    }
    return e;
  }
  reset() {
    ((this.weapons = Se.map((t) => ({ ...t, ammo: t.capacity }))),
      (this.reserves = { ...ze }),
      (this.index = 1),
      (this.cooldown = 0),
      (this.reloadRemaining = 0),
      (this.switchRemaining = 0),
      (this.switchTarget = null),
      (this.kick = 0),
      (this.swayX = 0),
      (this.swayY = 0),
      (this.meleeTime = 0),
      (this.flashTime = 0),
      (this.flash.visible = !0),
      (this.flash.intensity = 0),
      (this.flashMesh.visible = !1),
      this.root.rotation.set(0, 0, 0),
      this.root.position.copy(this.basePosition),
      this.crowbarPivot.rotation.set(0, 0, 0),
      this.setVisibility());
  }
  get current() {
    return this.weapons[this.index];
  }
  addSway(t, e) {
    ((this.swayX = z(this.swayX - t * 4e-4, -0.04, 0.04)),
      (this.swayY = z(this.swayY - e * 4e-4, -0.04, 0.04)));
  }
  update(t) {
    if (
      ((this.cooldown = Math.max(0, this.cooldown - t)),
      (this.flashTime = Math.max(0, this.flashTime - t)),
      (this.flash.intensity = this.flashTime > 0 ? 4 : 0),
      (this.flashMesh.visible = this.flashTime > 0),
      this.reloadRemaining > 0 &&
        ((this.reloadRemaining -= t), this.reloadRemaining <= 0))
    ) {
      const s = this.current,
        i = Math.min(s.capacity - s.ammo, this.reserves[s.ammoType]);
      ((s.ammo += i),
        (this.reserves[s.ammoType] -= i),
        (this.reloadRemaining = 0));
    }
    this.switchRemaining > 0 &&
      ((this.switchRemaining = Math.max(0, this.switchRemaining - t)),
      this.switchTarget !== null &&
        this.switchRemaining <= 0.14 &&
        ((this.index = this.switchTarget),
        (this.switchTarget = null),
        this.setVisibility()));
    const e = this.game.input;
    if (!this.game.player.dead) {
      for (let s = 0; s < 4; s++) e.just(`Digit${s + 1}`) && this.select(s);
      (e.wheel && this.cycle(Math.sign(e.wheel)),
        e.just("KeyR") && this.reload(),
        (e.buttonPressed.has(0) ||
          (this.current.automatic && e.buttons.has(0))) &&
          this.fire(!1),
        e.buttonPressed.has(2) && this.current.altCost && this.fire(!0),
        this.current.ammo === 0 &&
          !this.current.melee &&
          this.cooldown <= 0 &&
          this.reload());
    }
    this.animate(t);
  }
  animate(t) {
    ((this.kick = M(this.kick, 0, 18, t)),
      (this.swayX = M(this.swayX, 0, 10, t)),
      (this.swayY = M(this.swayY, 0, 10, t)));
    const e =
        this.reloadRemaining > 0
          ? Math.min(1, this.reloadRemaining / 0.2) * 0.28
          : 0,
      s =
        this.switchRemaining > 0
          ? Math.sin((this.switchRemaining / 0.26) * Math.PI) * 0.35
          : 0,
      i = this.game.player.bobTime;
    (this.root.position.set(
      this.basePosition.x + this.swayX + (i ? Math.cos(i * 0.5) * 0.009 : 0),
      this.basePosition.y + this.swayY + this.kick * 0.4 - Math.max(e, s),
      this.basePosition.z + this.kick,
    ),
      (this.meleeTime = Math.max(0, this.meleeTime - t)));
    const a = this.meleeTime
      ? Math.sin((1 - this.meleeTime / 0.37) * Math.PI)
      : 0;
    (this.root.rotation.set(0, 0, 0),
      this.crowbarPivot.rotation.set(-1.05 * a, 0.06 * a, -0.1 * a));
  }
  select(t) {
    return !this.weapons[t]?.unlocked ||
      t === this.index ||
      this.switchRemaining > 0
      ? !1
      : ((this.reloadRemaining = 0),
        (this.switchTarget = t),
        (this.switchRemaining = 0.26),
        (this.meleeTime = 0),
        !0);
  }
  cycle(t) {
    for (let e = 1; e <= 4; e++) {
      const s = (this.index + t * e + 8) % 4;
      if (this.weapons[s].unlocked) {
        this.select(s);
        break;
      }
    }
  }
  setVisibility() {
    this.models.forEach((t, e) => {
      t.visible = e === this.index;
    });
  }
  reload() {
    const t = this.current;
    return t.melee ||
      this.reloadRemaining > 0 ||
      this.switchRemaining > 0 ||
      t.ammo >= t.capacity ||
      this.reserves[t.ammoType] <= 0
      ? !1
      : ((this.reloadRemaining = t.reloadTime), !0);
  }
  fire(t) {
    if (
      this.cooldown > 0 ||
      this.reloadRemaining > 0 ||
      this.switchRemaining > 0 ||
      this.game.player.dead
    )
      return !1;
    const e = this.current;
    if (e.melee)
      return (
        (this.cooldown = e.rate),
        (this.meleeTime = 0.37),
        this.hitscan(e.damage, 0, e.range, !0),
        !0
      );
    const s = t ? e.altCost : 1;
    if (e.ammo < s) return (e.ammo === 0 && this.reload(), !1);
    ((e.ammo -= s),
      (this.cooldown = t ? e.altRate : e.rate),
      (this.kick = e.kick * (t ? 1.5 : 1)),
      (this.flashTime = 0.045),
      (this.flash.intensity = 4),
      (this.flashMesh.visible = !0),
      this.flash.position.set(
        0.04,
        0,
        this.index === 1 ? -0.32 : this.index === 2 ? -0.65 : -0.7,
      ),
      (this.game.player.pitch = z(
        this.game.player.pitch + e.pitch * (t ? 1.5 : 1),
        -1.553,
        1.553,
      )),
      (this.game.hud.crosshairKick = t ? 20 : 14));
    for (let i = 0; i < (t ? e.altPellets : e.pellets); i++)
      this.hitscan(e.damage, t ? e.altSpread : e.spread);
    return !0;
  }
  hitscan(t, e, s = 120, i = !1) {
    const a = this.game.player.camera,
      o = a.position.clone(),
      n = new d(0, 0, -1).applyQuaternion(a.quaternion),
      r = new d(1, 0, 0).applyQuaternion(a.quaternion),
      h = new d(0, 1, 0).applyQuaternion(a.quaternion);
    n.addScaledVector(r, b(-F(e), F(e)))
      .addScaledVector(h, b(-F(e), F(e)))
      .normalize();
    let m = this.game.physics.raycast(o, n, s);
    for (const l of this.game.enemies) {
      if (l.dead) continue;
      const p = l.position.clone();
      p.y += l.data.hitY;
      let u = Me(o, n, p, l.data.hitRadius, l.data.hitHeight);
      if (u === null && i) {
        const f = p.clone().sub(o);
        f.length() <= s && f.normalize().dot(n) > 0.6 && (u = o.distanceTo(p));
      }
      if (u === null || u > s || (m && u >= m.distance)) continue;
      const y = o.clone().addScaledVector(n, u);
      m = {
        point: y,
        distance: u,
        normal: y.clone().sub(p).normalize(),
        target: l,
      };
    }
    m &&
      (m.target?.takeDamage
        ? (m.target.takeDamage(
            this.damageAtDistance(t, m.distance),
            m.point,
            n,
            this.current.id,
          ),
          (this.game.hud.hitTime = 0.12),
          m.target.data && this.game.effects.blood(m.point, n))
        : (this.game.effects.decal(m.point, m.normal),
          this.game.effects.burst(m.point, 16765066)));
  }
  damageAtDistance(damage, distance) {
    if (this.current.id !== 3) return damage;
    // Full pellet energy within 4 m, smoothly falling to 15% at 22 m.
    // Use the actual ray hit distance, for both single shots and double shots.
    const progress = z((distance - 4) / 18, 0, 1);
    const smooth = progress * progress * (3 - 2 * progress);
    return damage * (1 - 0.85 * smooth);
  }
  addAmmo(t, e) {
    return !(t in this.reserves) || this.reserves[t] >= vt[t]
      ? !1
      : ((this.reserves[t] = Math.min(vt[t], this.reserves[t] + e)), !0);
  }
  unlock(t) {
    const e = this.weapons[t];
    return !e || e.unlocked
      ? !1
      : ((e.unlocked = !0),
        this.addAmmo(e.ammoType, e.capacity * 2),
        this.select(t),
        !0);
  }
  toggleCalibration() {
    this.calibrating = !this.calibrating;
  }
  calibrate(t) {
    if (!this.calibrating || this.game.state.status !== "playing") return;
    const e = {
      KeyI: [0, 90],
      KeyK: [0, -90],
      KeyJ: [1, 90],
      KeyL: [1, -90],
      KeyU: [2, 90],
      KeyO: [2, -90],
    };
    if (
      (t === "KeyP" &&
        console.info("Viewmodel", this.index, this.rotations[this.index]),
      !e[t])
    )
      return;
    const [s, i] = e[t];
    ((this.rotations[this.index][s] += i),
      this.models[this.index].rotation.set(
        ...this.rotations[this.index].map((o, n) => F(o - j[this.index][n])),
      ),
      X(`weapon-${this.index}`, this.rotations[this.index]));
  }
}
const Ge = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];
class $e {
  constructor() {
    this.items = [];
  }
  push(t, e) {
    const s = { id: t, score: e };
    let i = this.items.length;
    for (this.items.push(s); i > 0; ) {
      const a = (i - 1) >> 1;
      if (this.items[a].score <= e) break;
      ((this.items[i] = this.items[a]), (i = a));
    }
    this.items[i] = s;
  }
  pop() {
    const t = this.items[0],
      e = this.items.pop();
    if (this.items.length) {
      let s = 0;
      for (; s * 2 + 1 < this.items.length; ) {
        let i = s * 2 + 1;
        if (
          (i + 1 < this.items.length &&
            this.items[i + 1].score < this.items[i].score &&
            i++,
          e.score <= this.items[i].score)
        )
          break;
        ((this.items[s] = this.items[i]), (s = i));
      }
      this.items[s] = e;
    }
    return t.id;
  }
}
class Ut {
  constructor(t) {
    ((this.physics = t),
      (this.grids = new Map()),
      (this.version = -1),
      (this.size = 39),
      (this.origin = -19),
      (this.budget = 4),
      (this.scratch = new d()));
  }
  beginFrame() {
    this.budget = 4;
  }
  invalidate() {
    (this.grids.clear(), (this.version = this.physics.version));
  }
  canTraverse(t, e, s, i = 0.8) {
    const a = s + 0.1,
      o = e.x - t.x,
      n = e.z - t.z;
    for (const { box: r, active: h } of this.physics.colliders) {
      if (!h || r.max.y <= t.y + 0.06 || r.min.y >= t.y + i) continue;
      let m = 0,
        l = 1,
        p = !0;
      for (const [u, y] of [
        ["x", o],
        ["z", n],
      ]) {
        const f = r.min[u] - a,
          g = r.max[u] + a,
          w = t[u];
        if (Math.abs(y) < 1e-5) {
          if (w < f || w > g) {
            p = !1;
            break;
          }
        } else {
          const T = (f - w) / y,
            P = (g - w) / y;
          if (
            ((m = Math.max(m, Math.min(T, P))),
            (l = Math.min(l, Math.max(T, P))),
            m > l)
          ) {
            p = !1;
            break;
          }
        }
      }
      if (p && l >= 0 && m <= 1) return !1;
    }
    return !0;
  }
  grid(t, e) {
    this.version !== this.physics.version && this.invalidate();
    const s = `${t.toFixed(2)}:${e.toFixed(2)}`;
    if (this.grids.has(s)) return this.grids.get(s);
    const i = new Uint8Array(this.size * this.size);
    for (let a = 0; a < this.size; a++)
      for (let o = 0; o < this.size; o++)
        (this.scratch.set(this.origin + o, 0, this.origin + a),
          (i[a * this.size + o] =
            this.physics.isFree(this.scratch, t + 0.16, e) &&
            this.canTraverse(this.scratch, this.scratch, t + 0.06, e)
              ? 1
              : 0));
    return (this.grids.set(s, i), i);
  }
  nearest(t, e) {
    let s = -1,
      i = 1 / 0;
    for (let a = 0; a < e.length; a++) {
      if (!e[a]) continue;
      const o = this.origin + (a % this.size) - t.x,
        n = this.origin + Math.floor(a / this.size) - t.z,
        r = o * o + n * n;
      r < i && ((s = a), (i = r));
    }
    return s;
  }
  point(t) {
    return new d(
      this.origin + (t % this.size),
      0,
      this.origin + Math.floor(t / this.size),
    );
  }
  findPath(t, e, s, i = 0.8) {
    const a = e.clone();
    if (
      ((a.y = 0),
      this.canTraverse(t, a, s, i) && this.physics.isFree(a, s + 0.1, i))
    )
      return [a];
    const o = this.grid(s, i),
      n = this.nearest(t, o),
      r = this.nearest(a, o);
    if (n < 0 || r < 0) return [];
    const h = new Float32Array(o.length);
    h.fill(1 / 0);
    const m = new Int16Array(o.length);
    m.fill(-1);
    const l = new Uint8Array(o.length),
      p = new $e(),
      u = r % this.size,
      y = Math.floor(r / this.size),
      f = (x) => Math.hypot((x % this.size) - u, Math.floor(x / this.size) - y);
    ((h[n] = 0), p.push(n, f(n)));
    let g = -1;
    for (; p.items.length; ) {
      const x = p.pop();
      if (l[x]) continue;
      if (x === r) {
        g = x;
        break;
      }
      l[x] = 1;
      const lt = x % this.size,
        mt = Math.floor(x / this.size);
      for (const [J, Q] of Ge) {
        const $ = lt + J,
          W = mt + Q;
        if ($ < 0 || W < 0 || $ >= this.size || W >= this.size) continue;
        const L = W * this.size + $;
        if (
          !o[L] ||
          l[L] ||
          (J && Q && (!o[mt * this.size + $] || !o[W * this.size + lt]))
        )
          continue;
        const tt = h[x] + (J && Q ? Math.SQRT2 : 1);
        tt >= h[L] || ((h[L] = tt), (m[L] = x), p.push(L, tt + f(L)));
      }
    }
    if (g < 0) return [];
    const w = [];
    for (let x = g; x >= 0 && (w.push(this.point(x)), x !== n); x = m[x]);
    (w.reverse(),
      this.physics.isFree(a, s + 0.1, i) &&
        this.canTraverse(w.at(-1), a, s, i) &&
        w.push(a));
    const T = [];
    let P = t,
      D = 0;
    for (; D < w.length; ) {
      let x = D;
      for (; x + 1 < w.length && this.canTraverse(P, w[x + 1], s, i); ) x++;
      (T.push(w[x]), (P = w[x]), (D = x + 1));
    }
    return T;
  }
  steer(t, e, s) {
    if (
      ((t.pathAge -= s),
      this.scratch.copy(e),
      (this.scratch.y = 0),
      this.canTraverse(t.position, this.scratch, t.radius, t.height) &&
        this.physics.isFree(this.scratch, t.radius + 0.1, t.height))
    )
      return (
        (t.path.length = 0),
        this.scratch.clone().sub(t.position).setY(0).normalize()
      );
    const i = t.pathTarget.distanceToSquared(this.scratch) > 4;
    for (
      (t.pathAge <= 0 || i || !t.path.length) &&
      this.budget > 0 &&
      (this.budget--,
      (t.path = this.findPath(t.position, e, t.radius, t.height)),
      (t.pathAge = 0.65 + (t.id % 5) * 0.09),
      t.pathTarget.copy(e).setY(0));
      t.path.length &&
      t.position.clone().setY(0).distanceToSquared(t.path[0]) < 0.16;

    )
      t.path.shift();
    return t.path.length
      ? t.path[0].clone().sub(t.position).setY(0).normalize()
      : new d();
  }
  unstick(t) {
    if (
      ((t.pathAge = 0),
      (t.path.length = 0),
      this.physics.isFree(t.position, t.radius + 0.02, t.height))
    )
      return !1;
    const e = this.grid(t.radius, t.height),
      s = this.nearest(t.position, e);
    if (s < 0) return !1;
    const i = this.point(s);
    return i.distanceTo(t.position) > 2.5
      ? !1
      : (t.position.copy(i), t.velocity.set(0, 0, 0), !0);
  }
}
const et = new WeakMap(),
  We = `
  attribute vec3 mouseRest;
  uniform mat3 mouseToLocal;
  uniform float mousePhase;
  uniform float mouseMove;
  uniform float mouseBite;
  uniform float mouseAlive;
  varying vec3 vMouseRest;
`,
  He = `
  vMouseRest = mouseRest;
  float mouseFoot = 1.0 - smoothstep(0.10, 0.25, mouseRest.y);
  float mouseFront = 1.0 - smoothstep(-0.55, -0.35, mouseRest.z);
  float mouseStride = mousePhase + (mouseRest.x < 0.0 ? 3.14159 : 0.0) + mouseFront * 3.14159;
  vec3 mouseDelta = vec3(0.0);
  mouseDelta.y = max(0.0, sin(mouseStride)) * 0.08 * mouseFoot * mouseMove;
  mouseDelta.z = cos(mouseStride) * 0.095 * mouseFoot * mouseMove;
  float mouseTail = smoothstep(0.12, 0.85, mouseRest.z);
  float mouseBody = (1.0 - mouseFoot) * (1.0 - mouseTail);
  // A very subtle walking squash/stretch; paws and tail keep their own motion.
  float mousePulse = sin(mousePhase * 2.0) * 0.018 * min(mouseMove, 1.0);
  mouseDelta.x += mouseRest.x * mousePulse * mouseBody;
  mouseDelta.z += (mouseRest.z + 0.35) * mousePulse * 0.5 * mouseBody;
  mouseDelta.y -= (mouseRest.y - 0.12) * mousePulse * 0.5 * mouseBody;
  float mouseBounce = max(0.0, sin(mousePhase));
  mouseDelta.y += mouseBounce * mouseBounce * 0.018 * mouseBody * mouseMove;
  mouseDelta.x += sin(mousePhase * 0.5) * 0.009 * mouseBody * mouseMove;
  mouseDelta.x += sin(mousePhase * 0.55 - mouseRest.z * 5.0) * 0.10 * mouseTail * (0.25 * mouseAlive + mouseMove);
  mouseDelta.y += sin(mousePhase * 0.7 - mouseRest.z * 4.0) * 0.025 * mouseTail * mouseMove;
  float mouseHead = 1.0 - smoothstep(-0.8, -0.45, mouseRest.z);
  mouseDelta.y += sin(mousePhase * 0.5) * (0.010 * mouseAlive + 0.010 * mouseMove) * mouseHead;
  mouseDelta.x += sin(mousePhase * 0.4) * 0.015 * mouseHead * (0.25 * mouseAlive + mouseMove);
  mouseDelta.y += mouseBite * 0.025 * mouseHead;
  mouseDelta.z -= mouseBite * 0.095 * mouseHead;
  transformed += mouseToLocal * mouseDelta;
`;
class jt {
  constructor(t) {
    ((this.phase = 0),
      (this.depthMaterials = []),
      (this.uniforms = {
        mousePhase: { value: 0 },
        mouseMove: { value: 0 },
        mouseBite: { value: 0 },
        mouseAlive: { value: 1 },
        mouseEyes: { value: 1 },
      }),
      t.updateWorldMatrix(!0, !0));
    const e = t.matrixWorld.clone().invert();
    t.traverse((s) => {
      if (!s.isMesh || s.isSkinnedMesh) return;
      const i = new _t().multiplyMatrices(e, s.matrixWorld),
        a = s.geometry,
        o = i.elements
          .map((l) => (Math.abs(l) < 1e-6 ? "0" : l.toFixed(6)))
          .join(",");
      et.has(a) || et.set(a, new Map());
      const n = et.get(a);
      if (!n.has(o)) {
        const l = a.clone(),
          p = l.attributes.position,
          u = new Float32Array(p.count * 3),
          y = new d();
        for (let g = 0; g < p.count; g++)
          y.fromBufferAttribute(p, g)
            .applyMatrix4(i)
            .toArray(u, g * 3);
        (l.setAttribute("mouseRest", new Bt(u, 3)),
          l.computeBoundingBox(),
          l.computeBoundingSphere());
        const f =
          0.22 /
          Math.max(new d().setFromMatrixScale(i).length() / Math.sqrt(3), 1e-4);
        (l.boundingBox.expandByScalar(f),
          (l.boundingSphere.radius += f),
          n.set(o, l));
      }
      s.geometry = n.get(o);
      const r = {
          ...this.uniforms,
          mouseToLocal: { value: new Rt().setFromMatrix4(i).invert() },
        },
        h = (l, p) => {
          const u = l.onBeforeCompile,
            y = l.customProgramCacheKey();
          ((l.onBeforeCompile = (f, g) => {
            (u.call(l, f, g),
              Object.assign(f.uniforms, r),
              (f.vertexShader =
                We +
                f.vertexShader.replace(
                  "#include <begin_vertex>",
                  `#include <begin_vertex>
${He}`,
                )),
              p &&
                (f.fragmentShader =
                  `varying vec3 vMouseRest;
uniform float mouseEyes;
` +
                  f.fragmentShader.replace(
                    "#include <emissivemap_fragment>",
                    `
              #include <emissivemap_fragment>
              vec3 mouseEyeOffset = (vec3(abs(vMouseRest.x), vMouseRest.yz) - vec3(0.078, 0.466, -0.83)) / vec3(0.020, 0.013, 0.023);
              float mouseEye = 1.0 - smoothstep(0.3, 1.0, dot(mouseEyeOffset, mouseEyeOffset));
              totalEmissiveRadiance += vec3(3.5, 0.055, 0.012) * mouseEye * mouseEyes;
            `,
                  )));
          }),
            (l.customProgramCacheKey = () => `${y}:mouse-motion-v3:${p}`),
            (l.needsUpdate = !0));
        };
      for (const l of Array.isArray(s.material) ? s.material : [s.material])
        h(l, !0);
      const m = new ie({ depthPacking: ae });
      (h(m, !1), (s.customDepthMaterial = m), this.depthMaterials.push(m));
    });
  }
  update(t, e, s = 0, i = !0) {
    ((this.phase += t * (i ? 6 + Math.min(e, 1.5) * 13 : 0)),
      (this.uniforms.mousePhase.value = this.phase),
      (this.uniforms.mouseMove.value = M(
        this.uniforms.mouseMove.value,
        i ? Math.min(1.5, e) : 0,
        12,
        t,
      )),
      (this.uniforms.mouseBite.value = s),
      (this.uniforms.mouseAlive.value = M(
        this.uniforms.mouseAlive.value,
        i ? 1 : 0,
        14,
        t,
      )),
      (this.uniforms.mouseEyes.value = M(
        this.uniforms.mouseEyes.value,
        i ? 1 : 0,
        14,
        t,
      )));
  }
  dispose() {
    this.depthMaterials.forEach((t) => t.dispose());
  }
}
const Ue = { mouse: [0, 180, 0], rat: [0, 0, 0], capybara: [0, -90, 0] };
let je = 0;
class Ve {
  constructor(t, e, s) {
    ((this.game = t),
      (this.type = e),
      (this.data = Te[e]),
      (this.id = je++),
      (this.health = this.data.health),
      (this.position = s.clone()),
      (this.position.y = 0),
      (this.velocity = new d()),
      (this.radius = this.data.radius),
      (this.height = this.data.height),
      (this.onGround = !0),
      (this.root = new S()),
      (this.visual = new S()),
      this.root.add(this.visual),
      (this.model = t.assets.instantiate(e, {
        size: e === "mouse" ? 0.58 : 1.95,
        rotation: Ue[e],
        uniqueMaterials: !0,
      })),
      (this.imported = !!this.model),
      this.model || (this.model = this.fallback()),
      ct(this.model),
      this.visual.add(this.model),
      t.scene.add(this.root),
      this.root.position.copy(this.position),
      (this.state = "emerging"),
      (this.stateAge = 0),
      (this.time = b(0, 4)),
      (this.attackCooldown = 0),
      (this.leapCooldown = 0),
      (this.hitFlash = 0),
      (this.basicHopCooldown = 0.1 + (this.id % 5) * 0.04),
      (this.chargeCooldown = 2 + (this.id % 3) * 0.4),
      (this.chargeDirection = new d()),
      (this.chargeHit = !1),
      (this.path = []),
      (this.pathAge = 0),
      (this.pathTarget = new d(1e3, 0, 1e3)),
      (t.navigation ??= new Ut(t.physics)),
      (this.unseenTime = 0),
      (this.watchedTime = 0),
      (this.animationMove = 0),
      (this.gaitTime = 0),
      this.data.leap &&
        ((this.viewFrustum = new oe()),
        (this.viewProjection = new _t()),
        (this.viewSphere = new Et(
          new d(),
          Math.max(this.data.hitRadius, this.data.hitHeight / 2),
        )),
        (this.viewDirection = new d()),
        (this.viewForward = new d())),
      (this.dead = !1),
      (this.removed = !1),
      (this.deadAge = 0),
      (this.deathSide = Math.random() < 0.5 ? 1 : -1),
      (this.lastPosition = this.position.clone()),
      (this.stuckTime = 0),
      this.setupAnimation(),
      this.setupProceduralRig(),
      this.type === "mouse" &&
        this.imported &&
        (this.mouseVisual = new jt(this.model)));
  }
  setupAnimation() {
    const t = this.model.userData.animations ?? [];
    if (this.type === "capybara") {
      this.actions = {};
      this.action = null;
      if (t.length) {
        this.mixer = new ne(this.model.userData.model);
        // The imported clip is a standing/anticipation gesture, not a gait.
        const idle =
          t.find((clip) => /idle|stand/i.test(clip.name)) ??
          t.find((clip) => !/pose/i.test(clip.name)) ??
          t[0];
        this.actions.idle = this.mixer.clipAction(idle);
      }
      return;
    }
    if (((this.actions = {}), t.length)) {
      this.mixer = new ne(this.model.userData.model);
      for (const [e, s] of Object.entries({
        idle: /idle|stand|pose/i,
        move: /walk|run|move|nastvany/i,
        attack: /attack|bite/i,
        hit: /hit|hurt|damage/i,
        dead: /death|die|dead/i,
      })) {
        const i = t.find((a) => s.test(a.name));
        i && (this.actions[e] = this.mixer.clipAction(i));
      }
      (!this.actions.move &&
        t.length === 1 &&
        (this.actions.move = this.mixer.clipAction(t[0])),
        this.playAnimation("idle"));
    }
  }
  playAnimation(t) {
    if (this.type === "capybara") {
      if (t !== "idle" || !this.isCapybaraIdle()) {
        if (this.action) {
          if (this.capyPose) this.stopCapybaraIdle();
          else this.mixer?.stopAllAction();
        }
        this.action = null;
        return;
      }
      const idle = this.actions.idle;
      if (idle && idle !== this.action) {
        idle.reset().setEffectiveTimeScale(1).play();
        this.action = idle;
      }
      return;
    }
    const e = this.actions[t] ?? (t === "dead" ? null : this.actions.move);
    if (!e) {
      t === "dead" && (this.action?.stop(), (this.action = null));
      return;
    }
    e !== this.action &&
      (e.reset(),
      t === "dead" && (e.setLoop(re, 1), (e.clampWhenFinished = !0)),
      this.action && e.crossFadeFrom(this.action, 0.15, !1),
      e.play(),
      (this.action = e));
  }
  setState(t) {
    ((this.state = t), (this.stateAge = 0));
    const e = {
      chase: "move",
      charge: "move",
      attack: "attack",
      leap: "attack",
      stagger: "hit",
      dead: "dead",
    };
    this.playAnimation(e[t] ?? "idle");
  }
  setupProceduralRig() {
    ((this.rig = []),
      !(this.type !== "rat" || this.actions.move) &&
        this.model.traverse((t) => {
          if (!t.isBone) return;
          const e = [
            "thigh",
            "calf",
            "upperarm",
            "forearm",
            "spine",
            "head",
            "tail",
          ].find((s) => new RegExp(`${s}\\d*$`, "i").test(t.name));
          e &&
            this.rig.push({
              bone: t,
              role: e,
              left: /_l_/i.test(t.name),
              rotation: t.rotation.clone(),
            });
        }));
    this.type === "capybara" && this.setupCapybaraRig();
  }
  isCapybaraIdle() {
    return (
      !this.dead &&
      this.onGround &&
      (this.state === "idle" || this.state === "chase") &&
      Math.hypot(this.velocity.x, this.velocity.z) < 0.08
    );
  }
  setupCapybaraRig() {
    const joints = {
      Bone: ["pelvis"],
      Bone001: ["chest"],
      Bone002: ["head"],
      Bone003: ["snout"],
      Bone004: ["hip", false, -1],
      Bone005: ["knee", false, -1],
      Bone006: ["foot", false, -1],
      Bone007: ["hip", false, 1],
      Bone008: ["knee", false, 1],
      Bone009: ["foot", false, 1],
      Bone010: ["hip", true, -1],
      Bone011: ["knee", true, -1],
      Bone012: ["foot", true, -1],
      Bone013: ["hip", true, 1],
      Bone014: ["knee", true, 1],
      Bone015: ["foot", true, 1],
      Bone016: ["ear", true, -1],
      Bone017: ["earTip", true, -1],
      Bone018: ["ear", true, 1],
      Bone019: ["earTip", true, 1],
    };
    this.capyPose = [];
    this.capyRig = [];
    this.capySoles = [];
    this.capyGroundOffset = 0;
    this.capyGroundPoint = new d();
    this.capyRun = this.capyPrep = 0;
    this.capyPoseBlend = 1;
    this.capyRest = {
      position: this.model.position.clone(),
      rotation: this.model.rotation.clone(),
      scale: this.model.scale.clone(),
    };
    this.capyRotationDelta = this.root.quaternion.clone();
    this.model.updateWorldMatrix(true, true);
    const rootRotation = this.root.getWorldQuaternion(
      this.root.quaternion.clone(),
    );
    const lateral = new d(1, 0, 0).applyQuaternion(rootRotation);
    const up = new d(0, 1, 0).applyQuaternion(rootRotation);
    const forward = new d(0, 0, 1).applyQuaternion(rootRotation);
    (this.model.userData.model ?? this.model).traverse((node) => {
      if (node !== this.model) {
        this.capyPose.push({
          node,
          position: node.position.clone(),
          quaternion: node.quaternion.clone(),
          scale: node.scale.clone(),
          transitionPosition: node.position.clone(),
          transitionQuaternion: node.quaternion.clone(),
          transitionScale: node.scale.clone(),
          targetPosition: node.position.clone(),
          targetQuaternion: node.quaternion.clone(),
          targetScale: node.scale.clone(),
        });
      }
      const config = node.isBone && joints[node.name];
      if (!config) return;
      // Imported bone axes differ on every leg. Rotate around anatomical
      // lateral/up axes rather than assuming bone.rotation.x is a hinge.
      const inverse = node
        .getWorldQuaternion(this.root.quaternion.clone())
        .invert();
      this.capyRig.push({
        bone: node,
        role: config[0],
        front: config[1],
        side: config[2] ?? 0,
        pitchAxis: lateral.clone().applyQuaternion(inverse).normalize(),
        yawAxis: up.clone().applyQuaternion(inverse).normalize(),
        rollAxis: forward.clone().applyQuaternion(inverse).normalize(),
      });
    });
    this.setupCapybaraSoles();
    this.setupCapybaraPlants();
  }
  setupCapybaraPlants() {
    this.capyPlants = [];
    const rootRotation = this.root.getWorldQuaternion(
      this.root.quaternion.clone(),
    );
    const inverseRoot = rootRotation.clone().invert();
    for (const joint of this.capyRig) {
      if (joint.role !== "foot") continue;
      const foot = joint.bone,
        knee = foot.parent,
        hip = knee?.parent;
      const soles = this.capySoles.filter((sole) => sole.bone === foot);
      if (!hip?.isBone || !knee.isBone || !soles.length) continue;
      this.capyPlants.push({
        hip,
        knee,
        foot,
        soles,
        anchor: this.root.worldToLocal(foot.getWorldPosition(new d())),
        rotation: inverseRoot
          .clone()
          .multiply(foot.getWorldQuaternion(rootRotation.clone()).normalize()),
        pole: knee
          .getWorldPosition(new d())
          .sub(hip.getWorldPosition(new d()))
          .applyQuaternion(inverseRoot),
      });
    }
    this.capyPlantScratch = {
      hip: new d(),
      knee: new d(),
      foot: new d(),
      target: new d(),
      direction: new d(),
      pole: new d(),
      goal: new d(),
      from: new d(),
      to: new d(),
      rootRotation: rootRotation.clone(),
      parentRotation: rootRotation.clone(),
      rotationDelta: rootRotation.clone(),
      inverseRotation: rootRotation.clone(),
    };
  }
  rotateCapybaraBone(bone, from, to) {
    if (from.lengthSq() < 1e-10 || to.lengthSq() < 1e-10) return;
    const scratch = this.capyPlantScratch;
    bone.parent.getWorldQuaternion(scratch.parentRotation).normalize();
    scratch.rotationDelta.setFromUnitVectors(from.normalize(), to.normalize());
    scratch.inverseRotation.copy(scratch.parentRotation).invert();
    scratch.rotationDelta
      .premultiply(scratch.inverseRotation)
      .multiply(scratch.parentRotation);
    bone.quaternion.premultiply(scratch.rotationDelta).normalize();
    bone.updateWorldMatrix(false, true);
  }
  orientCapybaraFoot(plant) {
    const scratch = this.capyPlantScratch;
    plant.foot.parent.getWorldQuaternion(scratch.parentRotation).normalize();
    plant.foot.quaternion
      .copy(scratch.parentRotation.invert())
      .multiply(scratch.rootRotation)
      .multiply(plant.rotation)
      .normalize();
    plant.foot.updateWorldMatrix(false, true);
  }
  plantCapybaraFeet() {
    // Brace all four feet during anticipation. A global minimum only grounds
    // one hoof and leaves the hindquarters floating when the body leans.
    this.root.position.copy(this.position);
    this.model.updateWorldMatrix(true, true);
    const scratch = this.capyPlantScratch;
    this.root.getWorldQuaternion(scratch.rootRotation);
    for (const plant of this.capyPlants) {
      for (let pass = 0; pass < 4; pass++) {
        this.orientCapybaraFoot(plant);
        plant.hip.getWorldPosition(scratch.hip);
        plant.knee.getWorldPosition(scratch.knee);
        plant.foot.getWorldPosition(scratch.foot);
        let lowest = Infinity;
        for (const sole of plant.soles) {
          this.capyGroundPoint
            .copy(sole.point)
            .applyMatrix4(sole.bone.matrixWorld);
          lowest = Math.min(lowest, this.capyGroundPoint.y);
        }
        scratch.target.copy(plant.anchor).applyMatrix4(this.root.matrixWorld);
        scratch.target.y = this.position.y + 0.008 + scratch.foot.y - lowest;
        const upper = scratch.hip.distanceTo(scratch.knee);
        const lower = scratch.knee.distanceTo(scratch.foot);
        if (upper < 1e-5 || lower < 1e-5) break;
        scratch.direction.copy(scratch.target).sub(scratch.hip);
        const distance = z(
          scratch.direction.length(),
          Math.abs(upper - lower) + 0.0001,
          upper + lower - 0.0001,
        );
        scratch.direction.normalize();
        const along =
          (upper * upper - lower * lower + distance * distance) /
          (2 * distance);
        const height = Math.sqrt(Math.max(0, upper * upper - along * along));
        scratch.pole.copy(scratch.knee).sub(scratch.hip);
        scratch.pole.addScaledVector(
          scratch.direction,
          -scratch.pole.dot(scratch.direction),
        );
        if (scratch.pole.lengthSq() < 1e-8) {
          scratch.pole.copy(plant.pole).applyQuaternion(scratch.rootRotation);
          scratch.pole.addScaledVector(
            scratch.direction,
            -scratch.pole.dot(scratch.direction),
          );
        }
        if (scratch.pole.lengthSq() < 1e-8)
          scratch.pole.crossVectors(scratch.direction, scratch.to.set(0, 0, 1));
        if (scratch.pole.lengthSq() < 1e-8)
          scratch.pole.crossVectors(scratch.direction, scratch.to.set(1, 0, 0));
        scratch.pole.normalize();
        scratch.goal
          .copy(scratch.hip)
          .addScaledVector(scratch.direction, along)
          .addScaledVector(scratch.pole, height);
        this.rotateCapybaraBone(
          plant.hip,
          scratch.from.copy(scratch.knee).sub(scratch.hip),
          scratch.to.copy(scratch.goal).sub(scratch.hip),
        );
        plant.knee.getWorldPosition(scratch.knee);
        plant.foot.getWorldPosition(scratch.foot);
        this.rotateCapybaraBone(
          plant.knee,
          scratch.from.copy(scratch.foot).sub(scratch.knee),
          scratch.to.copy(scratch.target).sub(scratch.knee),
        );
        this.orientCapybaraFoot(plant);
      }
    }
  }
  setupCapybaraSoles() {
    // Cache a few real sole vertices, not the entire skin. Pure foot weights
    // let these points follow the bones exactly without CPU skinning per frame.
    const cache = (Ve.capySoleCache ??= new WeakMap());
    const feet = new Set(["Bone006", "Bone009", "Bone012", "Bone015"]);
    const vertex = new d();
    // SkinnedMesh.updateMatrixWorld also refreshes its attached bind inverse;
    // updateWorldMatrix alone leaves the imported normalization transform stale.
    this.model.updateMatrixWorld(true);
    this.model.traverse((mesh) => {
      if (!mesh.isSkinnedMesh) return;
      const geometry = mesh.geometry;
      let samples = cache.get(geometry);
      if (!samples) {
        samples = [];
        const indices = geometry.attributes.skinIndex;
        const weights = geometry.attributes.skinWeight;
        const positions = geometry.attributes.position;
        if (!indices || !weights || !positions) return;
        mesh.skeleton.update();
        const candidates = new Map();
        for (let i = 0; i < positions.count; i++) {
          const index = indices.getX(i);
          const bone = mesh.skeleton.bones[index];
          if (!feet.has(bone?.name) || weights.getX(i) < 0.9999) continue;
          mesh.getVertexPosition(i, vertex).applyMatrix4(mesh.matrixWorld);
          let foot = candidates.get(index);
          if (!foot)
            candidates.set(
              index,
              (foot = { bone, points: [], minY: Infinity }),
            );
          foot.minY = Math.min(foot.minY, vertex.y);
          foot.points.push(vertex.clone());
        }
        for (const [index, foot] of candidates) {
          const sole = foot.points.filter(
            (point) => point.y <= foot.minY + 0.07,
          );
          const chosen = new Set();
          // Cover both the sole center and its edges when the hoof tilts.
          for (let direction = -1; direction < 8; direction++) {
            const angle = (direction * Math.PI) / 4;
            let best,
              score = Infinity;
            for (const point of sole) {
              const value =
                point.y -
                (direction < 0
                  ? 0
                  : 0.65 *
                    (Math.cos(angle) * point.x + Math.sin(angle) * point.z));
              if (value < score) {
                score = value;
                best = point;
              }
            }
            if (best) chosen.add(best);
          }
          for (const point of chosen)
            samples.push({
              index,
              point: foot.bone.worldToLocal(point.clone()),
            });
        }
        cache.set(geometry, samples);
      }
      for (const sample of samples)
        this.capySoles.push({
          bone: mesh.skeleton.bones[sample.index],
          point: sample.point,
        });
    });
  }
  groundCapybaraPose(phase, move, run) {
    if (!this.onGround || this.state === "emerging" || !this.capySoles.length)
      return;
    this.root.position.copy(this.position);
    this.model.updateWorldMatrix(true, true);
    let lowest = Infinity;
    for (const sole of this.capySoles) {
      this.capyGroundPoint.copy(sole.point).applyMatrix4(sole.bone.matrixWorld);
      lowest = Math.min(lowest, this.capyGroundPoint.y);
    }
    const clearance = 0.008 + Math.abs(Math.sin(phase)) * 0.025 * run * move;
    this.capyGroundOffset = z(this.position.y + clearance - lowest, -0.2, 0.4);
    this.model.position.y += this.capyGroundOffset;
  }
  resetCapybaraPose() {
    for (const pose of this.capyPose) {
      pose.node.position.copy(pose.position);
      pose.node.quaternion.copy(pose.quaternion);
      pose.node.scale.copy(pose.scale);
    }
  }
  stopCapybaraIdle() {
    if (!this.action) return;
    for (const pose of this.capyPose) {
      pose.transitionPosition.copy(pose.node.position);
      pose.transitionQuaternion.copy(pose.node.quaternion);
      pose.transitionScale.copy(pose.node.scale);
    }
    this.mixer?.stopAllAction();
    this.action = null;
    this.capyPoseBlend = 0;
  }
  animateCapybara(dt) {
    // Remove last frame's support correction before computing the new pose.
    this.model.position.y -= this.capyGroundOffset;
    this.capyGroundOffset = 0;
    const speed = Math.hypot(this.velocity.x, this.velocity.z);
    const moving =
      speed > 0.08 &&
      (this.state === "chase" ||
        this.state === "charge" ||
        this.state === "recover");
    this.animationMove = M(
      this.animationMove,
      moving ? Math.min(1, speed / this.data.speed) : 0,
      12,
      dt,
    );
    this.capyRun = M(this.capyRun, this.state === "charge" ? 1 : 0, 10, dt);
    this.capyPrep = M(
      this.capyPrep,
      this.state === "charge-prep" ? Math.min(1, this.stateAge / 0.5) : 0,
      15,
      dt,
    );
    if (
      this.isCapybaraIdle() &&
      this.animationMove < 0.025 &&
      this.capyPrep < 0.025 &&
      this.actions.idle
    ) {
      this.model.position.copy(this.capyRest.position);
      this.model.rotation.copy(this.capyRest.rotation);
      this.model.scale.copy(this.capyRest.scale);
      if (!this.action) this.resetCapybaraPose();
      this.playAnimation("idle");
      return;
    }
    this.stopCapybaraIdle();
    this.resetCapybaraPose();
    if (moving) this.gaitTime += dt * (5 + speed * 2.4);
    const phase = this.gaitTime,
      move = this.animationMove,
      run = this.capyRun,
      prep = this.capyPrep;
    const bite =
      this.state === "attack"
        ? Math.sin(Math.min(1, this.stateAge / 0.35) * Math.PI)
        : 0;
    const flinch =
      this.state === "stagger"
        ? Math.sin(Math.min(1, this.stateAge / 0.22) * Math.PI)
        : 0;
    this.model.position.y = M(
      this.model.position.y,
      this.capyRest.position.y +
        Math.abs(Math.sin(phase)) * (0.035 + 0.045 * run) * move -
        0.055 * prep,
      18,
      dt,
    );
    this.model.position.z = M(
      this.model.position.z,
      this.capyRest.position.z + 0.05 * prep,
      15,
      dt,
    );
    this.model.rotation.x = M(
      this.model.rotation.x,
      this.capyRest.rotation.x -
        0.035 * prep -
        0.065 * run +
        Math.sin(phase * 2) * 0.016 * move,
      14,
      dt,
    );
    this.model.rotation.z = M(
      this.model.rotation.z,
      this.capyRest.rotation.z + Math.sin(phase) * 0.025 * move * (1 - run),
      14,
      dt,
    );
    this.model.scale.y = M(
      this.model.scale.y,
      this.capyRest.scale.y * (1 - 0.035 * prep),
      15,
      dt,
    );
    for (const joint of this.capyRig) {
      let pitch = 0,
        yaw = 0,
        roll = 0;
      const walkOffset = joint.front
        ? joint.side > 0
          ? Math.PI
          : 0
        : joint.side > 0
          ? 0
          : Math.PI;
      const runOffset =
        (joint.front ? 0 : Math.PI) + (joint.side > 0 ? 0.4 : 0);
      const stride = phase + walkOffset + (runOffset - walkOffset) * run;
      const swing = Math.cos(stride) * move;
      const lift = Math.max(0, Math.sin(stride)) * move;
      if (joint.role === "hip")
        pitch = swing * (0.3 + 0.16 * run) - prep * (joint.front ? 0.06 : 0.12);
      else if (joint.role === "knee")
        pitch = -lift * (0.38 + 0.18 * run) + prep * 0.2;
      else if (joint.role === "foot") pitch = lift * 0.16 - prep * 0.08;
      else if (joint.role === "pelvis")
        pitch = Math.sin(phase * 2) * 0.016 * move + prep * 0.025;
      else if (joint.role === "chest")
        pitch = -prep * 0.045 + Math.sin(phase * 2 + 0.5) * 0.014 * move;
      else if (joint.role === "head") {
        pitch = -0.14 * prep - 0.09 * run - 0.1 * bite + flinch * 0.08;
        yaw = Math.sin(phase * 0.5) * 0.018 * move;
      } else if (joint.role === "snout") pitch = -bite * 0.07;
      else if (joint.role === "ear" || joint.role === "earTip") {
        pitch =
          (Math.sin(phase + joint.side) * 0.035 * move - prep * 0.06) *
          (joint.role === "earTip" ? 0.5 : 1);
        roll = joint.side * prep * 0.04;
      }
      if (pitch)
        joint.bone.quaternion.multiply(
          this.capyRotationDelta.setFromAxisAngle(joint.pitchAxis, pitch),
        );
      if (yaw)
        joint.bone.quaternion.multiply(
          this.capyRotationDelta.setFromAxisAngle(joint.yawAxis, yaw),
        );
      if (roll)
        joint.bone.quaternion.multiply(
          this.capyRotationDelta.setFromAxisAngle(joint.rollAxis, roll),
        );
    }
    for (const [index, leg] of (this.legs ?? []).entries())
      leg.rotation.x =
        Math.cos(phase + (index % 3 ? Math.PI : 0)) * 0.45 * move - prep * 0.1;
    this.capyPoseBlend = Math.min(1, this.capyPoseBlend + dt / 0.14);
    if (this.capyPoseBlend < 1)
      for (const pose of this.capyPose) {
        pose.targetQuaternion.copy(pose.node.quaternion);
        pose.targetPosition.copy(pose.node.position);
        pose.targetScale.copy(pose.node.scale);
        pose.node.quaternion.slerpQuaternions(
          pose.transitionQuaternion,
          pose.targetQuaternion,
          this.capyPoseBlend,
        );
        pose.node.position.lerpVectors(
          pose.transitionPosition,
          pose.targetPosition,
          this.capyPoseBlend,
        );
        pose.node.scale.lerpVectors(
          pose.transitionScale,
          pose.targetScale,
          this.capyPoseBlend,
        );
      }
    if (
      this.onGround &&
      this.capyPlants.length &&
      (this.state === "charge-prep" || (!moving && prep > 0.025))
    )
      this.plantCapybaraFeet();
    else this.groundCapybaraPose(phase, move, run);
  }
  isWatched() {
    const t = this.game.player.camera;
    if (
      (t.getWorldDirection(this.viewForward),
      this.viewProjection.multiplyMatrices(
        t.projectionMatrix,
        t.matrixWorldInverse,
      ),
      this.viewFrustum.setFromProjectionMatrix(this.viewProjection),
      this.viewSphere.center.copy(this.position),
      (this.viewSphere.center.y += this.data.hitY),
      !this.viewFrustum.intersectsSphere(this.viewSphere) ||
        (this.viewDirection.copy(this.viewSphere.center).sub(t.position),
        this.viewDirection.dot(this.viewForward) <= 0))
    )
      return !1;
    const e = this.viewDirection.length();
    if (e < 0.001) return !0;
    this.viewDirection.multiplyScalar(1 / e);
    const s = this.game.physics.raycast(t.position, this.viewDirection, e);
    return !s || s.distance >= e - this.data.radius;
  }
  updateAwareness(t) {
    this.data.leap &&
      ((this.watchedTime = this.isWatched()
        ? Math.min(this.data.leapWatchTime, this.watchedTime + t)
        : 0),
      this.watchedTime + 1e-6 >= this.data.leapWatchTime
        ? ((this.unseenTime = 0),
          this.state === "leap-prep" && this.setState("chase"))
        : (this.unseenTime = Math.min(
            this.data.leapUnseenTime + this.data.leapCooldown,
            this.unseenTime + t,
          )));
  }
  get raging() {
    return !!(
      this.data.rageThreshold &&
      this.health > 0 &&
      this.health <= this.data.health * this.data.rageThreshold
    );
  }
  get moveSpeed() {
    return this.data.speed * (this.raging ? this.data.rageSpeed : 1);
  }
  get leapMultiplier() {
    return this.raging ? this.data.rageLeap : 1;
  }
  update(t) {
    ((this.time += t),
      (this.stateAge += t),
      (this.attackCooldown -= t),
      (this.leapCooldown -= t),
      (this.basicHopCooldown -= t),
      (this.chargeCooldown -= t),
      (this.hitFlash = Math.max(0, this.hitFlash - t)));
    for (const e of this.model.userData.ownedMaterials ?? [])
      e.emissive &&
        e.emissive.setHex(
          this.hitFlash > 0 ? 11184810 : this.raging ? 2491904 : 0,
        );
    if (this.dead) {
      (this.mouseVisual?.update(t, 0, 0, !1), (this.deadAge += t));
      const e = Math.exp(-(this.onGround ? 16 : 1.8) * t);
      ((this.velocity.x *= e),
        (this.velocity.z *= e),
        (this.velocity.y -= 18 * t),
        this.game.physics.move(this, t),
        this.onGround &&
          Math.hypot(this.velocity.x, this.velocity.z) < 0.12 &&
          (this.velocity.x = this.velocity.z = 0),
        (this.visual.rotation.z = M(
          this.visual.rotation.z,
          this.deathSide * 1.48,
          10,
          t,
        )),
        this.deadAge > 3.5 &&
          this.visual.scale.setScalar(
            Math.max(0, 1 - (this.deadAge - 3.5) / 0.45),
          ),
        this.deadAge > 3.95 && this.dispose());
    } else if (this.state === "emerging") {
      const e = Math.min(1, this.stateAge / 0.7);
      (this.visual.scale.setScalar(Math.max(0.02, 1 - (1 - e) ** 3)),
        (this.visual.position.y = -0.5 * (1 - e)),
        this.stateAge >= 0.75 && this.setState("chase"));
    } else {
      const e = this.game.player,
        s = this.position.distanceTo(e.position),
        i = e.position.clone().sub(this.position);
      if (
        ((i.y = 0),
        i.normalize(),
        e.dead || this.updateAwareness(t),
        (this.velocity.y -= 18 * t),
        e.dead)
      )
        ((this.velocity.x = 0), (this.velocity.z = 0));
      else if (this.state === "chase") this.chase(t, i, s);
      else if (this.state === "attack") {
        if (!this.attackApplied && this.stateAge >= 0.08) {
          this.attackApplied = !0;
          const a = this.game.physics.raycast(
            this.position.clone().add(new d(0, 0.5, 0)),
            i,
            s,
          );
          s <= this.data.range * 1.4 &&
            !a &&
            (e.takeDamage(this.data.damage, i),
            this.data.stun && (e.stun = 0.4));
        }
        ((this.visual.position.z =
          -Math.sin(Math.min(1, this.stateAge / 0.2) * Math.PI) * 0.4),
          this.stateAge >= 0.35 &&
            ((this.visual.position.z = 0), this.setState("chase")));
      } else if (this.state === "leap-prep") {
        if ((this.face(i, t), this.stateAge >= 0.35)) {
          (this.setState("leap"),
            (this.leapCooldown = this.data.leapCooldown),
            (this.unseenTime = 0));
          const a = e.position.clone();
          e.velocity && a.addScaledVector(e.velocity, 0.18);
          const o = a.sub(this.position).setY(0).normalize();
          (this.velocity
            .copy(o)
            .multiplyScalar(
              Math.min(
                this.data.leapSpeed * this.leapMultiplier,
                Math.max(6, s * 1.65),
              ),
            ),
            (this.velocity.y =
              this.data.leapHeight * (this.raging ? 1.18 : 1)));
        }
      } else if (this.state === "leap") {
        const a = s <= this.radius + (e.radius ?? 0.42) + 0.45,
          o =
            a &&
            this.game.physics.raycast(
              this.position.clone().add(new d(0, 0.5, 0)),
              i,
              s,
            );
        a && !o
          ? (e.takeDamage(this.data.damage * 1.25, i),
            this.velocity.copy(i).multiplyScalar(-3.5),
            (this.velocity.y = 2),
            this.setState("recover"))
          : this.onGround && this.stateAge > 0.1 && this.setState("recover");
      } else if (this.state === "charge-prep")
        (this.face(i, t),
          this.stateAge >= 0.5 &&
            (this.setState("charge"),
            (this.chargeCooldown = this.data.chargeCooldown),
            (this.chargeHit = !1),
            this.chargeDirection.copy(i),
            (this.velocity.x = i.x * this.data.chargeSpeed),
            (this.velocity.z = i.z * this.data.chargeSpeed)));
      else if (this.state === "charge") {
        const a = this.position
          .clone()
          .addScaledVector(this.chargeDirection, 0.75);
        !this.game.navigation.canTraverse(
          this.position,
          a,
          this.radius,
          this.height,
        ) || this.stateAge >= this.data.chargeDuration
          ? ((this.velocity.x = this.velocity.z = 0), this.setState("recover"))
          : !this.chargeHit &&
            s <= this.radius + (e.radius ?? 0.42) + 0.7 &&
            (this.game.physics.raycast(
              this.position.clone().add(new d(0, 0.7, 0)),
              i,
              s,
            ) ||
              ((this.chargeHit = !0),
              e.takeDamage(this.data.damage * 1.3, this.chargeDirection),
              (e.stun = 0.6),
              (this.velocity.x *= 0.2),
              (this.velocity.z *= 0.2),
              this.setState("recover")));
      } else
        (this.state === "recover" || this.state === "stagger") &&
          ((this.velocity.x = M(this.velocity.x, 0, 8, t)),
          (this.velocity.z = M(this.velocity.z, 0, 8, t)),
          this.stateAge >=
            (this.state === "recover"
              ? this.data.charge
                ? 0.85
                : 0.6
              : 0.22) && this.setState("chase"));
      (this.game.physics.move(this, t), this.animate(t));
    }
    this.root.position.copy(this.position);
    if (this.type === "capybara") {
      // Never let a mixer overwrite the custom moving/wind-up pose.
      if (this.action && this.isCapybaraIdle()) {
        this.action.setEffectiveTimeScale(1);
        this.mixer?.update(t);
      }
      return;
    }
    if (this.action) {
      const e =
        this.state === "charge"
          ? this.data.chargeSpeed / this.data.speed
          : this.state === "chase"
            ? Math.max(
                0.5,
                Math.hypot(this.velocity.x, this.velocity.z) / this.data.speed,
              )
            : 1;
      this.action.setEffectiveTimeScale(e);
    }
    this.mixer && this.mixer.update(t);
  }
  chase(t, e, s) {
    if (
      this.data.leap &&
      this.unseenTime >= this.data.leapUnseenTime &&
      this.leapCooldown <= 0 &&
      this.onGround &&
      s >= this.data.leapMin &&
      s <= this.data.leapMax * this.leapMultiplier &&
      this.game.navigation.canTraverse(
        this.position,
        this.game.player.position,
        this.radius,
        this.height,
      )
    ) {
      (this.setState("leap-prep"),
        this.face(e, t),
        (this.velocity.x = this.velocity.z = 0));
      return;
    }
    if (
      this.data.charge &&
      this.chargeCooldown <= 0 &&
      this.onGround &&
      s >= this.data.chargeMin &&
      s <= this.data.chargeMax &&
      this.game.navigation.canTraverse(
        this.position,
        this.game.player.position,
        this.radius,
        this.height,
      )
    ) {
      (this.setState("charge-prep"), (this.velocity.x = this.velocity.z = 0));
      return;
    }
    if (
      s <= this.data.range &&
      (this.type === "rat" || this.attackCooldown <= 0) &&
      !this.game.physics.raycast(
        this.position.clone().add(new d(0, 0.5, 0)),
        e,
        s,
      )
    ) {
      (this.attackCooldown <= 0 &&
        (this.setState("attack"),
        (this.attackApplied = !1),
        (this.attackCooldown = this.data.cooldown)),
        (this.velocity.x = this.velocity.z = 0),
        this.face(e, t));
      return;
    }
    const i = this.game.navigation.steer(this, this.game.player.position, t),
      a = new d(),
      o = this.type === "mouse" ? 1.4 : 2.2;
    for (const l of this.game.enemies) {
      if (l === this || l.dead) continue;
      const p = this.position.clone().sub(l.position);
      p.y = 0;
      const u = p.length();
      u < 0.01 ||
        u >= o ||
        (p.normalize(),
        p.addScaledVector(i, -p.dot(i)),
        a.addScaledVector(p, 1 - u / o));
    }
    let n = i.clone().addScaledVector(a, 0.65).normalize();
    const r = this.position.clone().addScaledVector(n, 0.8);
    (this.game.navigation.canTraverse(
      this.position,
      r,
      this.radius,
      this.height,
    ) || (n = i),
      this.position.distanceToSquared(this.lastPosition) < 0.04
        ? (this.stuckTime += t)
        : ((this.stuckTime = 0), this.lastPosition.copy(this.position)),
      this.stuckTime > 0.85 &&
        (this.game.navigation.unstick(this), (this.stuckTime = 0)),
      this.face(n, t));
    const h = (this.time % 0.45) / 0.45,
      m =
        this.type === "rat" && !this.actions.move
          ? h >= 0.18 && h <= 0.72
            ? Math.sin(((h - 0.18) / 0.54) * Math.PI) * 1.85
            : 0
          : 1;
    ((this.velocity.x = n.x * this.moveSpeed * m),
      (this.velocity.z = n.z * this.moveSpeed * m),
      this.type === "rat" &&
        this.onGround &&
        this.basicHopCooldown <= 0 &&
        n.lengthSq() > 0.1 &&
        ((this.velocity.y = this.raging ? 3.7 : 3.2),
        (this.basicHopCooldown = this.raging ? 0.4 : 0.5)));
  }
  face(t, e) {
    this.root.rotation.y = ge(
      this.root.rotation.y,
      Math.atan2(-t.x, -t.z),
      12,
      e,
    );
  }
  animate(t) {
    if (this.type === "capybara") {
      this.animateCapybara(t);
      return;
    }
    if (
      (this.mouseVisual?.update(
        t,
        Math.hypot(this.velocity.x, this.velocity.z) / this.data.speed,
        this.state === "attack"
          ? Math.sin(Math.min(1, this.stateAge / 0.35) * Math.PI)
          : 0,
      ),
      this.actions.move && this.type !== "rat")
    )
      return;
    const e = this.state === "chase" || this.state === "charge";
    this.gaitTime +=
      t *
      (this.state === "charge" ? this.data.chargeSpeed / this.data.speed : 1);
    const s = this.type === "rat",
      i = s
        ? (this.time / 0.45) * Math.PI * 2
        : this.gaitTime * (this.type === "mouse" ? 14 : 6.8),
      a = this.state === "leap-prep" ? Math.min(1, this.stateAge / 0.35) : 0,
      o = this.state === "leap",
      n =
        this.state === "recover"
          ? Math.sin(Math.min(1, this.stateAge / 0.25) * Math.PI)
          : 0;
    if (
      ((this.animationMove = M(
        this.animationMove,
        e
          ? Math.min(
              1,
              Math.hypot(this.velocity.x, this.velocity.z) / this.data.speed,
            )
          : 0,
        10,
        t,
      )),
      (this.model.position.y = M(
        this.model.position.y,
        e ? Math.max(0, Math.sin(i)) * (s ? 0.1 : 0.035) : -0.09 * a,
        18,
        t,
      )),
      (this.model.scale.y = M(
        this.model.scale.y,
        1 - 0.16 * a + (o ? 0.06 : 0) - n * 0.1,
        12,
        t,
      )),
      s)
    ) {
      const r = 1 + 0.06 * a - (o ? 0.025 : 0) + n * 0.04;
      ((this.model.scale.x = this.model.scale.z =
        M(this.model.scale.x, r, 12, t)),
        (this.model.rotation.x = M(
          this.model.rotation.x,
          0.2 * a + (o ? -0.12 : 0.05 * this.animationMove),
          12,
          t,
        )));
    }
    this.model.rotation.z = M(
      this.model.rotation.z,
      Math.sin(i * 0.5) * (s ? 0.025 : 0.04) * this.animationMove,
      12,
      t,
    );
    for (const [r, h] of (this.legs ?? []).entries())
      h.rotation.x = e ? Math.sin(i + (r % 3 ? Math.PI : 0)) * 0.55 : 0;
    this.tail && (this.tail.rotation.y = Math.sin(i) * 0.15);
    for (const r of this.rig) {
      const h = Math.sin(i + (r.left ? 0 : Math.PI)) * this.animationMove,
        m = r.bone;
      (m.rotation.copy(r.rotation),
        r.role === "thigh"
          ? (m.rotation.x += h * 0.24 - a * 0.22 + (o ? 0.16 : 0) - n * 0.12)
          : r.role === "calf"
            ? (m.rotation.x +=
                Math.max(0, -h) * 0.22 + a * 0.28 - (o ? 0.12 : 0))
            : r.role === "upperarm"
              ? (m.rotation.x -= h * 0.13 + a * 0.12 + (o ? 0.18 : 0))
              : r.role === "forearm"
                ? (m.rotation.x += h * 0.08 + a * 0.1)
                : r.role === "spine"
                  ? (m.rotation.x +=
                      Math.sin(i) * 0.025 * this.animationMove + a * 0.06)
                  : r.role === "head"
                    ? ((m.rotation.x -= a * 0.08),
                      (m.rotation.y += Math.sin(this.time * 2.2) * 0.035))
                    : r.role === "tail" &&
                      (m.rotation.y +=
                        Math.sin(i * 0.5 + r.bone.name.length) *
                        0.07 *
                        (0.3 + this.animationMove)));
    }
  }
  takeDamage(t, e, s = new d(), i = null) {
    if (this.dead) return;
    ((this.health -= t), (this.hitFlash = 0.08));
    const a = this.type !== "capybara" || i !== 3;
    (a && this.velocity.addScaledVector(s, 3),
      this.health <= 0
        ? ((this.dead = !0),
          this.setState("dead"),
          (this.deadAge = 0),
          a
            ? (this.velocity
                .copy(s)
                .multiplyScalar(this.type === "capybara" ? 1.4 : 2.5),
              (this.velocity.y = 1.8))
            : this.velocity.set(0, Math.min(0, this.velocity.y), 0),
          this.game.state.addScore(this.data.score),
          this.game.effects.decal(
            new d(this.position.x, 0.01, this.position.z),
            new d(0, 1, 0),
            !0,
            this.type === "mouse" ? 0.5 : 1.2,
          ),
          Math.random() < this.data.dropChance &&
            this.game.spawner.drop(this.position))
        : Math.random() < this.data.stagger && this.setState("stagger"));
  }
  fallback() {
    const t = new S(),
      e = new R({
        color:
          this.type === "mouse"
            ? 8619915
            : this.type === "rat"
              ? 6374190
              : 10250046,
        roughness: 0.85,
      });
    t.userData.ownedMaterials = [e];
    const s = (h, m, l = t) => {
        const p = new k(new G(1, 12, 8), e);
        return (
          p.position.set(...h),
          p.scale.set(...m),
          (p.castShadow = !0),
          l.add(p),
          p
        );
      },
      i = this.type === "rat",
      a = this.type === "capybara";
    s(
      [0, i ? 1 : a ? 1.1 : 0.3, 0],
      i ? [0.38, 0.65, 0.35] : a ? [0.7, 0.75, 1] : [0.22, 0.22, 0.4],
    );
    const n = i ? -0.28 : a ? -0.95 : -0.4,
      r = i ? 1.65 : a ? 1.4 : 0.36;
    s(
      [0, r, n],
      a ? [0.45, 0.45, 0.55] : i ? [0.25, 0.28, 0.28] : [0.16, 0.14, 0.2],
    );
    for (const h of [-1, 1]) {
      s(
        [h * (a ? 0.32 : i ? 0.15 : 0.11), r + (i ? 0.35 : 0.14), n],
        i ? [0.07, 0.38, 0.12] : [0.1, 0.12, 0.06],
      );
      const m = new k(
        new G(a ? 0.05 : 0.025, 8, 6),
        new A({ color: this.type === "mouse" ? 16730136 : 1051913 }),
      );
      (m.position.set(h * (a ? 0.44 : i ? 0.23 : 0.15), r + 0.02, n - 0.12),
        t.add(m));
    }
    this.legs = [];
    for (const [h, m] of i
      ? [
          [0.25, 0],
          [-0.25, 0],
        ]
      : [
          [0.15, -0.2],
          [-0.15, -0.2],
          [0.15, 0.2],
          [-0.15, 0.2],
        ]) {
      const l = new S();
      (l.position.set(a ? h * 3 : h, i ? 0.7 : a ? 0.55 : 0.2, a ? m * 3 : m),
        s(
          [0, i ? -0.35 : a ? -0.28 : -0.09, 0],
          i ? [0.09, 0.4, 0.12] : a ? [0.14, 0.3, 0.14] : [0.04, 0.12, 0.04],
          l,
        ),
        t.add(l),
        this.legs.push(l));
    }
    return (
      a ||
        ((this.tail = new S()),
        this.tail.position.set(0, i ? 0.7 : 0.2, i ? 0.25 : 0.3),
        s([0, 0, i ? 0.7 : 0.4], [0.025, 0.025, i ? 0.7 : 0.4], this.tail),
        t.add(this.tail)),
      t
    );
  }
  dispose() {
    this.removed ||
      ((this.removed = !0),
      this.mixer?.stopAllAction(),
      this.mouseVisual?.dispose(),
      this.mixer && this.mixer.uncacheRoot(this.model.userData.model),
      this.root.removeFromParent(),
      this.imported
        ? Ht(this.model)
        : this.model.traverse((t) => {
            t.isMesh &&
              (t.geometry.dispose(),
              t.material !== this.model.userData.ownedMaterials[0] &&
                t.material.dispose());
          }),
      this.imported ||
        this.model.userData.ownedMaterials.forEach((t) => t.dispose()));
  }
}
const Ne = {
  health: {
    model: "medkit",
    dimension: "x",
    size: 0.48,
    color: 6475897,
    text: "+25 ЗДОРОВЬЕ",
  },
  armor: {
    model: "battery",
    size: 0.35,
    color: 5556195,
    text: "+25 БРОНЯ HEV",
  },
  pistol: {
    model: "ammo_pistol",
    dimension: "x",
    size: 0.35,
    color: 16761665,
    text: "+24 ПАТРОНЫ 9MM",
    amount: 24,
  },
  smg: {
    model: "ammo_smg",
    dimension: "x",
    size: 0.4,
    color: 6659291,
    text: "+60 ПАТРОНЫ SMG",
    amount: 60,
  },
  shotgun: {
    model: "ammo_shotgun",
    dimension: "x",
    size: 0.38,
    color: 14903875,
    text: "+12 ДРОБЬ 12G",
    amount: 12,
  },
  weapon_smg: {
    model: "smg",
    dimension: "z",
    size: 0.65,
    rotation: [0, 180, 0],
    color: 16761665,
    text: "ПОЛУЧЕН АВТОМАТ SMG!",
    weapon: 2,
  },
  weapon_shotgun: {
    model: "shotgun",
    dimension: "z",
    size: 0.75,
    rotation: [0, -90, 0],
    color: 16761665,
    text: "ПОЛУЧЕН БОЕВОЙ ДРОБОВИК!",
    weapon: 3,
  },
};
class Ke {
  constructor(t, e, s) {
    ((this.game = t),
      (this.type = e),
      (this.config = Ne[e]),
      (this.position = s.clone()),
      (this.root = new S()),
      this.root.position.copy(s),
      (this.root.position.y += 0.25),
      (this.model = t.assets.instantiate(this.config.model, this.config)),
      (this.imported = !!this.model),
      this.model ||
        (this.model = new k(
          new B(0.35, 0.25, 0.2),
          new R({ color: this.config.color }),
        )),
      this.root.add(this.model),
      t.scene.add(this.root));
    const i = new A({
      color: this.config.color,
      transparent: !0,
      opacity: 0.6,
      side: V,
      depthWrite: !1,
    });
    ((this.ring = new k(new Gt(0.27, 0.32, 24), i)),
      (this.ring.rotation.x = -Math.PI / 2),
      this.ring.position.copy(s),
      (this.ring.position.y = 0.018),
      t.scene.add(this.ring),
      (this.time = b(0, 10)),
      (this.collected = !1),
      (this.removed = !1),
      (this.fadeTime = 0));
  }
  update(t) {
    if (
      ((this.time += t),
      (this.root.rotation.y += t * 2.2),
      (this.root.position.y =
        this.position.y + 0.25 + Math.sin(this.time * 3.2) * 0.08),
      this.collected)
    ) {
      ((this.fadeTime += t),
        this.root.scale.setScalar(Math.max(0, 1 - this.fadeTime / 0.16)),
        this.fadeTime >= 0.16 && this.dispose());
      return;
    }
    !this.game.player.dead &&
      this.game.player.position.distanceTo(this.position) < 0.95 &&
      this.collect();
  }
  collect() {
    if (this.collected) return !1;
    const t = this.game.player,
      e = this.game.weapons;
    let s = !1;
    return (
      this.type === "health"
        ? (s = t.heal(25))
        : this.type === "armor"
          ? (s = t.addArmor(25))
          : this.config.weapon !== void 0
            ? (s = e.unlock(this.config.weapon))
            : (s = e.addAmmo(this.type, this.config.amount)),
      s &&
        ((this.collected = !0),
        (this.ring.visible = !1),
        this.game.hud.notify(this.config.text)),
      s
    );
  }
  dispose() {
    this.removed ||
      ((this.removed = !0),
      this.root.removeFromParent(),
      this.ring.removeFromParent(),
      this.ring.geometry.dispose(),
      this.ring.material.dispose(),
      this.imported
        ? Ht(this.model)
        : (this.model.geometry.dispose(), this.model.material.dispose()));
  }
}
class Ye {
  constructor(t) {
    ((this.game = t), this.reset());
  }
  reset() {
    ((this.wave = 1),
      (this.spawned = 0),
      (this.total = xt(1)),
      (this.pending = []),
      (this.spawnTimer = 0.5),
      (this.transition = 0),
      (this.active = !1),
      (this.ammoTimer = 8),
      (this.healthTimer = 12));
  }
  start() {
    this.active = !0;
    for (let t = 0; t < 5; t++) this.spawnPickup("health");
    for (let t = 0; t < 2; t++) this.spawnPickup("armor");
    for (let t = 0; t < 6; t++) this.spawnPickup(this.ammoType());
    this.startWave(1);
  }
  startWave(t) {
    ((this.wave = t),
      (this.game.state.wave = t),
      (this.total = xt(t)),
      (this.spawned = 0),
      (this.pending = []),
      (this.spawnTimer = 0.5),
      this.game.hud.announce(`ВОЛНА ${t}`));
  }
  get alive() {
    return this.game.enemies.filter((t) => !t.dead && !t.removed).length;
  }
  get remaining() {
    return this.total - this.spawned + this.pending.length + this.alive;
  }
  update(t) {
    if (!(!this.active || this.game.player.dead)) {
      if (this.transition > 0) {
        ((this.transition = Math.max(0, this.transition - t)),
          this.transition === 0 && this.startWave(this.wave + 1));
        return;
      }
      for (let e = this.pending.length - 1; e >= 0; e--)
        if (((this.pending[e].time -= t), this.pending[e].time <= 0)) {
          const { position: s, type: i } = this.pending.splice(e, 1)[0];
          this.game.enemies.push(new Ve(this.game, i, s));
        }
      ((this.healthTimer -= t),
        (this.ammoTimer -= t),
        this.healthTimer <= 0 &&
          ((this.healthTimer = b(16, 24)),
          this.game.pickups.filter((e) => e.type === "health" && !e.collected)
            .length < 5 && this.spawnPickup("health")),
        this.ammoTimer <= 0 &&
          ((this.ammoTimer = b(10, 16)),
          this.game.pickups.filter((e) => !e.collected).length < 12 &&
            this.spawnPickup(this.ammoType())),
        this.spawned < this.total
          ? ((this.spawnTimer -= t),
            this.spawnTimer <= 0 &&
              this.alive + this.pending.length < 20 &&
              ((this.spawnTimer = Ee(this.wave)), this.spawnEnemy()))
          : this.pending.length === 0 &&
            this.alive === 0 &&
            this.completeWave());
    }
  }
  spawnEnemy() {
    const t = this.game.player;
    let e = this.game.arena.burrows.filter(
      (o) => o.distanceTo(t.position) >= 7,
    );
    e.length || (e = this.game.arena.burrows);
    const s = t.camera.getWorldDirection(new d()),
      i = e.filter((o) => o.clone().sub(t.position).normalize().dot(s) < 0.2),
      a = ut(i.length ? i : e).clone();
    (this.game.effects.burst(a, 7098681, 24, 3, 0.7, 0.1),
      this.pending.push({ position: a, time: 0.45, type: Ce(this.wave) }),
      this.spawned++);
  }
  completeWave() {
    ((this.transition = 5),
      this.game.state.addScore(this.wave * 200),
      this.game.hud.announce(`ВОЛНА ${this.wave} ЗАВЕРШЕНА!`));
    for (let t = 0; t < 2; t++) this.spawnPickup("health");
    this.spawnPickup("armor");
    for (let t = 0; t < 3; t++) this.spawnPickup(this.ammoType());
    ((this.wave === 1 || this.wave === 2) &&
      (this.spawnPickup(
        this.wave === 1 ? "weapon_smg" : "weapon_shotgun",
        new d(),
      ),
      this.game.hud.notify(
        `${this.wave === 1 ? "SMG" : "ДРОБОВИК"} В ЦЕНТРЕ АРЕНЫ!`,
      )),
      Math.random() < 0.3 &&
        this.game.arena.respawnBarrels() > 0 &&
        this.game.hud.notify("БОЧКИ ВОССТАНОВЛЕНЫ!"));
  }
  ammoType() {
    return ut(
      this.game.weapons.weapons
        .filter((t) => t.unlocked && !t.melee)
        .map((t) => t.ammoType),
    );
  }
  safePosition() {
    for (let t = 0; t < 100; t++) {
      const e = new d(b(-14, 14), 0, b(-14, 14));
      if (
        this.game.physics.isFree(e) &&
        this.game.pickups.every(
          (s) => s.collected || s.position.distanceTo(e) > 1,
        )
      )
        return e;
    }
    return new d(b(-2, 2), 0, b(-2, 2));
  }
  spawnPickup(t, e = this.safePosition()) {
    (this.game.pickups.filter((i) => !i.collected).length >= 36 &&
      !t.startsWith("weapon_")) ||
      this.game.pickups.push(new Ke(this.game, t, e));
  }
  drop(t) {
    const e = Math.random() < 0.35 ? "health" : this.ammoType(),
      s = t.clone();
    ((s.y = 0), this.game.physics.isFree(s) && this.spawnPickup(e, s));
  }
}
const st = 96,
  qe = 32,
  Xe = 8,
  bt = 1.8,
  kt = new Z(16770465),
  St = new Z(15746059),
  Ze = new Z(5592154);
function zt(c = !1) {
  const e = new Uint8Array(16384);
  for (let i = 0; i < 64; i++)
    for (let a = 0; a < 64; a++) {
      const o = ((a + 0.5) / 64) * 2 - 1,
        n = ((i + 0.5) / 64) * 2 - 1,
        r = Math.hypot(o, n),
        h = c
          ? 0.82 +
            0.18 * Math.sin(o * 13 + Math.cos(n * 9)) * Math.cos(n * 11 - o * 5)
          : 1,
        m = Math.max(0, 1 - r) ** (c ? 1.2 : 1.8) * h,
        l = (i * 64 + a) * 4;
      ((e[l] = 255),
        (e[l + 1] = 255),
        (e[l + 2] = 255),
        (e[l + 3] = Math.round(m * 255)));
    }
  const s = new ht(e, 64, 64, $t);
  return (
    (s.colorSpace = rt),
    (s.magFilter = N),
    (s.minFilter = N),
    (s.needsUpdate = !0),
    s
  );
}
function Je() {
  const t = new Uint8Array(16384);
  for (let s = 0; s < 64; s++)
    for (let i = 0; i < 64; i++) {
      const a = (i / 64) * Math.PI * 2,
        o = (s / 64) * Math.PI * 2,
        n = Math.max(
          0,
          Math.min(
            1,
            0.48 +
              0.22 * Math.sin(a * 3 + o * 2) +
              0.17 * Math.cos(a * 7 - o * 5) +
              0.1 * Math.sin(a * 13 + o * 11),
          ),
        ),
        r = (s * 64 + i) * 4;
      ((t[r] = 255),
        (t[r + 1] = Math.round(70 + n * 185)),
        (t[r + 2] = Math.round(n ** 3 * 155)),
        (t[r + 3] = Math.round(
          Math.max(0, Math.min(1, (n - 0.22) * 2)) * 255,
        )));
    }
  const e = new ht(t, 64, 64, $t);
  return (
    (e.colorSpace = rt),
    (e.wrapS = e.wrapT = Pt),
    (e.magFilter = e.minFilter = N),
    (e.needsUpdate = !0),
    e
  );
}
class Qe {
  constructor(t) {
    ((this.game = t),
      (this.particles = []),
      (this.explosions = []),
      (this.decals = []),
      (this.glowTexture = zt()),
      (this.smokeTexture = zt(!0)),
      (this.fireTexture = Je()),
      (this.fireGeometry = new G(1, 12, 8)),
      (this.ringGeometry = new Gt(0.88, 1, 40)),
      (this.flashLight = new Ot(16759652, 0, 20, 1.5)),
      (this.flashAge = 1),
      t.scene.add(this.flashLight),
      (this.particlePool = Array.from({ length: qe }, () =>
        this.createParticle(),
      )),
      (this.explosionPool = Array.from({ length: Xe }, () =>
        this.createExplosion(),
      )));
  }
  createParticle() {
    const t = new Float32Array(st * 3),
      e = new Float32Array(st * 3),
      s = new he();
    (s.setAttribute("position", new Bt(t, 3).setUsage(ot)),
      s.setDrawRange(0, 0));
    const i = new ce({
        size: 0.06,
        map: this.glowTexture,
        transparent: !0,
        depthWrite: !1,
      }),
      a = new le(s, i);
    return (
      (a.visible = !1),
      (a.frustumCulled = !1),
      this.game.scene.add(a),
      {
        mesh: a,
        positions: t,
        velocities: e,
        active: !1,
        count: 0,
        age: 0,
        lifetime: 0,
        gravity: 0,
      }
    );
  }
  createExplosion() {
    const t = new S();
    t.visible = !1;
    const e = new k(
        this.fireGeometry,
        new A({
          map: this.fireTexture,
          color: kt,
          transparent: !0,
          depthWrite: !1,
        }),
      ),
      s = new K(
        new Y({
          map: this.glowTexture,
          color: 16760929,
          transparent: !0,
          depthWrite: !1,
          blending: _,
        }),
      ),
      i = new k(
        this.ringGeometry,
        new A({
          color: 16759653,
          transparent: !0,
          depthWrite: !1,
          side: V,
          forceSinglePass: !0,
          blending: _,
        }),
      );
    i.rotation.x = -Math.PI / 2;
    const a = Array.from({ length: 3 }, (o, n) => {
      const r = new K(
        new Y({
          map: this.smokeTexture,
          color: 5592154,
          transparent: !0,
          depthWrite: !1,
          rotation: n * 2.1,
        }),
      );
      return (t.add(r), r);
    });
    return (
      t.add(e, s, i),
      this.game.scene.add(t),
      { root: t, fireball: e, glow: s, ring: i, smoke: a, active: !1, age: 0 }
    );
  }
  async prepare() {
    const t = this.particlePool[0],
      e = this.explosionPool[0];
    ((t.mesh.visible = !0), (e.root.visible = !0));
    try {
      await this.game.renderer.compileAsync(
        this.game.scene,
        this.game.player.camera,
      );
    } finally {
      ((t.mesh.visible = !1), (e.root.visible = !1));
    }
  }
  burst(t, e, s = 14, i = 4, a = 0.4, o = 0.06, n = -9.8, r = !1) {
    if (((s = Math.min(st, Math.max(0, Math.floor(s)))), !s)) return;
    const h =
        this.particlePool.find((u) => !u.active) ?? this.particles.shift(),
      { positions: m, velocities: l, mesh: p } = h;
    for (let u = 0; u < s; u++) {
      const y = u * 3;
      ((m[y] = b(-0.08, 0.08)),
        (m[y + 1] = b(-0.08, 0.08)),
        (m[y + 2] = b(-0.08, 0.08)),
        (l[y] = b(-i, i)),
        (l[y + 1] = b(i * 0.25, i)),
        (l[y + 2] = b(-i, i)));
    }
    return (
      (h.active = !0),
      (h.count = s),
      (h.age = 0),
      (h.lifetime = Math.max(0.001, a)),
      (h.gravity = n),
      p.position.copy(t),
      (p.visible = !0),
      p.geometry.setDrawRange(0, s),
      (p.geometry.attributes.position.needsUpdate = !0),
      p.material.color.set(e),
      (p.material.size = o),
      (p.material.opacity = 1),
      (p.material.blending = r ? _ : me),
      this.particles.push(h),
      h
    );
  }
  decal(t, e, s = !1, i = s ? 0.65 : 0.14) {
    const a = this.game.assets.textures.get(s ? "blood" : "bullet");
    if (!a) return;
    const o = new A({
        map: a,
        transparent: !0,
        opacity: 0.9,
        depthWrite: !1,
        polygonOffset: !0,
        polygonOffsetFactor: -2,
        side: V,
      }),
      n = new k(new Ct(i, i), o);
    (n.position.copy(t).addScaledVector(e, 0.006),
      n.quaternion.setFromUnitVectors(new d(0, 0, 1), e),
      n.rotateZ(b(0, Math.PI * 2)),
      this.game.scene.add(n),
      this.decals.push(n),
      this.decals.length > 100 && this.removeMesh(this.decals.shift()));
  }
  blood(t, e) {
    this.burst(t, 10360333, 14, 3);
    const s = this.game.physics.raycast(
      t.clone().addScaledVector(e, 0.1),
      e,
      3.5,
    );
    s && this.decal(s.point, s.normal, !0);
  }
  explosion(t) {
    const e =
      this.explosionPool.find((s) => !s.active) ?? this.explosions.shift();
    return (
      (e.active = !0),
      (e.age = 0),
      (e.root.visible = !0),
      e.root.position.copy(t),
      (e.ring.position.y = 0.035 - t.y),
      this.updateExplosion(e),
      this.explosions.push(e),
      this.flashLight.position.copy(t),
      (this.flashLight.intensity = 260),
      (this.flashAge = 0),
      this.burst(t, 16763497, 64, 12, 1.1, 0.18, -9.8, !0),
      e
    );
  }
  updateExplosion(t) {
    const e = t.age,
      s = 1 - (1 - Math.min(1, e / 0.24)) ** 3,
      i = 0.25 + s * 3.35;
    ((t.fireball.visible = e < 0.65),
      t.fireball.scale.set(i, i * 1.12, i),
      (t.fireball.position.y = e * 0.8),
      t.fireball.material.color.copy(kt).lerp(St, Math.min(1, e / 0.5)),
      (t.fireball.material.opacity = 0.95 * Math.max(0, 1 - e / 0.65)),
      (t.glow.visible = e < 0.55),
      (t.glow.position.y = 0.3 + e),
      t.glow.scale.setScalar(2 + s * 7),
      (t.glow.material.opacity = 0.8 * Math.max(0, 1 - e / 0.55) ** 2),
      (t.ring.visible = e < 0.55),
      t.ring.scale.setScalar(0.3 + 5.7 * Math.min(1, e / 0.5)),
      (t.ring.material.opacity = 0.65 * Math.max(0, 1 - e / 0.55)));
    for (let a = 0; a < t.smoke.length; a++) {
      const o = t.smoke[a],
        n = (a * Math.PI * 2) / 3,
        r = 0.4 + e * 1.2;
      ((o.visible = e > 0.08),
        o.position.set(
          Math.cos(n) * r,
          0.6 + e * (1.8 + a * 0.2),
          Math.sin(n) * r,
        ),
        o.scale.setScalar(3.2 + e * 2.1),
        o.material.color
          .copy(St)
          .lerp(Ze, Math.min(1, Math.max(0, (e - 0.22) / 0.45))),
        (o.material.opacity = Math.min(0.7, e * 4) * Math.max(0, 1 - e / bt)));
    }
  }
  update(t) {
    this.fireTexture.offset.y += t * 0.65;
    for (let e = this.particles.length - 1; e >= 0; e--) {
      const s = this.particles[e];
      if (((s.age += t), s.age >= s.lifetime)) {
        (this.removeParticle(s), this.particles.splice(e, 1));
        continue;
      }
      for (let i = 0; i < s.count * 3; i += 3) {
        s.velocities[i + 1] += s.gravity * t;
        for (let a = 0; a < 3; a++)
          s.positions[i + a] += s.velocities[i + a] * t;
      }
      ((s.mesh.geometry.attributes.position.needsUpdate = !0),
        (s.mesh.material.opacity = 1 - s.age / s.lifetime));
    }
    ((this.flashAge += t),
      (this.flashLight.intensity =
        260 * Math.max(0, 1 - this.flashAge / 0.24) ** 2));
    for (let e = this.explosions.length - 1; e >= 0; e--) {
      const s = this.explosions[e];
      ((s.age += t),
        s.age >= bt
          ? (this.removeExplosion(s), this.explosions.splice(e, 1))
          : this.updateExplosion(s));
    }
  }
  removeMesh(t) {
    (t.removeFromParent(), t.geometry.dispose(), t.material.dispose());
  }
  removeParticle(t) {
    ((t.active = !1),
      (t.mesh.visible = !1),
      t.mesh.geometry.setDrawRange(0, 0));
  }
  removeExplosion(t) {
    ((t.active = !1), (t.root.visible = !1));
  }
  clear() {
    (this.particles.forEach((t) => this.removeParticle(t)),
      this.decals.forEach((t) => this.removeMesh(t)),
      this.explosions.forEach((t) => this.removeExplosion(t)),
      (this.flashLight.intensity = 0),
      (this.flashAge = 1),
      (this.particles.length = 0),
      (this.decals.length = 0),
      (this.explosions.length = 0));
  }
}
class ts {
  constructor(t) {
    ((this.game = t),
      (this.elements = Object.fromEntries(
        [
          "hud",
          "menu",
          "pause",
          "game-over",
          "health",
          "armor",
          "stamina",
          "stamina-fill",
          "stamina-value",
          "wave",
          "score",
          "remaining",
          "weapon-name",
          "ammo",
          "reload",
          "flashlight-charge",
          "crosshair",
          "hit-marker",
          "damage-flash",
          "damage-direction",
          "announcement",
          "notifications",
          "weapon-slots",
          "debug",
          "calibration",
          "final-score",
          "best-score",
        ].map((s) => [s, document.getElementById(s)]),
      )),
      (this.damageOpacity = 0),
      (this.directionOpacity = 0),
      (this.crosshairKick = 6),
      (this.gap = 6),
      (this.hitTime = 0),
      (this.announcementTime = 0),
      (this.messages = []),
      (this.debugVisible = !1),
      (this.slotElements = []));
    const e = document.getElementById("sensitivity");
    ((e.value = t.state.sensitivity), this.updateSensitivity());
    for (const s of ["no-capture", "pause-no-capture"])
      ((document.getElementById(s).checked = t.noCapture),
        document.getElementById(s).addEventListener("change", (i) => {
          ((t.noCapture = i.target.checked),
            X("no-capture", t.noCapture),
            t.noCapture && t.input.unlock(),
            (document.getElementById("no-capture").checked = t.noCapture),
            (document.getElementById("pause-no-capture").checked =
              t.noCapture));
        }));
    (e.addEventListener("input", () => {
      (t.state.setSensitivity(Number(e.value)), this.updateSensitivity());
    }),
      document
        .getElementById("start")
        .addEventListener("click", () => t.start(!0)),
      document
        .getElementById("resume")
        .addEventListener("click", () => t.resume()),
      document
        .getElementById("restart")
        .addEventListener("click", () => t.start(!0)),
      document
        .getElementById("pause-restart")
        .addEventListener("click", () => t.start(!0)),
      document
        .getElementById("to-menu")
        .addEventListener("click", () => t.toMenu()));
  }
  updateSensitivity() {
    document.getElementById("sensitivity-value").textContent = (
      this.game.state.sensitivity * 1e3
    ).toFixed(1);
  }
  showState() {
    const t = this.game.state.status;
    ((this.elements.menu.hidden = t !== "menu"),
      (this.elements.pause.hidden = t !== "paused"),
      (this.elements["game-over"].hidden = t !== "game-over"),
      (this.elements.hud.hidden = t === "menu"),
      t === "game-over" &&
        ((this.elements["final-score"].textContent =
          `Финальный счёт: ${this.game.state.score} · Волна ${this.game.state.wave}`),
        (this.elements["best-score"].textContent =
          `Лучший результат: ${this.game.state.bestScore}`)));
  }
  buildSlots() {
    (this.elements["weapon-slots"].replaceChildren(),
      (this.slotElements = this.game.weapons.weapons.map((t, e) => {
        const s = document.createElement("span");
        return (
          (s.textContent = `${e + 1} ${t.short}`),
          this.elements["weapon-slots"].append(s),
          s
        );
      })));
  }
  update(t, e) {
    const { player: s, weapons: i, state: a, spawner: o } = this.game;
    if (!s || !i) return;
    const n = i.current;
    ((this.elements.health.textContent = Math.ceil(s.health)),
      this.elements.health.classList.toggle(
        "critical",
        s.health < 25 && !s.dead,
      ),
      (this.elements.armor.textContent = Math.ceil(s.armor)));
    const r = Math.ceil(s.stamina - 1e-6);
    ((this.elements["stamina-value"].textContent = r),
      (this.elements["stamina-fill"].style.transform =
        `scaleX(${s.stamina / 100})`),
      this.elements.stamina.setAttribute("aria-valuenow", r),
      this.elements.stamina.classList.toggle("exhausted", s.exhausted),
      (this.elements.wave.textContent = `ВОЛНА: ${a.wave}`),
      (this.elements.score.textContent = `СЧЁТ: ${a.score}`),
      (this.elements.remaining.textContent =
        o.transition > 0
          ? `Следующая волна через ${Math.ceil(o.transition)} с`
          : `ВРАГОВ ОСТАЛОСЬ: ${o.remaining}`),
      (this.elements["weapon-name"].textContent = n.name));
    const h = n.melee ? "—" : `${n.ammo} | ${i.reserves[n.ammoType]}`;
    ((this.elements.ammo.textContent = h),
      (this.elements.reload.hidden = i.reloadRemaining <= 0),
      (this.elements["flashlight-charge"].style.width =
        `${s.flashlightCharge}%`),
      this.elements["flashlight-charge"].parentElement.classList.toggle(
        "on",
        s.flashlightOn,
      ),
      this.slotElements.forEach((m, l) => {
        (m.classList.toggle("locked", !i.weapons[l].unlocked),
          m.classList.toggle("selected", l === i.index));
      }),
      (this.crosshairKick = M(this.crosshairKick, 6, 8, t)),
      (this.gap = M(
        this.gap,
        this.crosshairKick + Math.hypot(s.velocity.x, s.velocity.z) * 0.35,
        14,
        t,
      )),
      this.elements.crosshair.style.setProperty("--gap", `${this.gap}px`),
      (this.hitTime = Math.max(0, this.hitTime - t)),
      (this.elements["hit-marker"].hidden = this.hitTime === 0),
      (this.damageOpacity = Math.max(0, this.damageOpacity - t * 2.5)),
      (this.directionOpacity = Math.max(0, this.directionOpacity - t * 1.5)),
      (this.elements["damage-flash"].style.opacity = this.damageOpacity),
      (this.elements["damage-direction"].style.opacity = this.directionOpacity),
      (this.announcementTime = Math.max(0, this.announcementTime - t)),
      (this.elements.announcement.style.opacity = Math.min(
        1,
        this.announcementTime,
      )));
    for (let m = this.messages.length - 1; m >= 0; m--) {
      const l = this.messages[m];
      ((l.time -= t),
        (l.element.style.opacity = Math.min(1, l.time / 0.8)),
        l.time <= 0 && (l.element.remove(), this.messages.splice(m, 1)));
    }
    (this.debugVisible &&
      (this.elements.debug.textContent = `FPS: ${Math.round(e)}
Врагов: ${o.alive} · Волна: ${a.wave}
Позиция: ${s.position
        .toArray()
        .map((m) => m.toFixed(1))
        .join(", ")}
Draw calls: ${this.game.renderer.info.render.calls}
Геометрий: ${this.game.renderer.info.memory.geometries}`),
      (this.elements.calibration.hidden = !i.calibrating),
      i.calibrating &&
        (this.elements.calibration.textContent = `КАЛИБРОВКА ОРУЖИЯ · F6: выход
${n.name} (слот ${i.index + 1})
I/K: X ±90° · J/L: Y ±90° · U/O: Z ±90°
P: вывести значения в консоль
Углы: ${i.rotations[i.index].join(", ")}
Автосохранение: localStorage`));
  }
  damage(t) {
    ((this.damageOpacity = 0.5),
      (this.directionOpacity = 0.7),
      (this.crosshairKick = 16));
    const e = this.game.player.camera.getWorldDirection(new d()),
      s = new d(1, 0, 0).applyQuaternion(this.game.player.camera.quaternion),
      i = e.dot(t),
      a = s.dot(t),
      o = this.elements["damage-direction"].style;
    ((o.borderTopColor = i > 0.4 ? "#ff3325" : "transparent"),
      (o.borderBottomColor = i < -0.4 ? "#ff3325" : "transparent"),
      (o.borderLeftColor = a > 0.4 ? "#ff3325" : "transparent"),
      (o.borderRightColor = a < -0.4 ? "#ff3325" : "transparent"));
  }
  announce(t) {
    ((this.elements.announcement.textContent = t), (this.announcementTime = 3));
  }
  notify(t) {
    const e = document.createElement("div");
    ((e.textContent = t),
      this.elements.notifications.append(e),
      this.messages.push({ element: e, time: 3 }),
      this.messages.length > 6 && this.messages.shift().element.remove());
  }
  toggleDebug() {
    ((this.debugVisible = !this.debugVisible),
      (this.elements.debug.hidden = !this.debugVisible));
  }
  reset() {
    ((this.messages = []),
      this.elements.notifications.replaceChildren(),
      (this.damageOpacity = 0),
      (this.directionOpacity = 0),
      (this.announcementTime = 0),
      (this.hitTime = 0),
      (this.crosshairKick = this.gap = 6));
  }
}
class es {
  constructor(t) {
    ((this.canvas = t),
      (this.state = new be()),
      (this.physics = new xe()),
      (this.navigation = new Ut(this.physics)),
      (this.renderer = new pe({
        canvas: t,
        antialias: !0,
        powerPreference: "high-performance",
      })),
      this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5)),
      this.renderer.setSize(innerWidth, innerHeight),
      (this.renderer.shadowMap.enabled = !0),
      (this.renderer.shadowMap.type = de),
      (this.renderer.toneMapping = ue),
      (this.renderer.toneMappingExposure = 1.1),
      (this.renderer.autoClear = !1),
      (this.scene = new It()),
      (this.assets = new ve(this.renderer)),
      (this.enemies = []),
      (this.pickups = []),
      (this.scheduled = []),
      (this.noCapture = !!q("no-capture", !1)),
      (this.startGeneration = 0),
      (this.hud = new ts(this)),
      (this.input = new ke(t, this)),
      (this.ready = !1),
      (this.lastTime = 0),
      (this.fps = 60),
      (this.starting = !1),
      window.addEventListener("resize", () => this.resize()),
      t.addEventListener("webglcontextlost", (e) => {
        (e.preventDefault(),
          this.pause(),
          this.hud.notify("WebGL-контекст потерян. Обновите страницу."));
      }));
  }
  async initialize(t) {
    (await this.assets.load(t),
      (this.effects = new Qe(this)),
      (this.arena = new Ie(this)),
      (this.player = new Oe(this)),
      (this.weapons = new Be(this)),
      (this.spawner = new Ye(this)),
      this.hud.buildSlots(),
      (this.shaderWarmModels = new S()));
    for (const e of ["mouse", "rat", "capybara"]) {
      const s = this.assets.instantiate(
        e,
        e === "mouse"
          ? { size: 0.58, rotation: [0, 180, 0], uniqueMaterials: !0 }
          : {},
      );
      s &&
        (e === "mouse" && (this.shaderWarmMouse = new jt(s)),
        this.shaderWarmModels.add(s));
    }
    (this.scene.add(this.shaderWarmModels),
      await this.effects.prepare(),
      (this.shaderWarmModels.position.z = -2),
      this.renderer.clear(),
      this.renderer.render(this.scene, this.player.camera),
      (this.shaderWarmModels.visible = !1),
      this.weapons.models.forEach((e) => {
        e.visible = !0;
      }),
      (this.weapons.flashMesh.visible = !0));
    try {
      await this.renderer.compileAsync(this.weapons.scene, this.weapons.camera);
    } finally {
      (this.weapons.setVisibility(), (this.weapons.flashMesh.visible = !1));
    }
    ((this.ready = !0), this.renderer.setAnimationLoop((e) => this.frame(e)));
  }
  async start(t = !1) {
    if (!this.ready || this.starting || document.hidden) return;
    this.starting = !0;
    const e = ++this.startGeneration;
    (t &&
      ((this.scheduled = []),
      this.enemies.forEach((s) => s.dispose()),
      (this.enemies = []),
      this.pickups.forEach((s) => s.dispose()),
      (this.pickups = []),
      this.effects.clear(),
      this.state.reset(),
      this.player.reset(),
      this.weapons.reset(),
      this.spawner.reset(),
      this.arena.reset(),
      this.hud.reset(),
      this.spawner.start()),
      this.input.clear(),
      (this.state.status = "paused"),
      this.hud.showState());
    try {
      if (
        ((document.getElementById("pointer-error").hidden = !0),
        this.noCapture || (await this.input.lock()),
        e !== this.startGeneration || document.hidden)
      )
        return;
      (this.canvas.focus({ preventScroll: !0 }),
        this.input.clear(),
        (this.lastTime = performance.now()),
        (this.state.status = "playing"),
        this.hud.showState());
    } catch (s) {
      if (e !== this.startGeneration || s.name === "AbortError") return;
      ((this.state.status = "paused"), this.hud.showState());
      const i = document.getElementById("pointer-error");
      ((i.hidden = !1),
        (i.textContent =
          "Захват мыши недоступен в этом просмотре. Можно выбрать режим без захвата ниже или открыть игру в обычном браузере."),
        console.info("Pointer lock unavailable:", s.message));
    } finally {
      e === this.startGeneration && (this.starting = !1);
    }
  }
  async resume() {
    this.state.status === "paused" && (await this.start(!1));
  }
  pause(t = !0) {
    (this.state.status !== "playing" && !this.starting) ||
      (this.startGeneration++,
      (this.starting = !1),
      this.input.cancelLock(),
      (this.state.status = "paused"),
      this.input.clear(),
      this.hud.showState(),
      t && this.input.unlock());
  }
  togglePause() {
    this.state.status === "playing" || this.starting
      ? this.pause()
      : this.state.status === "paused" && this.noCapture && this.resume();
  }
  toMenu() {
    (this.startGeneration++,
      (this.starting = !1),
      this.input.unlock(),
      (this.state.status = "menu"),
      this.input.clear(),
      this.hud.showState());
  }
  gameOver() {
    (this.startGeneration++,
      (this.starting = !1),
      this.input.unlock(),
      (this.state.status = "game-over"),
      this.input.clear(),
      this.hud.showState());
  }
  schedule(t, e) {
    this.scheduled.push({ delay: t, callback: e });
  }
  frame(t) {
    const e = this.lastTime ? (t - this.lastTime) / 1e3 : 0.016666666666666666;
    this.lastTime = t;
    const s = Math.min(0.05, Math.max(0, e));
    if (
      ((this.fps += ((e > 0 ? 1 / e : this.fps) - this.fps) * 0.05),
      this.state.status === "playing")
    ) {
      const i = [];
      for (let a = this.scheduled.length - 1; a >= 0; a--)
        ((this.scheduled[a].delay -= s),
          this.scheduled[a].delay <= 0 &&
            i.push(this.scheduled.splice(a, 1)[0].callback));
      if ((i.forEach((a) => a()), this.state.status === "playing")) {
        (this.player.update(s),
          this.weapons.update(s),
          this.navigation.beginFrame());
        for (const a of this.enemies) a.update(s);
        this.enemies = this.enemies.filter((a) => !a.removed);
        for (const a of this.pickups) a.update(s);
        ((this.pickups = this.pickups.filter((a) => !a.removed)),
          this.spawner.update(s),
          this.effects.update(s),
          this.arena.update(s));
      }
    }
    (this.hud.update(this.state.status === "playing" ? s : 0, this.fps),
      this.renderer.clear(),
      this.renderer.render(this.scene, this.player.camera),
      this.state.status !== "menu" &&
        (this.renderer.clearDepth(),
        this.renderer.render(this.weapons.scene, this.weapons.camera)),
      this.input.endFrame());
  }
  resize() {
    this.renderer.setSize(innerWidth, innerHeight);
    for (const t of [this.player?.camera, this.weapons?.camera])
      t && ((t.aspect = innerWidth / innerHeight), t.updateProjectionMatrix());
  }
}
const it = document.getElementById("load-status"),
  ss = document.getElementById("load-progress"),
  at = document.getElementById("start");
async function is() {
  try {
    const c = new es(document.getElementById("game"));
    (await c.initialize((t, e) => {
      ((ss.value = t),
        (it.textContent = `Загрузка ресурсов: ${Math.round(t * 100)}% · ${e}`));
    }),
      (it.textContent = c.assets.warnings.length
        ? `Арена готова · резервных ресурсов: ${c.assets.warnings.length}`
        : "Арена готова · можно начинать"),
      (at.disabled = !1),
      (at.textContent = "Начать игру"),
      (window.rodentGame = c));
  } catch (c) {
    (console.error(c), (it.textContent = "Не удалось запустить игру"));
    const t = document.getElementById("menu-error");
    ((t.hidden = !1),
      (t.textContent = `Проверьте поддержку WebGL 2 и запуск через локальный сервер (npm run dev). ${c.message}`),
      (at.textContent = "Запуск недоступен"));
  }
}
is();
