import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import AnimatedStepper from "@/components/smoothui/animated-stepper";

function useNarrow() {
  const q = "(max-width: 767px)";
  const [n, setN] = useState(() => typeof window !== "undefined" && window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setN(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return n;
}

export function Flow({ steps }: { steps: string[] }) {
  const narrow = useNarrow();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!inView || !auto) return;
    if (reduce) { setStep(steps.length - 1); return; }
    if (step >= steps.length - 1) return;
    let t: ReturnType<typeof setTimeout> | undefined;
    const tick = () => {
      // advance only while the page is visible, so the step panel never lags behind
      if (document.visibilityState === "visible") t = setTimeout(() => setStep((s) => s + 1), 1100);
    };
    tick();
    document.addEventListener("visibilitychange", tick);
    return () => { clearTimeout(t); document.removeEventListener("visibilitychange", tick); };
  }, [inView, auto, step, steps.length, reduce]);

  return (
    <div ref={ref}>
      <AnimatedStepper
        allowClickNavigation
        variant={narrow ? "vertical" : "horizontal"}
        currentStep={step}
        onStepChange={(s) => { setAuto(false); setStep(s); }}
        steps={steps.map((label, i) => ({ label: `${String(i + 1).padStart(2, "0")}`, description: label, content: <p className="font-display text-xl">{label}</p> }))}
      />
    </div>
  );
}
