import { Field, FieldDescription, FieldLabel, Input } from "woozui";

export const Example = () => (
  <Field className="w-64">
    <FieldLabel>Email</FieldLabel>
    <Input type="email" placeholder="you@example.com" />
    <FieldDescription>We only use it to sign you in.</FieldDescription>
  </Field>
);
