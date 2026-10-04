import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "woozui";

export const Example = () => (
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
);
