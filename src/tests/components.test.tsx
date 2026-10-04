import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
  Alert,
  AlertTitle,
  Button,
  Checkbox,
  Dialog,
  DialogDescription,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
  Slider,
  Switch,
  Tab,
  Tabs,
  TabsList,
  TabsPanel,
  ThemeProvider,
  ToastProvider,
  useTheme,
  useToast,
} from "..";
import { cn } from "../utils";

describe("cn", () => {
  it("lets later utilities override earlier ones", () => {
    expect(cn("px-2 text-sm", "px-4")).toBe("text-sm px-4");
  });

  it("understands the library's own radius tokens", () => {
    expect(cn("rounded-control", "rounded-none")).toBe("rounded-none");
  });
});

describe("Button", () => {
  it("calls onClick", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);

    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("blocks clicks and reports busy while loading", async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Save
      </Button>,
    );
    const button = screen.getByRole("button", { name: /Save/ });

    await userEvent.click(button);

    expect(onClick).not.toHaveBeenCalled();
    expect(button).toHaveAttribute("aria-busy", "true");
  });

  it("merges a custom className over the variant classes", () => {
    render(<Button className="h-20">Tall</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("h-20");
    expect(button).not.toHaveClass("h-9");
  });
});

describe("Checkbox", () => {
  it("toggles and reports the new value", async () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox aria-label="Agree" onCheckedChange={onCheckedChange} />);
    const checkbox = screen.getByRole("checkbox", { name: "Agree" });

    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(onCheckedChange.mock.calls[0]?.[0]).toBe(true);
  });
});

describe("Switch", () => {
  it("toggles with the keyboard", async () => {
    render(<Switch aria-label="Notifications" />);
    const control = screen.getByRole("switch", { name: "Notifications" });

    await userEvent.tab();
    await userEvent.keyboard(" ");

    expect(control).toBeChecked();
  });
});

describe("Slider", () => {
  it("renders one thumb per value", () => {
    render(<Slider defaultValue={[20, 70]} aria-label="Range" />);

    expect(screen.getAllByRole("slider")).toHaveLength(2);
  });
});

describe("Dialog", () => {
  it("opens from its trigger and closes with the close button", async () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogPopup>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Adjust things.</DialogDescription>
        </DialogPopup>
      </Dialog>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Open" }));

    expect(screen.getByRole("dialog", { name: "Settings" })).toBeVisible();

    await userEvent.click(screen.getByRole("button", { name: "Close" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("Tabs", () => {
  it("shows the panel of the selected tab", async () => {
    render(
      <Tabs defaultValue="one">
        <TabsList>
          <Tab value="one">One</Tab>
          <Tab value="two">Two</Tab>
        </TabsList>
        <TabsPanel value="one">First panel</TabsPanel>
        <TabsPanel value="two">Second panel</TabsPanel>
      </Tabs>,
    );
    expect(screen.getByText("First panel")).toBeVisible();

    await userEvent.click(screen.getByRole("tab", { name: "Two" }));

    expect(screen.getByText("Second panel")).toBeVisible();
    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });
});

describe("Accordion", () => {
  it("expands a panel when its trigger is clicked", async () => {
    render(
      <Accordion>
        <AccordionItem>
          <AccordionTrigger>Question</AccordionTrigger>
          <AccordionPanel>Answer</AccordionPanel>
        </AccordionItem>
      </Accordion>,
    );
    const trigger = screen.getByRole("button", { name: "Question" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Answer")).toBeVisible();
  });
});

describe("Alert", () => {
  it("is announced as an alert", () => {
    render(
      <Alert variant="error">
        <AlertTitle>Payment failed</AlertTitle>
      </Alert>,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Payment failed");
  });
});

describe("Toast", () => {
  it("shows a toast added through useToast", async () => {
    const Trigger = () => {
      const toast = useToast();
      return (
        <button type="button" onClick={() => toast.add({ title: "Saved" })}>
          Notify
        </button>
      );
    };
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );

    await userEvent.click(screen.getByRole("button", { name: "Notify" }));

    expect(await screen.findByText("Saved")).toBeInTheDocument();
  });
});

describe("ThemeProvider", () => {
  const Toggle = () => {
    const [theme, setTheme] = useTheme();
    return (
      <button type="button" onClick={() => setTheme("dark")}>
        {theme}
      </button>
    );
  };

  it("applies the dark class when the theme changes", async () => {
    render(
      <ThemeProvider defaultTheme="light" storageKey="test-theme">
        <Toggle />
      </ThemeProvider>,
    );
    expect(document.documentElement).not.toHaveClass("dark");

    await userEvent.click(screen.getByRole("button", { name: "light" }));

    expect(document.documentElement).toHaveClass("dark");
    expect(window.localStorage.getItem("test-theme")).toBe("dark");
  });

  it("throws a clear error when useTheme has no provider", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<Toggle />)).toThrow(
      "useTheme must be used within a ThemeProvider",
    );
  });
});
