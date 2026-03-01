import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { grades } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const gradesText = grades.map((g: any, i: number) => 
      `Grade ${g.grade} (${g.subject}):\n${g.syllabus}`
    ).join("\n\n");

    const systemPrompt = `You are a Smart Multigrade Lesson Planner AI for teachers in multigrade classrooms where students from different grades sit together.

Analyze the provided syllabi and generate a structured, teacher-friendly lesson plan.

You MUST return a valid JSON object with this exact structure:
{
  "topicMapping": [
    {
      "gradeATopic": "string",
      "gradeAGrade": "string", 
      "gradeBTopic": "string",
      "gradeBGrade": "string",
      "relationship": "similar" | "related" | "unrelated",
      "suggestion": "string"
    }
  ],
  "mergedLessons": [
    {
      "title": "string",
      "grades": ["string"],
      "duration": "string",
      "basicLevel": "string - what to teach younger/basic grade",
      "advancedLevel": "string - what to teach older/advanced grade",
      "teachingStrategy": "string",
      "materials": ["string"]
    }
  ],
  "dailySchedule": [
    {
      "timeBlock": "string (e.g. 9:00-9:30)",
      "activity": "string",
      "gradesFocus": "string",
      "otherGradesActivity": "string",
      "notes": "string"
    }
  ],
  "independentActivities": [
    {
      "grade": "string",
      "activities": ["string"]
    }
  ],
  "homework": [
    {
      "grade": "string",
      "assignments": ["string"]
    }
  ],
  "assessmentIdeas": [
    {
      "type": "string",
      "description": "string",
      "grades": ["string"]
    }
  ]
}

Rules:
- Keep language simple and teacher-friendly
- Ensure age-appropriate activities
- Balance teacher workload across grades
- Include active learning techniques
- Make it immediately usable in a classroom
- For related topics, suggest teaching them together with differentiated depth
- For unrelated topics, suggest rotation strategies with independent work`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Please analyze these syllabi and create a merged lesson plan:\n\n${gradesText}` },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Usage limit reached. Please add credits." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    // Parse JSON from the response (handle markdown code blocks)
    let parsed;
    try {
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
      parsed = JSON.parse(jsonMatch ? jsonMatch[1].trim() : content.trim());
    } catch {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse lesson plan");
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
