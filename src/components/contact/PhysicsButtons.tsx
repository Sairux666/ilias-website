'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Engine,
  Runner,
  Bodies,
  Composite,
  Mouse,
  MouseConstraint,
  Events,
  Body,
  Vector,
  type IMouseConstraintDefinition,
} from 'matter-js'

const LABELS = ['Reach out', 'Send a message', "Let's chat", 'Say hi'] as const

// Calm, contained physics tuning.
const MAX_SPEED = 18 // px/step — caps how fast a fling can travel (no tunneling)

/* Four large draggable/throwable pill buttons driven by Matter.js. The pills are
   real styled DOM buttons; each frame their transform is synced to a physics
   body. Clicking (grab + release without flinging) opens the contact form. */
export function PhysicsButtons({ onSelect }: { onSelect: () => void }) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([])
  const onSelectRef = useRef(onSelect)
  onSelectRef.current = onSelect
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return
    let cancelled = false
    let cleanup = () => {}

    const setup = async () => {
      // Measure pills after fonts load so the physics bodies match the labels.
      if (typeof document !== 'undefined' && document.fonts?.ready) {
        try {
          await document.fonts.ready
        } catch {}
      }
      if (cancelled || !sceneRef.current) return

      const bounds = { w: scene.clientWidth, h: scene.clientHeight }

      const engine = Engine.create()
      engine.gravity.y = 1.035 // +15% — heavier, falls a touch faster
      // More solver iterations → stable stacking + fewer escapes.
      engine.positionIterations = 10
      engine.velocityIterations = 10
      const world = engine.world

      // Build a body per pill, sized to the measured DOM pill. Calm material:
      // low bounce, high friction + air drag.
      const pills = pillRefs.current.slice(0, LABELS.length)
      const sizes: { w: number; h: number }[] = []
      const bodies = pills.map((el, i) => {
        const r = el?.getBoundingClientRect()
        const w = Math.round(r?.width || 330)
        const h = Math.round(r?.height || 108)
        sizes[i] = { w, h }
        const x = 40 + w / 2 + Math.random() * Math.max(bounds.w - w - 80, 1)
        const y = -160 - i * 150 // drop in from above, staggered
        const body = Bodies.rectangle(x, y, w, h, {
          chamfer: { radius: h / 2 }, // pill collision shape matches the DOM pill
          restitution: 0.55, // bouncier off walls + each other
          friction: 0.6,
          frictionAir: 0.04,
          density: 0.0014,
        })
        body.label = LABELS[i]
        return body
      })

      // Thick static walls on all four sides (belt; the clamp below is suspenders).
      const t = 400
      const makeWalls = (w: number, h: number) => [
        Bodies.rectangle(w / 2, h + t / 2, w + t * 2, t, { isStatic: true }), // floor
        Bodies.rectangle(w / 2, -t / 2, w + t * 2, t, { isStatic: true }), // ceiling
        Bodies.rectangle(-t / 2, h / 2, t, h + t * 2, { isStatic: true }), // left
        Bodies.rectangle(w + t / 2, h / 2, t, h + t * 2, { isStatic: true }), // right
      ]
      const walls = makeWalls(bounds.w, bounds.h)
      Composite.add(world, [...walls, ...bodies])

      // Drag/throw via mouse. Strip wheel listeners so page (Lenis) scroll works
      // when the cursor is over the container.
      const mouse = Mouse.create(scene)
      const wheel = (mouse as unknown as { mousewheel: EventListener }).mousewheel
      scene.removeEventListener('wheel', wheel)
      scene.removeEventListener('mousewheel', wheel)
      scene.removeEventListener('DOMMouseScroll', wheel)
      const mc = MouseConstraint.create(engine, {
        // Gentle grab → calmer release velocity.
        mouse,
        constraint: { stiffness: 0.08, damping: 0.1, render: { visible: false } },
      } as IMouseConstraintDefinition)
      Composite.add(world, mc)

      // Disable text selection globally while dragging (fixes highlight bug).
      let down: { pos: Vector; t: number } | null = null
      Events.on(mc, 'startdrag', () => {
        document.body.style.userSelect = 'none'
        down = { pos: { ...mouse.position }, t: performance.now() }
      })
      const endDrag = () => {
        document.body.style.userSelect = ''
      }
      Events.on(mc, 'enddrag', endDrag)
      Events.on(mc, 'mouseup', () => {
        endDrag()
        if (down) {
          const moved = Vector.magnitude(Vector.sub(mouse.position, down.pos))
          if (moved < 6 && performance.now() - down.t < 350) onSelectRef.current()
          down = null
        }
      })

      // Per-frame: cap speed (no tunneling) + hard-clamp inside the box (no escape).
      const constrain = () => {
        for (let i = 0; i < bodies.length; i++) {
          const b = bodies[i]
          const { w, h } = sizes[i]
          // speed cap
          const v = b.velocity
          const sp = Math.hypot(v.x, v.y)
          if (sp > MAX_SPEED) {
            Body.setVelocity(b, { x: (v.x / sp) * MAX_SPEED, y: (v.y / sp) * MAX_SPEED })
          }
          // position clamp with gentle bounce-back
          const minX = w / 2
          const maxX = bounds.w - w / 2
          const minY = h / 2
          const maxY = bounds.h - h / 2
          let { x, y } = b.position
          let vx = b.velocity.x
          let vy = b.velocity.y
          let hit = false
          if (maxX >= minX) {
            if (x < minX) {
              x = minX
              vx = Math.abs(vx) * 0.3
              hit = true
            } else if (x > maxX) {
              x = maxX
              vx = -Math.abs(vx) * 0.3
              hit = true
            }
          } else {
            x = bounds.w / 2
            hit = true
          }
          if (maxY >= minY) {
            if (y < minY) {
              y = minY
              vy = Math.abs(vy) * 0.3
              hit = true
            } else if (y > maxY) {
              y = maxY
              vy = -Math.abs(vy) * 0.3
              hit = true
            }
          }
          if (hit) {
            Body.setPosition(b, { x, y })
            Body.setVelocity(b, { x: vx, y: vy })
          }
        }
      }

      const sync = () => {
        for (let i = 0; i < bodies.length; i++) {
          const el = pills[i]
          if (!el) continue
          const b = bodies[i]
          const { w, h } = sizes[i]
          el.style.transform = `translate(${b.position.x - w / 2}px, ${b.position.y - h / 2}px) rotate(${b.angle}rad)`
        }
      }
      const onAfterUpdate = () => {
        constrain()
        sync()
      }
      Events.on(engine, 'afterUpdate', onAfterUpdate)
      sync()
      setReady(true)

      // Only run the simulation while the footer is on screen (performance).
      const runner = Runner.create()
      let running = false
      const startRun = () => {
        if (!running) {
          Runner.run(runner, engine)
          running = true
        }
      }
      const stopRun = () => {
        if (running) {
          Runner.stop(runner)
          running = false
        }
      }
      const io = new IntersectionObserver(
        (entries) => (entries[0].isIntersecting ? startRun() : stopRun()),
        { threshold: 0.05 }
      )
      io.observe(scene)

      // Keep bounds + walls in sync with container size on resize.
      const onResize = () => {
        if (!sceneRef.current) return
        bounds.w = sceneRef.current.clientWidth
        bounds.h = sceneRef.current.clientHeight
        Body.setPosition(walls[0], { x: bounds.w / 2, y: bounds.h + t / 2 })
        Body.setPosition(walls[1], { x: bounds.w / 2, y: -t / 2 })
        Body.setPosition(walls[2], { x: -t / 2, y: bounds.h / 2 })
        Body.setPosition(walls[3], { x: bounds.w + t / 2, y: bounds.h / 2 })
      }
      window.addEventListener('resize', onResize)

      cleanup = () => {
        io.disconnect()
        window.removeEventListener('resize', onResize)
        Events.off(engine, 'afterUpdate', onAfterUpdate)
        document.body.style.userSelect = ''
        stopRun()
        Composite.clear(world, false)
        Engine.clear(engine)
      }
    }

    setup()
    return () => {
      cancelled = true
      cleanup()
    }
  }, [])

  return (
    <div
      ref={sceneRef}
      className="relative w-full h-[520px] md:h-[720px] overflow-hidden select-none"
      aria-label="Throwable contact buttons"
    >
      {LABELS.map((label, i) => (
        <button
          key={label}
          type="button"
          ref={(el) => {
            pillRefs.current[i] = el
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onSelect()
            }
          }}
          aria-label={`${label} — open contact form`}
          style={{ transform: 'translate(-400px,-400px)', WebkitUserSelect: 'none', userSelect: 'none' }}
          className={`absolute top-0 left-0 will-change-transform select-none cursor-grab active:cursor-grabbing touch-none rounded-full bg-neutral-100 text-neutral-900 font-bold tracking-tight text-[clamp(30px,3.9vw,60px)] px-12 lg:px-[72px] py-6 lg:py-9 whitespace-nowrap shadow-xl transition-opacity duration-500 ${
            ready ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
