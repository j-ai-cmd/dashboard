import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import ScrollProgress from "@/components/smoothui/scroll-progress";
import { Sidebar } from "@/components/app/Sidebar";
import { BuildView, FunctionView, Overview } from "@/components/app/Views";
import { PROFILE } from "@/content";
import { useHashRoute } from "@/useHashRoute";

export default function App() {
  const route = useHashRoute();
  const [open, setOpen] = useState(false);
  const key = JSON.stringify(route);
  useEffect(() => setOpen(false), [key]);

  return (
    <MotionConfig reducedMotion="user">
      <svg width="0" height="0" className="absolute" aria-hidden>
        <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="7" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
      </svg>
      <div className="grain" aria-hidden />
      <div className="relative z-10 min-h-screen lg:grid lg:grid-cols-[320px_1fr]">
        <aside className="sticky top-0 hidden h-screen border-r border-line lg:block"><Sidebar route={route} /></aside>

        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-background/95 px-4 py-3 lg:hidden">
          <a href="#/" className="font-display text-xl">{PROFILE.name}</a>
          <button type="button" aria-label="Open index" onClick={() => setOpen(true)} className="grid size-11 cursor-pointer place-items-center rounded-xl border border-line"><Menu className="size-5" /></button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div className="fixed inset-0 z-40 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="absolute inset-0 bg-foreground/30" onClick={() => setOpen(false)} />
              <motion.aside className="absolute inset-y-0 left-0 w-[88%] max-w-[340px] bg-background" initial={{ x: -24 }} animate={{ x: 0 }} exit={{ x: -24 }} transition={{ duration: 0.25 }}>
                <button type="button" aria-label="Close index" onClick={() => setOpen(false)} className="absolute right-3 top-3 grid size-11 cursor-pointer place-items-center rounded-xl"><X className="size-5" /></button>
                <Sidebar route={route} onNavigate={() => setOpen(false)} />
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>

        <main id="main" className="min-w-0">
          <ScrollProgress variant="bar" position="top" thickness={3} />
          <AnimatePresence mode="wait">
            <motion.div key={key} className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-10"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, transition: { duration: 0.12 } }} transition={{ duration: 0.25 }}>
              {route.view === "overview" && <Overview />}
              {route.view === "function" && <FunctionView fnId={route.fn} />}
              {route.view === "build" && <BuildView id={route.id} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </MotionConfig>
  );
}
