import { Carousel } from "daybreaker";

const slides = [
  { title: "Glass", tone: "bg-primary/20" },
  { title: "Springs", tone: "bg-success/20" },
  { title: "Tokens", tone: "bg-warning/20" },
  { title: "Dark mode", tone: "bg-error/20" },
] as const;

export const Example = () => (
  <Carousel aria-label="Features" className="max-w-sm">
    {slides.map((slide) => (
      <div
        key={slide.title}
        className={`flex h-48 items-center justify-center font-semibold text-2xl ${slide.tone}`}
      >
        {slide.title}
      </div>
    ))}
  </Carousel>
);
