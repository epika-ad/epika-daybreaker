import { useState } from "react";
import { Button, Questionnaire } from "woozui";

const items: Questionnaire.Item[] = [
  {
    name: "role",
    title: "What best describes you?",
    required: true,
    choices: [
      { value: "designer", label: "Designer" },
      { value: "developer", label: "Developer" },
      { value: "founder", label: "Founder" },
    ],
  },
  {
    name: "platforms",
    title: "Which platforms do you build for?",
    description: "Pick as many as you like.",
    multiple: true,
    choices: [
      { value: "web", label: "Web" },
      { value: "ios", label: "iOS" },
      { value: "android", label: "Android" },
    ],
  },
  {
    name: "project",
    title: "What are you working on?",
    placeholder: "A dashboard, a shop, a side project…",
  },
];

export const Example = () => {
  const [answers, setAnswers] = useState<Record<string, unknown> | null>(null);

  if (answers) {
    return (
      <div className="grid w-full max-w-sm justify-items-start gap-3">
        <p className="font-semibold">Thanks! Here is what you told us.</p>
        <pre className="w-full overflow-x-auto rounded-control bg-accent p-3 text-xs">
          {JSON.stringify(answers, null, 2)}
        </pre>
        <Button variant="outline" onClick={() => setAnswers(null)}>
          Start over
        </Button>
      </div>
    );
  }

  return (
    <Questionnaire items={items} onSubmit={setAnswers} className="max-w-sm" />
  );
};
