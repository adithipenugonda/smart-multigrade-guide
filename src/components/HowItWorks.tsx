import { Lightbulb } from "lucide-react";

const steps = [
  { text: "Select the **grade** and **subject** for each class sitting together." },
  { text: 'Paste or type the chapter list / syllabus for each grade.' },
  { text: 'AI merges similar topics (e.g. "Plants" in Class 1 + "Photosynthesis" in Class 7) into combined lessons.' },
  { text: 'Get a **merged syllabus** with differentiated activities, plus a **separate syllabus** with parallel activities for non-overlapping topics.' },
];

export function HowItWorks() {
  return (
    <div className="info-box animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="h-5 w-5 text-primary" />
        <h3 className="font-display font-bold text-foreground">How it works</h3>
      </div>
      <ol className="space-y-1.5 text-sm text-muted-foreground">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-muted-foreground/60">{i + 1}.</span>
            <span dangerouslySetInnerHTML={{ __html: step.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>') }} />
          </li>
        ))}
      </ol>
    </div>
  );
}
