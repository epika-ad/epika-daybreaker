# daybreaker tokens

Override any `--wz-*` variable to rebrand. Components read only these, so light and dark follow for free. In Tailwind, colours are available as `bg-*`, `text-*`, `border-*` and so on (for example `bg-primary`, `text-foreground-dimmed`, `border-border`).

| Variable | Tailwind | Light | Dark |
| --- | --- | --- | --- |
| `--wz-background` | `*-background` | `#f7f6f4` | `#14021a` |
| `--wz-background-dimmed` | `*-background-dimmed` | `oklch(0.935 0.008 325)` | `#270a30` |
| `--wz-foreground` | `*-foreground` | `#350a3f` | `#f7f6f4` |
| `--wz-foreground-dimmed` | `*-foreground-dimmed` | `oklch(0.45 0.06 325)` | `oklch(0.76 0.035 325)` |
| `--wz-primary` | `*-primary` | `#ee1c4d` | `#ee1c4d` |
| `--wz-primary-dimmed` | `*-primary-dimmed` | `#d3103f` | `#f4456d` |
| `--wz-primary-foreground` | `*-primary-foreground` | `oklch(1 0 0)` | `oklch(1 0 0)` |
| `--wz-accent` | `*-accent` | `oklch(0.4 0.1 325 / 0.11)` | `oklch(0.7 0.08 325 / 0.2)` |
| `--wz-border` | `*-border` | `oklch(0.3 0.1 325 / 0.2)` | `oklch(0.75 0.07 325 / 0.26)` |
| `--wz-ring` | `*-ring` | `#ee1c4d` | `#f4456d` |
| `--wz-error` | `*-error` | `oklch(0.55 0.2 40)` | `oklch(0.72 0.17 45)` |
| `--wz-error-foreground` | `*-error-foreground` | `oklch(0.985 0 0)` | `oklch(0.15 0 0)` |
| `--wz-success` | `*-success` | `oklch(0.5 0.14 150)` | `oklch(0.78 0.16 150)` |
| `--wz-warning` | `*-warning` | `oklch(0.5 0.13 70)` | `oklch(0.82 0.15 80)` |
| `--wz-chart-1` | `*-chart-1` | `#ee1c4d` | `same` |
| `--wz-chart-2` | `*-chart-2` | `oklch(0.55 0.19 320)` | `oklch(0.72 0.16 320)` |
| `--wz-chart-3` | `*-chart-3` | `oklch(0.75 0.16 65)` | `same` |
| `--wz-chart-4` | `*-chart-4` | `oklch(0.7 0.14 190)` | `same` |
| `--wz-chart-5` | `*-chart-5` | `oklch(0.6 0.2 257)` | `same` |
| `--wz-radius` | `rounded-control` | `0.875rem` | `same` |

Radii from `--wz-radius`: `rounded-control` (the radius), `rounded-item` (radius − 4px, for items inside a surface) and `rounded-surface` (radius × 1.75, for cards and panels).

Easings: `ease-spring` (quick rise with overshoot), `ease-glide` (damped spring, for things that travel) and `ease-smooth` (no overshoot, for sizes).

`accent` and `border` are translucent on purpose, so they sit on any background.
