import { useState } from "react";
import {
  Button,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Form,
  Input,
} from "daybreaker";

export const Example = () => {
  const [sent, setSent] = useState<string | null>(null);

  return (
    <Form
      className="w-64"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setSent(String(data.get("email")));
      }}
    >
      <Field name="name">
        <FieldLabel>Name</FieldLabel>
        <Input required placeholder="Ada Lovelace" />
        <FieldError />
      </Field>
      <Field name="email">
        <FieldLabel>Email</FieldLabel>
        <Input required type="email" placeholder="you@example.com" />
        <FieldDescription>Submit it empty to see the errors.</FieldDescription>
        <FieldError />
      </Field>
      <Button type="submit">Create account</Button>
      {sent && (
        <p role="status" className="text-sm text-success">
          Invite sent to {sent}
        </p>
      )}
    </Form>
  );
};
