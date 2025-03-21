// src/components/ui/button.tsx
export function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
      <button
        className={`bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition ${className}`}
        {...props}
      />
    );
  }
  