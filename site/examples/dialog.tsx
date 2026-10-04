import {
  Button,
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldLabel,
  Input,
} from "woozui";

export const Example = () => (
  <Dialog>
    <DialogTrigger render={<Button variant="outline" />}>
      Edit profile
    </DialogTrigger>
    <DialogPopup>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Changes are visible to everyone on your team.
      </DialogDescription>
      <Field>
        <FieldLabel>Display name</FieldLabel>
        <Input defaultValue="Ada Lovelace" />
      </Field>
      <DialogFooter>
        <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
        <DialogClose render={<Button />}>Save</DialogClose>
      </DialogFooter>
    </DialogPopup>
  </Dialog>
);
