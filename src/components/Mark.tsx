import { JA_CURSOR_ID, JA_MARK_VIEWBOX, JA_STROKES } from "@/lib/ja-logo";
import { cn } from "@/lib/utils";

export default function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox={JA_MARK_VIEWBOX}
      fill="none"
      stroke="currentColor"
      strokeWidth={10}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("h-6 w-auto", className)}
    >
      {JA_STROKES.map((stroke) => (
        <path
          key={stroke.id}
          d={stroke.mark}
          className={stroke.id === JA_CURSOR_ID ? "animate-blink text-signal" : undefined}
        />
      ))}
    </svg>
  );
}
