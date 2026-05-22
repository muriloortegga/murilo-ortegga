import { useState, useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Plus, X, ChevronRight, MessageCircle, Play } from "lucide-react";
import { ProjectMedia } from "./project-media";

// --- Components ---

export function Counter({ target, label }: { target: number, label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 50, damping: 30 });
  const display = useTransform(spring, (current) => Math.floor(current).toLocaleString());

  useEffect(() => {
    if (isInView) {
      spring.set(target);
    }
  }, [isInView, spring, target]);

  return (
    <div ref={ref} className="text-center p-12 border border-border bg-card rounded-xl">
      <motion.span className="text-6xl md:text-[10vw] font-bold tracking-tighter block leading-none">
        {display}
      </motion.span>
      <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-secondary mt-4 block">{label}</span>
    </div>
  );
}

export function SocialHero({ 
  client, 
  phrase, 
  image 
}: { 
  client: string, 
  niche: string, 
  phrase: string, 
  image: string 
}) {
  return (
    <section className="site-section pt-24 pb-16">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
 <h1 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-8">
              {client} - <br />
              <span className="text-secondary font-medium italic">{phrase}</span>
            </h1>
          </div>
          <div className="lg:col-span-5">
            <div className="aspect-[4/3] overflow-hidden shadow-2xl rounded-2xl">
              <img src={image} alt={client} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BeforeAfter({ 
  targetFollowers, 
  beforeImg, 
  afterImg 
}: { 
  targetFollowers: number, 
  beforeImg: string, 
  afterImg: string 
}) {
  return (
    <section className="site-section bg-off-white py-24">
      <div className="site-container">
        <div className="mb-16">
 <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Crescimento Exponencial</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
           <div className="lg:col-span-8">
              <Counter target={targetFollowers} label="Seguidores Alcançados" />
           </div>
           <div className="lg:col-span-4 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                 <span className="text-[10px] font-mono uppercase opacity-40">Start</span>
                 <div className="aspect-[9/16] border border-border overflow-hidden bg-background rounded-xl">
                    <img src={beforeImg} alt="Before" className="w-full h-full object-cover grayscale" />
                 </div>
              </div>
              <div className="space-y-4">
                 <span className="text-[10px] font-mono uppercase text-green-600">Growth</span>
                 <div className="aspect-[9/16] border border-border overflow-hidden bg-background shadow-xl rounded-xl">
                    <img src={afterImg} alt="After" className="w-full h-full object-cover" />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}

export function TopPosts({ posts }: { posts: { img: string, context: string, stats: string }[] }) {
  return (
    <section className="site-section py-24">
      <div className="site-container">
        <div className="mb-16">
 <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Performance de Elite</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {posts.map((post, i) => (
            <div key={i} className="space-y-6 group">
               <div className="aspect-square overflow-hidden bg-card border border-border rounded-xl">
                  <img src={post.img} alt="Post" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
               </div>
               <div className="space-y-2">
                  <p className="text-[10px] font-mono uppercase tracking-tight text-secondary leading-tight">{post.context}</p>
 <p className="text-lg font-bold tracking-tighter">{post.stats}</p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TopCopies({ copies }: { copies: { text: string, img: string }[] }) {
  const [selectedCopy, setSelectedCopy] = useState<{ text: string, img: string } | null>(null);

  return (
    <section className="site-section bg-foreground text-background py-24">
      <div className="site-container">
        <div className="mb-16">
 <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Narrativas que Convertem</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {copies.map((copy, i) => (
             <button 
               key={i} 
               onClick={() => setSelectedCopy(copy)}
               className="p-8 border border-background/10 bg-background/5 text-left hover:bg-background/10 transition-all group rounded-xl"
             >
                <MessageCircle size={20} className="mb-6 opacity-20 group-hover:opacity-100 transition-opacity" />
                <p className="text-lg md:text-xl font-medium leading-snug italic group-hover:not-italic transition-all">"{copy.text}"</p>
                <div className="mt-8 flex justify-end">
                   <Plus size={16} className="opacity-20 group-hover:opacity-100" />
                </div>
             </button>
           ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCopy && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCopy(null)}
              className="absolute inset-0 bg-background/90 backdrop-blur-sm cursor-pointer" 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-lg w-full bg-card shadow-2xl p-2 z-[201] rounded-2xl overflow-hidden"
            >
               <button 
                 onClick={() => setSelectedCopy(null)}
                 className="absolute -top-12 right-0 p-2 text-background hover:scale-110 transition-transform"
               >
                 <X size={32} />
               </button>
               <img src={selectedCopy.img} alt="Post preview" className="w-full h-auto rounded-t-xl" />
               <div className="p-6 bg-card">
                  <p className="text-sm text-secondary italic">"{selectedCopy.text}"</p>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function GridEvolution({ grids }: { grids: { month: string, img: string }[] }) {
  return (
    <section className="site-section py-24">
      <div className="site-container">
        <div className="mb-16">
 <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">A Transformação Visual</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {grids.map((grid, i) => (
             <div key={i} className="space-y-6">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-secondary">{grid.month}</span>
                <div className="aspect-square overflow-hidden border border-border shadow-lg rounded-xl">
                   <img src={grid.img} alt={grid.month} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}

export function VerticalGallery({ items }: { items: { type: 'Reel' | 'Story', img: string }[] }) {
  return (
    <section className="py-24 md:py-32 border-t border-border overflow-hidden bg-background">
      <div className="site-container mb-12">
 <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Variedade de Formatos</h2>
      </div>
      
      <div className="flex gap-6 overflow-x-auto no-scrollbar px-[var(--grid-padding)] md:px-[calc((100vw-var(--grid-width))/2+var(--grid-padding))]">
         {items.map((item, i) => (
           <div key={i} className="min-w-[240px] md:min-w-[280px] aspect-[9/16] relative group overflow-hidden bg-card border border-border rounded-xl">
              <img src={item.img} alt={item.type} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center">
                    <Play size={14} className="fill-foreground ml-0.5" />
                 </div>
                 <span className="text-[10px] font-mono uppercase tracking-widest text-background">{item.type}</span>
              </div>
           </div>
         ))}
      </div>
    </section>
  );
}

export function TestimonialCTA({ 
  clientName, 
  clientRole, 
  testimonial, 
  clientImage 
}: { 
  clientName: string, 
  clientRole: string, 
  testimonial: string, 
  clientImage: string 
}) {
  return (
    <section className="site-section bg-foreground text-background py-24">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-20 items-center">
          <div className="lg:col-span-8">
            <MessageCircle size={32} className="text-background/20 mb-8" />
 <blockquote className="text-2xl md:text-4xl font-bold tracking-tighter leading-[1.1] mb-12">
              "{testimonial}"
            </blockquote>
            <div className="flex items-center gap-5">
               <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden grayscale bg-background/10">
                  <img src={clientImage} alt={clientName} className="w-full h-full object-cover" />
               </div>
               <div>
 <span className="text-base md:text-lg font-bold block leading-none mb-1">{clientName}</span>
                  <span className="text-[10px] font-mono uppercase tracking-widest opacity-40">{clientRole}</span>
               </div>
            </div>
          </div>
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <a 
              href="https://wa.me/5511941765691?text=gostaria%20de%20fazer%20um%20or%C3%A7amento!" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary bg-background text-foreground px-10 py-6 text-lg flex items-center gap-3 hover:scale-105 transition-all rounded-full"
            >
              Fale comigo <ChevronRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function EditorialSocialCase({ 
  mainImg, 
  designTitle, 
  designText, 
  copyTitle, 
  copyText,
  stats
}: {
  mainImg: string;
  designTitle: string;
  designText: string;
  copyTitle: string;
  copyText: string;
  stats?: { label: string; value: string }[];
}) {
  return (
    <div className="anim-fade-in space-y-24 md:space-y-32 pb-32">
      <section className="site-section py-0 border-none overflow-hidden h-[60vh] md:h-[90vh] relative">
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full h-full"
        >
          <ProjectMedia 
            src={mainImg}
            alt={designTitle}
            className="grayscale hover:grayscale-0 transition-all duration-1000"
          />
        </motion.div>
      </section>

      <section className="site-section py-24">
        <div className="site-container grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div className="md:sticky md:top-32">
 <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1]">
              {designTitle}
            </h2>
          </div>
          <div className="pt-4 md:pt-24">
 <p className="text-lg md:text-xl text-secondary font-medium leading-[1.1] max-w-xl">
              {designText}
            </p>
            {stats && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 mt-12 md:mt-16">
                {stats.map((s, i) => (
                  <div key={i} className="border-t border-border pt-6">
                    <div className="text-2xl md:text-3xl font-bold tracking-tighter mb-1">{s.value}</div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-secondary">{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="site-section bg-foreground text-background py-24">
        <div className="site-container grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div className="order-2 md:order-1 pt-4 md:pt-24">
 <p className="text-lg md:text-xl text-background/60 font-medium leading-[1.1] max-w-xl whitespace-pre-line">
              {copyText}
            </p>
          </div>
          <div className="order-1 md:order-2 md:sticky md:top-32 text-left">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-background/40 mb-6 block">Copywriting</span>
 <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] text-background">
              {copyTitle}
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
}
