"use client";

import { useFrame, useThree, createRoot, extend } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Mesh, PlaneGeometry, ShaderMaterial } from "three";

extend({ Mesh, PlaneGeometry, ShaderMaterial });

// Vertex shader that maps a plane to cover the full screen
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// Fragment shader that generates the liquid glass effect
const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec3 u_color_bg;
  uniform vec3 u_color_primary;
  uniform vec3 u_color_secondary;

  varying vec2 vUv;

  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    
    // Correct for aspect ratio
    float aspect = u_resolution.x / u_resolution.y;
    uv.x *= aspect;
    
    // Create layered, slow-moving fluid noise
    float n1 = snoise(uv * 1.2 + u_time * 0.02);
    float n2 = snoise(uv * 2.5 - u_time * 0.04 + n1 * 0.4);
    float n3 = snoise(uv * 0.6 + u_time * 0.01 + n2 * 0.2);
    
    float final_noise = n3 * 0.5 + 0.5;
    
    // Liquid glass effect: create smooth bands/refraction lines
    float bands = sin(final_noise * 12.0 + u_time * 0.05);
    bands = smoothstep(-0.6, 0.6, bands);
    
    // Base color is the background
    vec3 color = u_color_bg;
    
    // Mix in the primary highlight color (Apple Blue)
    color = mix(color, u_color_primary, final_noise * 0.5);
    
    // Mix in the secondary depth color based on bands
    color = mix(color, u_color_secondary, bands * 0.15);
    
    // Subtle specular highlight for the "glass" look
    float specular = pow(max(0.0, bands), 12.0) * 0.15;
    color += vec3(specular);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

function BackgroundMesh() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size, gl } = useThree();

  // Initialize uniforms with default values
  const [uniforms] = useState(() => ({
    u_time: { value: 0 },
    u_resolution: {
      value: new THREE.Vector2(
        typeof window !== "undefined" ? window.innerWidth : 1000,
        typeof window !== "undefined" ? window.innerHeight : 1000,
      ),
    },
    u_color_bg: { value: new THREE.Color("#FFFCFC") },
    u_color_primary: { value: new THREE.Color("#007AFF") },
    u_color_secondary: { value: new THREE.Color("#E5E5EA") },
  }));

  // Update resolution and canvas size when size changes
  useEffect(() => {
    gl.setSize(size.width, size.height);
    uniforms.u_resolution.value.set(size.width, size.height);
  }, [size, uniforms, gl]);

  // Read CSS variables and handle theme reactivity
  useEffect(() => {
    const cssColorToRgb = (cssColor: string) => {
      if (typeof window === "undefined") return { r: 1, g: 1, b: 1 };
      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext("2d");
      if (!ctx) return { r: 1, g: 1, b: 1 };
      ctx.fillStyle = cssColor;
      ctx.fillRect(0, 0, 1, 1);
      const data = ctx.getImageData(0, 0, 1, 1).data;
      return { r: data[0] / 255, g: data[1] / 255, b: data[2] / 255 };
    };

    const readColors = () => {
      if (typeof window === "undefined") return;

      const style = getComputedStyle(document.documentElement);
      const bg = style.getPropertyValue("--background").trim();
      const primary =
        style.getPropertyValue("--apple-blue").trim() ||
        style.getPropertyValue("--primary").trim();

      const isDark = document.documentElement.classList.contains("dark");
      const secondary = isDark
        ? style.getPropertyValue("--apple-dark-gray-2").trim()
        : style.getPropertyValue("--apple-light-gray").trim();

      if (bg) {
        const rgb = cssColorToRgb(bg);
        uniforms.u_color_bg.value.setRGB(rgb.r, rgb.g, rgb.b);
      }
      if (primary) {
        const rgb = cssColorToRgb(primary);
        uniforms.u_color_primary.value.setRGB(rgb.r, rgb.g, rgb.b);
      }
      if (secondary) {
        const rgb = cssColorToRgb(secondary);
        uniforms.u_color_secondary.value.setRGB(rgb.r, rgb.g, rgb.b);
      }
    };

    // Initial read
    readColors();

    // Observe theme changes on the html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") readColors();
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [uniforms]);

  // Animation loop
  useFrame((_, delta) => {
    if (materialRef.current) materialRef.current.uniforms.u_time.value += delta;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

let globalCanvas: HTMLCanvasElement | null = null;
let globalRoot: ReturnType<typeof createRoot> | null = null;

interface LiquidGlassBackgroundProps {
  bottomFade?: boolean;
}

export default function LiquidGlassBackground({ bottomFade = false }: LiquidGlassBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const currentRef = ref.current;

    if (!globalCanvas) {
      globalCanvas = document.createElement("canvas");
      globalCanvas.style.width = "100%";
      globalCanvas.style.height = "100%";

      globalRoot = createRoot(globalCanvas);
      globalRoot.configure({
        camera: { fov: 90, position: [0, 0, 1] },
        size: { 
          width: currentRef ? currentRef.clientWidth : window.innerWidth, 
          height: currentRef ? currentRef.clientHeight : window.innerHeight, 
          top: 0, 
          left: 0 
        },
      });
      globalRoot.render(<BackgroundMesh />);
    }

    if (currentRef) currentRef.appendChild(globalCanvas);

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const { width, height } = entry.contentRect;
        globalRoot?.configure({
          size: { width, height, top: 0, left: 0 },
        });
      }
    });

    if (currentRef) resizeObserver.observe(currentRef);

    return () => {
      if (currentRef && globalCanvas) currentRef.removeChild(globalCanvas);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={ref} className="absolute inset-0 -z-10 w-full h-full" />
      {bottomFade && (
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-background to-transparent pointer-events-none -z-5" />
      )}
    </>
  );
}
