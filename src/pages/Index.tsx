import { useState } from "react";
import { Plus, Wand2, Loader2, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HowItWorks } from "@/components/HowItWorks";
import { GradeEntryCard, type GradeData } from "@/components/GradeEntryCard";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { ThemeToggle } from "@/components/ThemeToggle";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

function createEmptyGrade(): GradeData {
  return { id: crypto.randomUUID(), grade: "", subject: "", syllabus: "" };
}

const Index = () => {
  const [grades, setGrades] = useState<GradeData[]>([createEmptyGrade(), createEmptyGrade()]);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<any>(null);
  const { toast } = useToast();

  const addGrade = () => {
    if (grades.length >= 5) return;
    setGrades([...grades, createEmptyGrade()]);
  };

  const removeGrade = (id: string) => {
    setGrades(grades.filter((g) => g.id !== id));
  };

  const updateGrade = (updated: GradeData) => {
    setGrades(grades.map((g) => (g.id === updated.id ? updated : g)));
  };

  const canGenerate = grades.length >= 2 && grades.every((g) => g.grade && g.subject && g.syllabus.trim());

  const generate = async () => {
    if (!canGenerate) return;
    setLoading(true);
    setPlan(null);

    try {
      const { data, error } = await supabase.functions.invoke("merge-syllabi", {
        body: { grades: grades.map(({ grade, subject, syllabus }) => ({ grade, subject, syllabus })) },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setPlan(data);
      toast({ title: "Lesson plan generated!", description: "Scroll down to view your merged lesson plan." });
    } catch (e: any) {
      console.error(e);
      toast({ title: "Error", description: e.message || "Failed to generate lesson plan.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
              <Layers className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-extrabold text-foreground">
                Multigrade Lesson Planner
              </h1>
              <p className="text-sm text-muted-foreground">
                Merge similar topics across grades for efficient multigrade teaching
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        {/* How it works */}
        <div className="mb-8">
          <HowItWorks />
        </div>

        {/* Grade Entry Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-primary" />
              <h2 className="font-display font-bold text-lg text-foreground">Enter Syllabi by Grade</h2>
            </div>
            <Button variant="outline" onClick={addGrade} disabled={grades.length >= 5} className="gap-1.5">
              <Plus className="h-4 w-4" /> Add Grade
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {grades.map((g, i) => (
              <GradeEntryCard
                key={g.id}
                data={g}
                index={i}
                canRemove={grades.length > 2}
                onChange={updateGrade}
                onRemove={() => removeGrade(g.id)}
              />
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex justify-center mb-10">
          <Button
            size="lg"
            onClick={generate}
            disabled={!canGenerate || loading}
            className="gap-2 px-8 font-display font-bold text-base"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Generating Lesson Plan...
              </>
            ) : (
              <>
                <Wand2 className="h-5 w-5" />
                Generate Merged Lesson Plan
              </>
            )}
          </Button>
        </div>

        {/* Results */}
        {plan && <ResultsDisplay plan={plan} />}
      </div>
    </div>
  );
};

export default Index;
