import { X, BookOpen } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export interface GradeData {
  id: string;
  grade: string;
  subject: string;
  syllabus: string;
}

const gradeOptions = [
  "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5",
  "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10",
  "Grade 11", "Grade 12",
];

const subjectOptions = [
  "Mathematics", "Science", "English", "Social Studies", "Hindi",
  "Environmental Studies", "History", "Geography", "Physics",
  "Chemistry", "Biology", "Computer Science",
];

const gradeColors = [
  "border-t-grade-1", "border-t-grade-2", "border-t-grade-3",
  "border-t-grade-4", "border-t-grade-5",
];

interface GradeEntryCardProps {
  data: GradeData;
  index: number;
  canRemove: boolean;
  onChange: (data: GradeData) => void;
  onRemove: () => void;
}

export function GradeEntryCard({ data, index, canRemove, onChange, onRemove }: GradeEntryCardProps) {
  return (
    <div className={`grade-card border-t-4 ${gradeColors[index % gradeColors.length]} animate-fade-in`}>
      {canRemove && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:text-destructive"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      )}

      <div className="flex items-center gap-3 mb-4">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-display font-bold text-sm">
          {index + 1}
        </span>
        <h3 className="font-display font-bold text-foreground">Grade Entry</h3>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Grade</label>
          <Select value={data.grade} onValueChange={(v) => onChange({ ...data, grade: v })}>
            <SelectTrigger><SelectValue placeholder="Select grade" /></SelectTrigger>
            <SelectContent>
              {gradeOptions.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Subject</label>
          <Select value={data.subject} onValueChange={(v) => onChange({ ...data, subject: v })}>
            <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
            <SelectContent>
              {subjectOptions.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1.5">
          <BookOpen className="h-3.5 w-3.5" />
          Chapters / Syllabus
        </label>
        <Textarea
          placeholder={"Paste or type chapters here:\n\nChapter 1: Plants Around Us\nChapter 2: Animals and Their Homes\nChapter 3: Food We Eat\n..."}
          value={data.syllabus}
          onChange={(e) => onChange({ ...data, syllabus: e.target.value })}
          className="min-h-[140px] text-sm resize-y"
        />
      </div>
    </div>
  );
}
