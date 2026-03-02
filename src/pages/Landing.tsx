import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Layers, Wand2, BookOpen, Clock, Users, Sparkles,
  ArrowRight, CheckCircle2, Star, Zap, Target, GraduationCap,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

// --- Animation Variants ---
const customEase = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: customEase as unknown as [number, number, number, number] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number = 0) => ({
    opacity: 1, scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: customEase as unknown as [number, number, number, number] },
  }),
};

const slideRight = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: customEase as unknown as [number, number, number, number] } },
};

const slideLeft = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: customEase as unknown as [number, number, number, number] } },
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// --- Feature data ---
const features = [
  {
    icon: Wand2,
    title: "AI-Powered Merging",
    desc: "Our AI finds overlapping & related topics across grades and creates combined lessons automatically.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Clock,
    title: "Smart Scheduling",
    desc: "Get time-blocked daily plans with rotation strategies so every grade stays engaged.",
    color: "text-info",
    bg: "bg-info/10",
  },
  {
    icon: Target,
    title: "Differentiated Learning",
    desc: "Basic and advanced explanations for the same topic — each grade gets age-appropriate content.",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    icon: BookOpen,
    title: "Ready Activities",
    desc: "Worksheets, peer-learning tasks, quizzes, and projects for independent work time.",
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    icon: Users,
    title: "2–5 Grades at Once",
    desc: "Handle anywhere from 2 to 5 grades sitting in the same classroom.",
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
  {
    icon: GraduationCap,
    title: "Teacher-Friendly",
    desc: "Simple language, practical strategies, immediately usable in a real classroom.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
];

const steps = [
  { num: "01", title: "Add Grades", desc: "Select grades and subjects, then paste or type your syllabus chapters.", icon: Layers },
  { num: "02", title: "AI Analyzes", desc: "Our AI identifies similar, related, and unique topics across all grades.", icon: Sparkles },
  { num: "03", title: "Get Your Plan", desc: "Receive a merged lesson plan with schedules, activities, and assessments.", icon: Zap },
];

const testimonials = [
  { name: "Priya M.", role: "Primary Teacher, Rural Karnataka", text: "This tool saved me hours of planning. My multigrade classroom finally feels manageable!", stars: 5 },
  { name: "Rajesh K.", role: "Head Teacher, UP", text: "The merged lesson plans are brilliant. Students in different grades learn together naturally.", stars: 5 },
  { name: "Anita S.", role: "Teacher, Rajasthan", text: "I love how it gives me activities for the other grades while I teach one group. Game changer!", stars: 5 },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50"
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2.5 cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
              <Layers className="h-5 w-5 text-primary" />
            </div>
            <span className="font-display font-extrabold text-lg text-foreground">MultiGrade</span>
          </motion.div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={() => navigate("/planner")} className="gap-2 font-display font-bold">
                Start Planning <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative py-16 md:py-28 lg:py-36">
        {/* Decorative blobs */}
        <motion.div
          className="absolute top-10 left-[10%] w-72 h-72 rounded-full bg-primary/8 blur-3xl pointer-events-none"
          animate={{ y: [0, 20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-[5%] w-96 h-96 rounded-full bg-accent/6 blur-3xl pointer-events-none"
          animate={{ y: [0, -25, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              <Sparkles className="h-4 w-4" /> AI-Powered for Multigrade Classrooms
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp} custom={1} initial="hidden" animate="visible"
            className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight max-w-4xl mx-auto"
          >
            Teach{" "}
            <span className="text-primary relative">
              Multiple Grades
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-1.5 bg-primary/30 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
              />
            </span>
            {" "}in One Classroom
          </motion.h1>

          <motion.p
            variants={fadeUp} custom={2} initial="hidden" animate="visible"
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Paste syllabi from 2–5 grades. Our AI merges related topics into combined lessons and creates
            rotation schedules — so every student stays engaged, every minute.
          </motion.p>

          <motion.div
            variants={fadeUp} custom={3} initial="hidden" animate="visible"
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: 0.96 }}>
              <Button size="lg" onClick={() => navigate("/planner")} className="gap-2.5 px-10 py-6 text-lg font-display font-bold rounded-xl shadow-lg shadow-primary/20">
                <Wand2 className="h-5 w-5" /> Create Lesson Plan
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Button variant="outline" size="lg" className="gap-2 px-8 py-6 text-lg font-display font-semibold rounded-xl"
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              >
                See How It Works <ChevronDown className="h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating grade badges */}
          <div className="mt-16 flex justify-center gap-3 flex-wrap">
            {["Grade 1", "Grade 3", "Grade 5", "Grade 7"].map((g, i) => (
              <motion.span
                key={g}
                variants={scaleIn} custom={i} initial="hidden" animate="visible"
                whileHover={{ scale: 1.12, rotate: [0, -3, 3, 0] }}
                className="px-4 py-2 rounded-full bg-card border border-border text-sm font-display font-bold text-foreground shadow-sm cursor-default"
              >
                {g}
              </motion.span>
            ))}
            <motion.span
              variants={scaleIn} custom={4} initial="hidden" animate="visible"
              whileHover={{ scale: 1.12 }}
              className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-display font-bold text-primary shadow-sm cursor-default"
            >
              → Merged Plan ✨
            </motion.span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <AnimatedSection className="py-20 bg-secondary/30" >
        <div className="max-w-6xl mx-auto px-4" id="how-it-works">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-14">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground">
              How It Works
            </h2>
            <p className="mt-3 text-muted-foreground text-lg max-w-xl mx-auto">Three simple steps to transform your multigrade classroom</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeUp} custom={i + 1}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative bg-card rounded-2xl border border-border p-8 text-center shadow-sm hover:shadow-xl transition-shadow"
              >
                <motion.div
                  className="mx-auto mb-5 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center"
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <step.icon className="h-7 w-7 text-primary" />
                </motion.div>
                <span className="text-5xl font-display font-extrabold text-primary/10 absolute top-4 right-6">{step.num}</span>
                <h3 className="font-display font-bold text-xl text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Features */}
      <AnimatedSection className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-14">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground">
              Everything You Need
            </h2>
            <p className="mt-3 text-muted-foreground text-lg max-w-xl mx-auto">Powerful features designed specifically for multigrade teachers</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={scaleIn} custom={i}
                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
                className="group bg-card rounded-2xl border border-border p-6 hover:shadow-xl hover:border-primary/30 transition-all cursor-default"
              >
                <motion.div
                  className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center mb-4`}
                  whileHover={{ rotate: -10, scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <f.icon className={`h-6 w-6 ${f.color}`} />
                </motion.div>
                <h3 className="font-display font-bold text-lg text-foreground mb-1.5 group-hover:text-primary transition-colors">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Demo Preview */}
      <AnimatedSection className="py-20 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={slideRight}>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground mb-6">
                See the Magic in Action
              </h2>
              <div className="space-y-4">
                {[
                  "Paste syllabi from any 2–5 grades",
                  "AI identifies similar & related topics",
                  "Get merged lessons + rotation schedules",
                  "Download ready-to-use classroom plans",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp} custom={i}
                    className="flex items-start gap-3"
                  >
                    <motion.div whileHover={{ scale: 1.3, rotate: 360 }} transition={{ duration: 0.4 }}>
                      <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
                    </motion.div>
                    <span className="text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div className="mt-8" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" onClick={() => navigate("/planner")} className="gap-2 font-display font-bold rounded-xl">
                  Try It Now <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div variants={slideLeft} className="relative">
              <motion.div
                className="rounded-2xl border-2 border-border bg-card p-6 shadow-2xl"
                whileHover={{ rotate: 1, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {/* Mock UI preview */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-destructive" />
                    <div className="w-3 h-3 rounded-full bg-warning" />
                    <div className="w-3 h-3 rounded-full bg-success" />
                    <span className="ml-2 text-xs text-muted-foreground font-mono">multigrade-planner</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {["Grade 1 — Science", "Grade 3 — Science"].map((label, i) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 + i * 0.2 }}
                        className={`rounded-lg border-2 border-dashed p-3 ${i === 0 ? "border-primary/40" : "border-info/40"}`}
                      >
                        <div className="text-xs font-bold text-foreground mb-1">{label}</div>
                        <div className="space-y-1">
                          {(i === 0 ? ["Plants", "Animals", "Food"] : ["Photosynthesis", "Habitats", "Nutrition"]).map((t) => (
                            <div key={t} className="text-xs text-muted-foreground bg-muted rounded px-2 py-1">{t}</div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    className="flex justify-center"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1.5">
                      <Wand2 className="h-3.5 w-3.5" /> Merging...
                    </div>
                  </motion.div>
                  <div className="rounded-lg bg-success/10 border border-success/20 p-3">
                    <div className="text-xs font-bold text-success mb-1">✓ Merged Lesson</div>
                    <div className="text-xs text-muted-foreground">Plants → Photosynthesis (Basic → Advanced)</div>
                  </div>
                </div>
              </motion.div>
              {/* Floating decorations */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center"
                animate={{ rotate: [0, 8, -8, 0], y: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="h-8 w-8 text-primary" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-14">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground">
              Loved by Teachers
            </h2>
            <p className="mt-3 text-muted-foreground text-lg">Real feedback from multigrade educators</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeUp} custom={i + 1}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-card rounded-2xl border border-border p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <motion.div key={j} whileHover={{ scale: 1.3, rotate: 20 }}>
                      <Star className="h-4 w-4 fill-warning text-warning" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-foreground text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <div className="font-display font-bold text-foreground text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection className="py-20 bg-secondary/30">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div variants={scaleIn} custom={0}>
            <motion.div
              className="mx-auto mb-6 w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Wand2 className="h-10 w-10 text-primary" />
            </motion.div>
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="font-display font-extrabold text-3xl md:text-4xl text-foreground mb-4">
            Ready to Simplify Your Classroom?
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
            Join hundreds of teachers already using AI to plan multigrade lessons in minutes, not hours.
          </motion.p>
          <motion.div variants={fadeUp} custom={3} whileHover={{ scale: 1.06, y: -3 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" onClick={() => navigate("/planner")} className="gap-2.5 px-12 py-6 text-lg font-display font-bold rounded-xl shadow-lg shadow-primary/20">
              <Sparkles className="h-5 w-5" /> Start Planning — It's Free
            </Button>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-primary" />
            <span className="font-display font-bold text-foreground">MultiGrade Lesson Planner</span>
          </div>
          <span>© {new Date().getFullYear()} — Built for teachers, by teachers.</span>
        </div>
      </footer>
    </div>
  );
}
