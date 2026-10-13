import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { CheckIcon } from "../icons";
import { cn } from "../utils";
import { focusRing } from "../utils/styles";
import { Button } from "./button";
import { Input } from "./input";

type Answer = string | string[];

/**
 * Asks a series of questions one at a time: single choice, multiple choice or
 * free text, each optionally required. Calls `onSubmit` with every answer.
 */
export const Questionnaire = ({
  items,
  onSubmit,
  submitLabel = "Submit",
  className,
}: Questionnaire.Props) => {
  const [step, setStep] = useState(0);
  // which way the next question slides in from
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [error, setError] = useState(false);

  // a new question takes focus, so keyboard and screen reader users land on
  // it instead of staying on the button they pressed
  const question = useRef<HTMLFieldSetElement>(null);
  const moved = useRef(false);
  useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    question.current?.querySelector("input")?.focus();
  });

  const item = items[step];
  if (!item) return null;
  const answer = answers[item.name];
  const picked = Array.isArray(answer) ? answer : answer ? [answer] : [];
  // typed answers made only of spaces do not count
  const blank = Array.isArray(answer) ? answer.length === 0 : !answer?.trim();
  const last = step === items.length - 1;

  const set = (value: Answer) => {
    setAnswers({ ...answers, [item.name]: value });
    setError(false);
  };
  const go = (to: number) => {
    setDirection(to > step ? 1 : -1);
    setError(false);
    setStep(to);
    moved.current = true;
  };
  const advance = (event: FormEvent) => {
    event.preventDefault();
    if (item.required && blank) return setError(true);
    if (last) onSubmit(answers);
    else go(step + 1);
  };

  return (
    <form
      onSubmit={advance}
      className={cn("flex w-full flex-col gap-4", className)}
    >
      <div
        role="progressbar"
        aria-label="Progress"
        aria-valuemin={1}
        aria-valuemax={items.length}
        aria-valuenow={step + 1}
        className="flex gap-1.5"
      >
        {items.map((entry, index) => (
          <span
            key={entry.name}
            className={cn(
              "h-1 flex-1 rounded-full bg-accent transition-colors duration-400",
              index <= step && "bg-primary",
            )}
          />
        ))}
      </div>
      <div className="-m-1 overflow-hidden p-1">
        <fieldset
          // remounting on a new question replays the slide
          key={item.name}
          ref={question}
          className={cn(
            "flex min-w-0 flex-col gap-3 motion-reduce:animate-none",
            direction > 0
              ? "animate-slide-from-right"
              : "animate-slide-from-left",
          )}
        >
          <legend className="contents">
            <span className="font-semibold text-base">{item.title}</span>
          </legend>
          {item.description && (
            <p className="text-foreground-dimmed text-sm">{item.description}</p>
          )}
          {item.choices ? (
            <div className="flex flex-col gap-2">
              {item.choices.map((choice) => {
                const on = picked.includes(choice.value);
                return (
                  <label
                    key={choice.value}
                    className={cn(
                      "flex cursor-pointer items-center justify-between gap-3 rounded-control border border-transparent bg-accent px-3.5 py-2.5 text-sm transition-[scale,background-color,border-color] duration-400 ease-spring has-focus-visible:ring-2 has-focus-visible:ring-ring active:scale-98",
                      on && "border-primary bg-primary/10",
                    )}
                  >
                    <input
                      type={item.multiple ? "checkbox" : "radio"}
                      name={item.name}
                      value={choice.value}
                      checked={on}
                      className="sr-only"
                      onChange={() =>
                        set(
                          item.multiple
                            ? on
                              ? picked.filter((value) => value !== choice.value)
                              : [...picked, choice.value]
                            : choice.value,
                        )
                      }
                    />
                    {choice.label}
                    <CheckIcon
                      className={cn(
                        "text-primary transition-[scale,opacity] duration-400 ease-spring",
                        !on && "scale-50 opacity-0",
                      )}
                    />
                  </label>
                );
              })}
            </div>
          ) : (
            <Input
              aria-label={
                typeof item.title === "string" ? item.title : "Answer"
              }
              placeholder={item.placeholder}
              value={typeof answer === "string" ? answer : ""}
              onChange={(event) => set(event.target.value)}
            />
          )}
          {error && (
            <p role="alert" className="text-error text-sm">
              {item.choices ? "Choose" : "Enter"} an answer to continue.
            </p>
          )}
        </fieldset>
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          disabled={step === 0}
          onClick={() => go(step - 1)}
        >
          Back
        </Button>
        <span className="flex-1 text-center text-foreground-dimmed text-xs tabular-nums">
          {step + 1} of {items.length}
        </span>
        {!item.required && !last && (
          <Button
            type="button"
            variant="ghost"
            className={focusRing}
            onClick={() => go(step + 1)}
          >
            Skip
          </Button>
        )}
        <Button type="submit">{last ? submitLabel : "Next"}</Button>
      </div>
    </form>
  );
};
export namespace Questionnaire {
  export type Item = {
    /** The key this question's answer is stored under. */
    name: string;
    title: ReactNode;
    description?: ReactNode;
    /** Options to pick from; leave out for a free-text answer. */
    choices?: readonly { value: string; label: ReactNode }[];
    /** Lets several choices be picked. */
    multiple?: boolean;
    /** Blocks moving on, and hides Skip, until answered. */
    required?: boolean;
    placeholder?: string;
  };
  export type Props = {
    items: readonly Item[];
    onSubmit: (answers: Record<string, string | string[]>) => void;
    submitLabel?: string;
    className?: string;
  };
}
