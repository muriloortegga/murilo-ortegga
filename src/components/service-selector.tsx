import { cn } from "@/lib/utils";

interface ServiceOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export function ServiceSelector({ 
  options, 
  activeId, 
  onChange,
  accentColor
}: { 
  options: ServiceOption[], 
  activeId: string, 
  onChange: (id: string) => void,
  accentColor?: string
}) {
  return (
    <section className="site-container mb-12">
      <div className="flex flex-wrap items-center gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={cn(
              "px-5 py-2 text-[10px] font-mono uppercase tracking-widest transition-all border rounded-full",
              activeId === option.id 
                ? "shadow-sm" 
                : "bg-transparent text-secondary border-border hover:border-foreground/40 hover:text-foreground"
            )}
            style={activeId === option.id ? { 
              backgroundColor: accentColor || "var(--foreground)", 
              color: "var(--background)",
              borderColor: accentColor || "var(--foreground)" 
            } : {}}
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  );
}
