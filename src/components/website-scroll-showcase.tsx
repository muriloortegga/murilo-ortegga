import { motion } from "framer-motion";

interface WebsiteShowcaseProps {
  title: string;
  description: string;
  mediaSrc: string;
  roleTitle?: string;
  roleDescription?: string;
}

export function WebsiteShowcase({ title, description, mediaSrc, roleTitle, roleDescription }: WebsiteShowcaseProps) {
  return (
    <div className="w-full bg-background mt-24 mb-32">
      {/* Top Copy */}
      <div className="site-container max-w-5xl mx-auto mb-20">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-medium tracking-tight mb-8 uppercase"
        >
          {title}
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-2xl text-secondary leading-relaxed max-w-4xl"
        >
          {description}
        </motion.p>
      </div>

      {/* Full screen GIF */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full h-auto mb-20 border-y border-border"
      >
        <img 
          src={mediaSrc}
          alt="Website Showcase"
          className="w-full h-auto object-cover"
        />
      </motion.div>
      
      {/* Bottom Copy (if provided) */}
      {(roleTitle || roleDescription) && (
        <div className="site-container max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              {roleTitle && (
                <motion.h4 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-sm font-mono uppercase tracking-widest text-primary"
                >
                  {roleTitle}
                </motion.h4>
              )}
            </div>
            <div className="md:col-span-3">
              {roleDescription && (
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-lg md:text-xl text-secondary leading-relaxed"
                >
                  {roleDescription}
                </motion.p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
