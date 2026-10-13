import {
  type ComponentProps,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons";
import { cn } from "../utils";
import { focusRing } from "../utils/styles";

const sameDay = (a: Date | null | undefined, b: Date) =>
  !!a &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

// the six weeks that cover a month, starting on Monday
const weeks = (month: Date) => {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const offset = (first.getDay() + 6) % 7;
  return Array.from(
    { length: 42 },
    (_, index) =>
      new Date(month.getFullYear(), month.getMonth(), index + 1 - offset),
  );
};

const sameMonth = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();

// the same day some months away, or that month's last day when it is shorter:
// setMonth alone would spill January 31 over into March
const shift = (date: Date, months: number) => {
  const target = new Date(date.getFullYear(), date.getMonth() + months, 1);
  const last = new Date(
    target.getFullYear(),
    target.getMonth() + 1,
    0,
  ).getDate();
  target.setDate(Math.min(date.getDate(), last));
  return target;
};

const step =
  "flex size-8 cursor-pointer items-center justify-center rounded-full text-foreground-dimmed transition-[scale,background-color,color] duration-400 ease-spring hover:bg-accent hover:text-foreground active:scale-85";

/** A month grid for picking one date. Put it in a `Popover` for a date picker. */
export const Calendar = ({
  value,
  defaultValue = null,
  onValueChange,
  locale,
  className,
  ...props
}: Calendar.Props) => {
  const [inner, setInner] = useState(defaultValue);
  const selected = value === undefined ? inner : value;
  const [month, setMonth] = useState(() => selected ?? new Date());
  // which way the grid slides in after a month change
  const [direction, setDirection] = useState(0);
  const today = new Date();
  const days = weeks(month);

  // the grid is one tab stop: arrow keys move a roving focus between days
  const [active, setActive] = useState(() => selected ?? new Date());

  // a controlled value that moves to another month brings the grid with it
  const [seen, setSeen] = useState(value);
  if (value !== seen) {
    setSeen(value);
    if (value && !sameDay(seen, value)) {
      setActive(value);
      if (!sameMonth(value, month)) {
        setDirection(value < month ? -1 : 1);
        setMonth(new Date(value.getFullYear(), value.getMonth(), 1));
      }
    }
  }

  const stop = days.some((day) => sameDay(active, day))
    ? active
    : new Date(month.getFullYear(), month.getMonth(), 1);
  const grid = useRef<HTMLDivElement>(null);
  const refocus = useRef(false);
  useEffect(() => {
    if (!refocus.current) return;
    refocus.current = false;
    grid.current?.querySelector<HTMLElement>('[tabindex="0"]')?.focus();
  });

  const move = (by: number) => {
    setDirection(by);
    setMonth(new Date(month.getFullYear(), month.getMonth() + by, 1));
  };

  const navigate = (event: KeyboardEvent<HTMLDivElement>) => {
    let next = new Date(stop);
    const weekday = (stop.getDay() + 6) % 7;
    if (event.key === "ArrowLeft") next.setDate(stop.getDate() - 1);
    else if (event.key === "ArrowRight") next.setDate(stop.getDate() + 1);
    else if (event.key === "ArrowUp") next.setDate(stop.getDate() - 7);
    else if (event.key === "ArrowDown") next.setDate(stop.getDate() + 7);
    else if (event.key === "Home") next.setDate(stop.getDate() - weekday);
    else if (event.key === "End") next.setDate(stop.getDate() + 6 - weekday);
    else if (event.key === "PageUp") next = shift(stop, -1);
    else if (event.key === "PageDown") next = shift(stop, 1);
    else return;
    event.preventDefault();
    setActive(next);
    refocus.current = true;
    const months =
      (next.getFullYear() - month.getFullYear()) * 12 +
      next.getMonth() -
      month.getMonth();
    if (months !== 0) move(months);
  };
  const weekday = new Intl.DateTimeFormat(locale, { weekday: "narrow" });

  return (
    <div className={cn("w-fit select-none p-1", className)} {...props}>
      <div className="flex items-center justify-between pb-2">
        <button
          type="button"
          aria-label="Previous month"
          className={cn(step, focusRing)}
          onClick={() => move(-1)}
        >
          <ChevronLeftIcon />
        </button>
        <p aria-live="polite" className="font-semibold text-sm">
          {new Intl.DateTimeFormat(locale, {
            month: "long",
            year: "numeric",
          }).format(month)}
        </p>
        <button
          type="button"
          aria-label="Next month"
          className={cn(step, focusRing)}
          onClick={() => move(1)}
        >
          <ChevronRightIcon />
        </button>
      </div>
      {/* padded so the focus ring on an edge day is not clipped */}
      <div className="-m-1.5 overflow-hidden p-1.5">
        {/* biome-ignore lint/a11y/useSemanticElements: a fieldset would add a form grouping this is not */}
        <div
          role="group"
          aria-label="Days"
          ref={grid}
          // remounting on a month change replays the slide
          key={month.getTime()}
          onKeyDown={navigate}
          className={cn(
            "grid grid-cols-7 gap-y-1",
            direction > 0 && "animate-slide-from-right",
            direction < 0 && "animate-slide-from-left",
            "motion-reduce:animate-none",
          )}
        >
          {days.slice(0, 7).map((day) => (
            <span
              key={day.getDay()}
              aria-hidden="true"
              className="flex size-9 items-center justify-center font-medium text-foreground-dimmed text-xs"
            >
              {weekday.format(day)}
            </span>
          ))}
          {days.map((day) => {
            const outside = day.getMonth() !== month.getMonth();
            const picked = sameDay(selected, day);
            return (
              <button
                key={day.getTime()}
                type="button"
                aria-label={day.toLocaleDateString(locale, {
                  dateStyle: "full",
                })}
                aria-pressed={picked}
                tabIndex={sameDay(stop, day) ? 0 : -1}
                className={cn(
                  "flex size-9 cursor-pointer items-center justify-center rounded-full text-sm tabular-nums transition-[scale,background-color,color] duration-400 ease-spring hover:bg-accent active:scale-85 aria-pressed:bg-primary aria-pressed:font-semibold aria-pressed:text-primary-foreground",
                  outside && "text-foreground-dimmed",
                  sameDay(today, day) &&
                    !picked &&
                    "font-semibold text-primary",
                  focusRing,
                )}
                onClick={() => {
                  setInner(day);
                  setActive(day);
                  onValueChange?.(day);
                  if (outside) move(day < month ? -1 : 1);
                }}
              >
                {day.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export namespace Calendar {
  export type Props = Omit<
    ComponentProps<"div">,
    "defaultValue" | "onChange"
  > & {
    /** The selected date; leave undefined to let the calendar hold it. */
    value?: Date | null;
    defaultValue?: Date | null;
    onValueChange?: (date: Date) => void;
    /** A BCP 47 language tag for month and weekday names. */
    locale?: string;
  };
}
