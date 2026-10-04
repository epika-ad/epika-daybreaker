import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogTrigger,
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
  Menu,
  MenuCheckboxItem,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuTrigger,
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
  useToast,
} from "..";

const meta = { title: "Components/Overlays" } satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DialogModal: Story = {
  render: () => (
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
  ),
};

export const Confirmation: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" />}>
        Delete project
      </AlertDialogTrigger>
      <AlertDialogPopup>
        <AlertDialogTitle>Delete this project?</AlertDialogTitle>
        <AlertDialogDescription>
          This removes the project and its files. It cannot be undone.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogClose render={<Button variant="ghost" />}>
            Cancel
          </AlertDialogClose>
          <AlertDialogClose render={<Button variant="destructive" />}>
            Delete
          </AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  ),
};

export const PopoverPanel: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Details
      </PopoverTrigger>
      <PopoverPopup>
        <PopoverTitle>Storage</PopoverTitle>
        <PopoverDescription>
          6.4 GB of 10 GB used across 3 projects.
        </PopoverDescription>
      </PopoverPopup>
    </Popover>
  ),
};

export const TooltipHint: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>
        Hover me
      </TooltipTrigger>
      <TooltipPopup>Saves your changes</TooltipPopup>
    </Tooltip>
  ),
};

export const DropdownMenu: Story = {
  render: () => (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Options</MenuTrigger>
      <MenuPopup>
        <MenuGroup>
          <MenuGroupLabel>Project</MenuGroupLabel>
          <MenuItem>Rename</MenuItem>
          <MenuItem>Duplicate</MenuItem>
          <MenuCheckboxItem defaultChecked>Pinned</MenuCheckboxItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuItem destructive>Delete</MenuItem>
      </MenuPopup>
    </Menu>
  ),
};

const types = ["success", "error", "warning", "info"] as const;

const ToastButtons = () => {
  const toast = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      {types.map((type) => (
        <Button
          key={type}
          variant="outline"
          onClick={() =>
            toast.add({
              type,
              title: `A ${type} toast`,
              description: "It dismisses itself after five seconds.",
            })
          }
        >
          {type}
        </Button>
      ))}
    </div>
  );
};

export const Toasts: Story = { render: () => <ToastButtons /> };
