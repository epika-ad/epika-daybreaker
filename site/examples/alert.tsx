import { Alert, AlertDescription, AlertTitle } from "daybreaker";

export const Example = () => (
  <div className="grid w-72 gap-3">
    <Alert>
      <AlertTitle>New version available</AlertTitle>
      <AlertDescription>Restart to install version 2.4.</AlertDescription>
    </Alert>
    <Alert variant="success">
      <AlertTitle>Payment received</AlertTitle>
      <AlertDescription>Your receipt is on its way.</AlertDescription>
    </Alert>
    <Alert variant="warning">
      <AlertTitle>Trial ends in 3 days</AlertTitle>
      <AlertDescription>Upgrade to keep your projects.</AlertDescription>
    </Alert>
    <Alert variant="error">
      <AlertTitle>Card declined</AlertTitle>
      <AlertDescription>Update your payment method.</AlertDescription>
    </Alert>
  </div>
);
