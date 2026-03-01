import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, Clipboard, Home, Award, Layers, Activity } from "lucide-react";

interface LessonPlan {
  topicMapping: Array<{
    gradeATopic: string;
    gradeAGrade: string;
    gradeBTopic: string;
    gradeBGrade: string;
    relationship: "similar" | "related" | "unrelated";
    suggestion: string;
  }>;
  mergedLessons: Array<{
    title: string;
    grades: string[];
    duration: string;
    basicLevel: string;
    advancedLevel: string;
    teachingStrategy: string;
    materials: string[];
  }>;
  dailySchedule: Array<{
    timeBlock: string;
    activity: string;
    gradesFocus: string;
    otherGradesActivity: string;
    notes: string;
  }>;
  independentActivities: Array<{
    grade: string;
    activities: string[];
  }>;
  homework: Array<{
    grade: string;
    assignments: string[];
  }>;
  assessmentIdeas: Array<{
    type: string;
    description: string;
    grades: string[];
  }>;
}

const relationshipColors: Record<string, string> = {
  similar: "bg-success/10 text-success border-success/20",
  related: "bg-info/10 text-info border-info/20",
  unrelated: "bg-warning/10 text-warning border-warning/20",
};

export function ResultsDisplay({ plan }: { plan: LessonPlan }) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Topic Mapping */}
      <section className="result-section">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="h-5 w-5 text-primary" />
          <h3 className="font-display font-bold text-lg text-foreground">Topic Mapping</h3>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Grade A Topic</TableHead>
                <TableHead>Grade B Topic</TableHead>
                <TableHead>Relationship</TableHead>
                <TableHead>Suggestion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plan.topicMapping.map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{row.gradeATopic} <span className="text-muted-foreground text-xs">({row.gradeAGrade})</span></TableCell>
                  <TableCell className="font-medium">{row.gradeBTopic} <span className="text-muted-foreground text-xs">({row.gradeBGrade})</span></TableCell>
                  <TableCell>
                    <Badge variant="outline" className={relationshipColors[row.relationship] || ""}>
                      {row.relationship}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-xs">{row.suggestion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Merged Lessons */}
      <section className="result-section">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-5 w-5 text-primary" />
          <h3 className="font-display font-bold text-lg text-foreground">Merged Lesson Suggestions</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {plan.mergedLessons.map((lesson, i) => (
            <div key={i} className="rounded-lg border border-border bg-secondary/30 p-4 space-y-2">
              <h4 className="font-display font-bold text-foreground">{lesson.title}</h4>
              <div className="flex flex-wrap gap-1.5">
                {lesson.grades.map((g) => <Badge key={g} variant="secondary" className="text-xs">{g}</Badge>)}
                <Badge variant="outline" className="text-xs"><Clock className="h-3 w-3 mr-1" />{lesson.duration}</Badge>
              </div>
              <div className="text-sm space-y-1">
                <p><span className="font-semibold text-success">Basic:</span> <span className="text-muted-foreground">{lesson.basicLevel}</span></p>
                <p><span className="font-semibold text-info">Advanced:</span> <span className="text-muted-foreground">{lesson.advancedLevel}</span></p>
                <p><span className="font-semibold text-primary">Strategy:</span> <span className="text-muted-foreground">{lesson.teachingStrategy}</span></p>
              </div>
              {lesson.materials.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {lesson.materials.map((m, j) => <Badge key={j} variant="outline" className="text-xs">{m}</Badge>)}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Daily Schedule */}
      <section className="result-section">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-primary" />
          <h3 className="font-display font-bold text-lg text-foreground">Daily Time-Block Schedule</h3>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Focus Grades</TableHead>
                <TableHead>Other Grades</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plan.dailySchedule.map((block, i) => (
                <TableRow key={i}>
                  <TableCell className="font-mono text-sm font-semibold text-primary whitespace-nowrap">{block.timeBlock}</TableCell>
                  <TableCell className="font-medium">{block.activity}</TableCell>
                  <TableCell className="text-sm">{block.gradesFocus}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{block.otherGradesActivity}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{block.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Independent Activities */}
      <section className="result-section">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-5 w-5 text-primary" />
          <h3 className="font-display font-bold text-lg text-foreground">Independent Work Activities</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {plan.independentActivities.map((item, i) => (
            <div key={i} className="rounded-lg border border-border p-4">
              <h4 className="font-display font-bold text-foreground mb-2">{item.grade}</h4>
              <ul className="space-y-1">
                {item.activities.map((a, j) => (
                  <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>{a}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Homework */}
      <section className="result-section">
        <div className="flex items-center gap-2 mb-4">
          <Home className="h-5 w-5 text-primary" />
          <h3 className="font-display font-bold text-lg text-foreground">Homework Suggestions</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {plan.homework.map((item, i) => (
            <div key={i} className="rounded-lg border border-border p-4">
              <h4 className="font-display font-bold text-foreground mb-2">{item.grade}</h4>
              <ul className="space-y-1">
                {item.assignments.map((a, j) => (
                  <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                    <Clipboard className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />{a}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Assessment Ideas */}
      <section className="result-section">
        <div className="flex items-center gap-2 mb-4">
          <Award className="h-5 w-5 text-primary" />
          <h3 className="font-display font-bold text-lg text-foreground">Assessment Ideas</h3>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {plan.assessmentIdeas.map((idea, i) => (
            <div key={i} className="rounded-lg border border-border p-4 space-y-2">
              <Badge variant="secondary">{idea.type}</Badge>
              <p className="text-sm text-muted-foreground">{idea.description}</p>
              <div className="flex flex-wrap gap-1">
                {idea.grades.map((g) => <Badge key={g} variant="outline" className="text-xs">{g}</Badge>)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
