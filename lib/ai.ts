export async function solveMathQuestion(question: string) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return {
      steps: [
        "Read the problem carefully and identify known values.",
        "Choose a suitable formula or method.",
        "Substitute values and simplify step-by-step.",
        "Check units/sign and verify the answer."
      ],
      finalAnswer: "Set OPENAI_API_KEY to get AI-generated specific answers.",
      summary: "Fallback response generated locally."
    };
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Explain math like you're teaching a confused but smart 16-year-old. Use simple language and step-by-step reasoning. Return JSON with keys: steps (array), finalAnswer, summary."
        },
        { role: "user", content: question }
      ],
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) {
    throw new Error("AI service unavailable");
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || "{}";
  return JSON.parse(content);
}
