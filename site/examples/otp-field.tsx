import { OtpField } from "woozui";

export const Example = () => (
  <div className="grid justify-items-center gap-3">
    <OtpField aria-label="Verification code" />
    <p className="text-foreground-dimmed text-sm">
      Enter the 6-digit code we sent to your phone.
    </p>
  </div>
);
