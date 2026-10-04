import { Button, useToast } from "woozui";

export const Example = () => {
  const toast = useToast();

  return (
    <Button
      variant="outline"
      onClick={() =>
        toast.add({
          type: "success",
          title: "Changes saved",
          description: "Your profile is up to date.",
        })
      }
    >
      Show toast
    </Button>
  );
};
