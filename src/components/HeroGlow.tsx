"use client";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

/* Animated background lights for page heroes, in Sylvara brand blues.
   Replaces the old static .glow-blob radial gradients.
   Extends to 2× the hero height and fades out with a mask so the
   lights blend smoothly into the page below instead of cutting off. */
export function HeroGlow() {
  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgb(6, 14, 58)"
      gradientBackgroundEnd="rgb(6, 14, 58)"
      firstColor="37, 99, 235"
      secondColor="96, 165, 250"
      thirdColor="59, 130, 246"
      fourthColor="29, 78, 216"
      fifthColor="147, 197, 253"
      pointerColor="96, 165, 250"
      size="100%"
      blendingValue="hard-light"
      interactive={true}
      containerClassName="absolute inset-x-0 top-0 h-[200%] w-full -z-10 pointer-events-none [mask-image:linear-gradient(to_bottom,black_40%,transparent_95%)]"
    />
  );
}
