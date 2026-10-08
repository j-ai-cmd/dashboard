import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import AnimatedStepper from "@/components/smoothui/animated-stepper";

export function Flow({ steps }: { steps: string[] }) {
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
        variant="vertical" /* step text is too long for the horizontal layout */
        currentStep={step}
        onStepChange={(s) => { setAuto(false); setStep(s); }}
        steps={steps.map((label) => ({ label }))}
      />
    </div>
  );
}
