import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Wand2, Loader2, Layers, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
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

const Planner = () => {
  const [grades, setGrades] = useState<GradeData[]>([createEmptyGrade(), createEmptyGrade()]);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-start justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="shrink-0">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </motion.div>
            <motion.div
              className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10"
              whileHover={{ rotate: 12 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Layers className="h-7 w-7 text-primary" />
            </motion.div>
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
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mb-8"
        >
          <HowItWorks />
        </motion.div>

        {/* Grade Entry Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-primary" />
              <h2 className="font-display font-bold text-lg text-foreground">Enter Syllabi by Grade</h2>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" onClick={addGrade} disabled={grades.length >= 5} className="gap-1.5">
                <Plus className="h-4 w-4" /> Add Grade
              </Button>
            </motion.div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {grades.map((g, i) => (
              <motion.div
                key={g.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                layout
              >
                <GradeEntryCard
                  data={g}
                  index={i}
                  canRemove={grades.length > 2}
                  onChange={updateGrade}
                  onRemove={() => removeGrade(g.id)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Generate Button */}
        <div className="flex justify-center mb-10">
          <motion.div whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: 0.95 }}>
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
          </motion.div>
        </div>

        {/* Results */}
        {plan && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <ResultsDisplay plan={plan} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Planner;
