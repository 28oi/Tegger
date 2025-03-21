// src/components/ui/card.tsx
export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`border rounded-lg shadow-md p-4 ${className}`}>{children}</div>;
  }
  
  export function CardContent({ children }: { children: React.ReactNode }) {
    return <div className="p-4">{children}</div>;
  }
  