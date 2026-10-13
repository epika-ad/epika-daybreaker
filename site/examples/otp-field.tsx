import { Button, OtpField } from "daybreaker";
import { useState } from "react";

const messages = {
  idle: "Enter 123456 to pass, anything else to fail.",
  success: "Code accepted. You're signed in.",
  error: "That code is wrong. Try again.",
} as const;

export const Example = () => {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<keyof typeof messages>("idle");

  const check = (code: string) => {
    if (code === "123456") return setStatus("success");
    setStatus("error");
    // leave the rejection on screen for a moment, then clear for another try
    setTimeout(() => {
      setValue("");
      setStatus("idle");
    }, 1400);
  };

  const reset = () => {
    setValue("");
    setStatus("idle");
  };

  return (
    <div className="grid justify-items-center gap-4">
      <OtpField
        aria-label="Verification code"
        value={value}
        onValueChange={setValue}
        onValueComplete={check}
        status={status}
        readOnly={status !== "idle"}
      />
      <p role="status" className="text-foreground-dimmed text-sm">
        {messages[status]}
      </p>
      {status === "success" && (
        <Button variant="ghost" size="sm" onClick={reset}>
          Start over
        </Button>
      )}
    </div>
  );
};
