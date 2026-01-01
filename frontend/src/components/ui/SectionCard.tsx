interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function SectionCard({ children, className = "", title, subtitle }: SectionCardProps) {
  return (
    <section className={`surface-card p-6 space-y-4 ${className}`}>
      {(title || subtitle) && (
        <div className="space-y-1">
          {title && <h2 className="text-xl font-semibold text-foreground">{title}</h2>}
          {subtitle && <p className="text-muted text-sm">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

