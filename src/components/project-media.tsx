import { cn } from "@/lib/utils";
import React, { useRef, useEffect, useState } from "react";

interface ProjectMediaProps {
  src: string;
  alt: string;
  className?: string;
  isVisible?: boolean;
  style?: any;
  playGifOnHover?: boolean;
}

export function ProjectMedia({ src, alt, className, isVisible = true, style, playGifOnHover = false }: ProjectMediaProps) {
  const isVideo = src?.toLowerCase().endsWith(".mp4") || src?.toLowerCase().endsWith(".webm");
  const isGif = src?.toLowerCase().endsWith(".gif");
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frameCaptured, setFrameCaptured] = useState(false);

  useEffect(() => {
    if (isVideo && videoRef.current) {
      if (isVisible) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVisible, isVideo]);

  useEffect(() => {
    if (isGif && playGifOnHover && imgRef.current && canvasRef.current && !frameCaptured) {
      const img = imgRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      const captureFrame = () => {
        if (!ctx || frameCaptured) return;
        setTimeout(() => {
          canvas.width = img.naturalWidth || img.clientWidth || 800;
          canvas.height = img.naturalHeight || img.clientHeight || 600;
          if (canvas.width > 0 && canvas.height > 0) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            setFrameCaptured(true);
          }
        }, 50);
      };

      if (img.complete && img.naturalWidth > 0) {
        captureFrame();
      } else {
        img.addEventListener('load', captureFrame);
        return () => img.removeEventListener('load', captureFrame);
      }
    }
  }, [isGif, playGifOnHover, frameCaptured, src]);

  if (isVideo) {
    return (
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        style={style}
        className={cn("w-full h-full object-cover", className)}
      />
    );
  }

  if (isGif && playGifOnHover) {
    return (
      <>
        <canvas
          ref={canvasRef}
          style={style}
          className={cn("absolute inset-0 w-full h-full object-cover opacity-100 group-hover:opacity-0", className)}
        />
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading="lazy"
          style={style}
          className={cn("absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100", className)}
        />
      </>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      style={style}
      className={cn("w-full h-full object-cover", className)}
      loading="lazy"
    />
  );
}
