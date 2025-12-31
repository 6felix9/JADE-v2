interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function SectionCard({ children, className = "", title, subtitle }: SectionCardProps) {
  return (
    <section className={`surface-card p-8 space-y-6 ${className}`}>
      {(title || subtitle) && (
        <div className="space-y-2">
          {title && <h2 className="text-xl font-semibold text-foreground">{title}</h2>}
          {subtitle && <p className="text-muted">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

