import { Button, useToast } from "daybreaker";

const toasts = [
  {
    type: "success",
    title: "Changes saved",
    description: "Your profile is up to date.",
  },
  {
    type: "info",
    title: "Update available",
    description: "Restart to install version 2.4.",
  },
  {
    type: "warning",
    title: "Storage almost full",
    description: "You have used 9.4 of 10 GB.",
  },
  {
    type: "error",
    title: "Upload failed",
    description: "Check your connection and try again.",
  },
] as const;

export const Example = () => {
  const toast = useToast();

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {toasts.map((entry) => (
        <Button
          key={entry.type}
          variant="outline"
          className="capitalize"
          onClick={() => toast.add(entry)}
        >
          {entry.type}
        </Button>
      ))}
    </div>
  );
};
