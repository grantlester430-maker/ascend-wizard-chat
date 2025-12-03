import { ShaderAnimation } from "@/components/ui/shader-animation";
import AnimatedShaderBackground from "@/components/ui/animated-shader-background";

const ShaderHero = () => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">
      <AnimatedShaderBackground />
      <ShaderAnimation />
      <span className="absolute pointer-events-none z-10 text-center text-5xl md:text-7xl leading-none font-semibold tracking-tighter whitespace-pre-wrap text-foreground">
        Ascend
      </span>
    </div>
  );
};

export default ShaderHero;
