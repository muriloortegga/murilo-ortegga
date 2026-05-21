import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export interface MetaItem {
  label: string;
  value: string;
}

export function BrandHeader({
  client,
  phrase,
  description,
  meta,
  accentColor,
}: {
  client: string;
  phrase: string;
  description: string;
  niche: string;
  meta: MetaItem[];
  accentColor?: string;
}) {
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={revealRef} className="pt-24 md:pt-32">
      {/* Title Section */}
      <section className="site-section pb-12 border-t-0">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            <div className="lg:col-span-8 anim-fade-in">
              <h1 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.95]">
                {client} - <br />
                <span 
                  className="text-secondary font-medium italic"
                  style={accentColor ? { color: accentColor } : {}}
                >
                  {phrase}
                </span>
              </h1>
            </div>
            <div className="lg:col-span-4 flex items-end anim-fade-in delay-250">
               <p className="text-sm md:text-base text-secondary leading-relaxed max-w-sm">
                 {description}
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meta Bar */}
      <section className="site-container border-t border-b border-border py-8 mb-12 anim-fade-in delay-250">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {meta.map((item, i) => (
            <div key={i}>
              <span className="text-[10px] font-mono uppercase tracking-tight text-secondary block mb-1">
                {item.label}
              </span>
              <span className="text-sm font-bold uppercase">{item.value}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
