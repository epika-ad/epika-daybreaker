import { Alert, AlertDescription, AlertTitle } from "woozui";

export const Example = () => (
  <div className="grid w-72 gap-3">
    <Alert variant="success">
      <AlertTitle>Payment received</AlertTitle>
      <AlertDescription>Your receipt is on its way.</AlertDescription>
    </Alert>
    <Alert variant="warning">
      <AlertTitle>Trial ends in 3 days</AlertTitle>
      <AlertDescription>Upgrade to keep your projects.</AlertDescription>
    </Alert>
  </div>
);
