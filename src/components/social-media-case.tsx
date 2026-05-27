import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, useSpring, AnimatePresence, useMotionValue } from "framer-motion";
import { Play, X } from "lucide-react";
import { ProjectMedia } from "./project-media";

// --- Utility: Specialized Counter ---
function Counter({ target, label, suffix = "" }: { target: number; label: string; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const spring = useSpring(0, { stiffness: 40, damping: 20 });
  const display = useTransform(spring, (current) => Math.floor(current).toLocaleString());

  useEffect(() => {
    if (isInView) {
      spring.set(target);
    }
  }, [isInView, spring, target]);

  return (
    <div ref={ref} className="text-left py-4 md:py-6">
      <motion.span className="text-[12vw] md:text-[6vw] font-bold tracking-tighter block leading-none text-current">
        <motion.span>{display}</motion.span>{suffix}
      </motion.span>
      <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-current opacity-70 mt-2 block">{label}</span>
    </div>
  );
}

// --- Section 1: Performance Overview ---
export function PerformanceHero({ 
  followers, 
  contentCount, 
  mockupImg,
  followersLabel = "Seguidores",
  contentLabel = "Conteúdos Criados",
  accentColor,
  title = "Resultados reais que geram autoridade e conexão.",
  description = "A estratégia de social media foi desenhada para ir além de posts avulsos, focando em posicionamento estratégico, crescimento orgânico e construção de presença a longo prazo."
}: { 
  followers: number; 
  contentCount?: number; 
  mockupImg: string;
  anchorText?: string;
  followersLabel?: string;
  contentLabel?: string;
  accentColor?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section className="min-h-[70vh] w-full flex flex-col justify-center site-section border-none bg-background overflow-hidden py-16 md:py-28">
      <div className="site-container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
        <div className="lg:col-span-6 z-10 order-2 lg:order-1 space-y-8">
          <div className="space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-secondary">Métricas de Impacto</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.1]">
              {title}
            </h2>
            <p className="text-base text-secondary font-medium leading-relaxed max-w-md">
              {description}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 border-t border-border/50 pt-8">
            <div style={accentColor ? { color: accentColor } : {}}>
              <Counter target={followers} label={followersLabel} />
            </div>
            {contentCount !== undefined && (
              <div style={accentColor ? { color: accentColor } : {}}>
                <Counter target={contentCount} label={contentLabel} suffix="+" />
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-6 relative h-auto flex items-center justify-center lg:justify-end order-1 lg:order-2">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-border/10 shadow-lg"
          >
             <ProjectMedia src={mockupImg} alt="Performance Mockup" className="w-full h-auto object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// --- Section 2: Copy Feature ---
export function CopyFeature({ 
  headline, 
  mockupImg, 
  bgImage,
  accentColor = "rgba(0,0,0,0.95)",
  contentCount,
  contentLabel = "Conteúdos Criados",
  description = "Desenvolvimento de narrativas estratégicas e redação focada em conversão. O copywriting foi desenhado para educar o público-alvo, quebrar objeções comuns de mercado e direcionar o tráfego de maneira qualificada."
}: { 
  headline: string; 
  mockupImg: string;
  bgImage?: string;
  accentColor?: string;
  contentCount?: number;
  contentLabel?: string;
  description?: string;
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section 
      ref={containerRef}
      className="site-section flex flex-col justify-center overflow-hidden relative py-20 md:py-32 bg-off-white border-y border-border/10"
    >
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <ProjectMedia src={bgImage} alt="Background Texture" className="opacity-10 object-cover w-full h-full" />
          <div className="absolute inset-0 bg-background/80" />
        </div>
      )}

      <div className="site-container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-secondary">Narrativa & Copywriting</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.1]">
              {headline}
            </h2>
            <p className="text-base text-secondary font-medium leading-relaxed max-w-md">
              {description}
            </p>
          </div>
          
          {contentCount !== undefined && (
            <div className="border-t border-border/50 pt-8">
              <Counter target={contentCount} label={contentLabel} suffix="+" />
            </div>
          )}
        </div>

        <div className="lg:col-span-6 flex items-center justify-center lg:justify-end">
          <motion.div 
            style={{ y }}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-border/10 shadow-lg bg-background"
          >
            <ProjectMedia src={mockupImg} alt="Copy Showcase" className="w-full h-auto object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// --- Section 3: Feed Timeline ---
export function FeedTimeline({ 
  states, 
  title = "Feed Evolution" 
}: { 
  states: { label: string; posts: string[] }[];
  title?: string;
}) {
  const [activeState, setActiveState] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        setCursorPos({ x: e.clientX, y: e.clientY });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="site-section bg-background overflow-hidden relative py-24"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <AnimatePresence>
        {isHovering && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed w-20 h-20 rounded-full border border-foreground flex items-center justify-center z-50 pointer-events-none mix-blend-difference"
            style={{ left: cursorPos.x - 40, top: cursorPos.y - 40 }}
          >
            <span className="text-[10px] font-mono text-white uppercase font-bold">Ver</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="site-container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
 <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">{title}</h2>
          </div>
          
          <div className="flex border-b border-border w-full md:w-auto">
            {states.map((state, i) => (
              <button 
                key={i}
                onClick={() => setActiveState(i)}
                className={`px-5 py-3 text-[10px] font-mono uppercase tracking-widest transition-all relative ${activeState === i ? 'text-foreground font-bold' : 'text-secondary hover:text-foreground'}`}
              >
                {state.label}
                {activeState === i && (
                  <motion.div layoutId="timeline-active" className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {states[activeState].posts.map((post, i) => (
              <motion.div 
                key={`${activeState}-${i}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="relative group rounded-xl overflow-hidden"
              >
                <ProjectMedia src={post} alt="Feed Post" className="w-full h-auto drop-shadow-md" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 text-center bg-background/20 backdrop-blur-sm">
                   <p className="text-foreground text-[10px] font-mono uppercase tracking-tighter leading-tight font-bold">
                     {states[activeState].label}
                   </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// --- Section 3.5: Live Art Gallery (Interactive 3-Image) ---
export function LiveArtGallery({ 
  sections 
}: { 
  sections: { 
    title: string; 
    image: string; 
    layout: 'top' | 'bottom';
  }[] 
}) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="site-section bg-background overflow-hidden border-none pt-24 pb-32 md:pb-48">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory md:grid md:grid-cols-3 gap-6 md:gap-16 items-start">
          {sections.map((section, idx) => (
            <div 
              key={idx} 
              className={`flex-none w-[80vw] md:w-auto snap-center flex flex-col ${idx === 1 ? 'md:mt-24' : ''}`}
            >
              {section.layout === 'top' && (
                <motion.h3 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-[10px] font-mono uppercase tracking-widest mb-6 text-secondary"
                >
                  {section.title}
                </motion.h3>
              )}
              
              <InteractiveImage 
                src={section.image} 
                onClick={() => setExpandedIndex(idx)} 
                index={idx}
              />

              {section.layout === 'bottom' && (
                <motion.h3 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-[10px] font-mono uppercase tracking-widest mt-6 text-secondary"
                >
                  {section.title}
                </motion.h3>
              )}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {expandedIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setExpandedIndex(null)}
          >
            <button 
              className="absolute top-8 right-8 p-4 bg-foreground text-background transition-transform hover:scale-110 z-[101] cursor-pointer"
              onClick={(e) => { e.stopPropagation(); setExpandedIndex(null); }}
            >
              <X size={24} />
            </button>
            <motion.img 
              layoutId={`gallery-img-${expandedIndex}`}
              src={sections[expandedIndex].image}
              className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function InteractiveImage({ src, onClick, index }: { src: string; onClick: () => void; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      className="relative cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ rotateX, rotateY, perspective: 1000 }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <MotionProjectMedia 
        layoutId={`gallery-img-${index}`}
        src={src} 
        alt="" 
        className="w-full h-auto shadow-lg border border-border/10 rounded-xl transition-all duration-700" 
      />
    </motion.div>
  );
}

// --- Section 4: Video Gallery ---
export function VideoGallery({ 
  videos 
}: { 
  videos: { url: string; category: string; poster?: string }[] 
}) {
  return (
    <section className="site-section bg-background overflow-hidden py-24">
      <div className="site-container">
        <div className="mb-16">
 <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Conteúdo em Movimento</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[700px]">
          {videos.map((video, i) => {
            const colSpan = i === 0 ? "md:col-span-8" : i === 1 ? "md:col-span-4" : i === 2 ? "md:col-span-4" : "md:col-span-8";
            const rowSpan = i === 0 ? "md:row-span-2" : "";

            return (
              <VideoCard 
                key={i} 
                video={video} 
                className={`${colSpan} ${rowSpan}`} 
                delay={i * 0.1}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

// --- Section 4.5: Reels Showcase (4-Column / Carousel) ---
export function ReelsShowcase({ 
  videos,
  headline,
  subheadline
}: { 
  videos: { url: string; category: string; poster?: string }[];
  headline: string;
  subheadline: string;
}) {
  return (
    <section className="site-section bg-background overflow-hidden border-none pt-16 pb-24 md:pt-20 md:pb-32">
      <div className="site-container">
        <div className="max-w-3xl mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-[1.1] mb-4"
          >
            {headline}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
 className="text-sm md:text-base text-secondary font-medium leading-relaxed max-w-xl"
          >
            {subheadline}
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
          {videos.map((video, i) => (
            <VideoCard 
              key={i} 
              video={video} 
              className="w-full" 
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoCard({ 
  video, 
  className, 
  delay 
}: { 
  video: { url: string; category: string; poster?: string }; 
  className: string;
  delay: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    videoRef.current?.pause();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={`relative group rounded-xl overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video 
        ref={videoRef}
        src={video.url}
        poster={video.poster}
        muted
        loop
        playsInline
        className="w-full h-auto transition-all duration-700 drop-shadow-lg"
      />
      
      <div className="absolute top-5 left-5 flex items-center gap-2 z-10">
        <div className="bg-white/10 backdrop-blur px-3 py-1 rounded-full flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full bg-[#FF6B00] ${isHovered ? 'animate-pulse' : ''}`} />
          <span className="text-[7px] font-mono text-white uppercase tracking-widest">{video.category}</span>
        </div>
      </div>

      {!isHovered && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur flex items-center justify-center border border-white/10">
             <Play size={16} className="text-white fill-white ml-0.5" />
          </div>
        </div>
      )}
    </motion.div>
  );
}

// --- Section 3.6: Single Image Showcase (Immersive) ---
const MotionProjectMedia = motion(ProjectMedia);

export function SingleImageShowcase({ src }: { src: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section 
      ref={containerRef}
      className="site-section bg-background overflow-hidden border-none py-0 md:h-[90vh] flex items-center justify-center relative cursor-zoom-in"
      onClick={() => setIsExpanded(true)}
    >
      <div className="w-full h-[50vh] md:h-full relative overflow-hidden">
        <MotionProjectMedia 
          src={src} 
          alt="Showcase"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]) }}
          className="absolute inset-0 w-full h-[120%] object-cover transition-all duration-700"
        />
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
          >
            <button 
              className="absolute top-8 right-8 p-4 bg-foreground text-background transition-transform hover:scale-110 z-[101] cursor-pointer"
              onClick={() => setIsExpanded(false)}
            >
              <X size={24} />
            </button>
            <motion.img 
              src={src}
              className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// --- Section 5: Scroll Horizontal Gallery ---
export function ScrollHorizontalGallery({ images }: { images: string[] }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} className="site-section bg-background overflow-hidden border-none py-16 md:py-32 flex flex-col gap-8 md:gap-12">
      {images.map((src, idx) => {
        const x = useTransform(scrollYProgress, [0, 1], idx % 2 === 0 ? ["0%", "-20%"] : ["-20%", "0%"]);
        return (
          <div key={idx} className="relative w-[180vw] lg:w-[140vw] h-[35vh] md:h-[65vh] flex">
            <motion.div style={{ x }} className="flex w-full h-full px-4 gap-4 md:gap-6">
              {[...Array(4)].map((_, i) => (
                <img key={i} src={src} className="w-[85vw] md:w-[55vw] h-full object-cover transition-all duration-700 shadow-xl rounded-xl" alt="Gallery item" />
              ))}
            </motion.div>
          </div>
        );
      })}
    </section>
  );
}
