import {
  Button,
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "woozui";

export const Example = () => (
  <Drawer>
    <DrawerTrigger render={<Button variant="outline" />}>
      Open sheet
    </DrawerTrigger>
    <DrawerPopup>
      <DrawerTitle>Share this project</DrawerTitle>
      <DrawerDescription>
        Anyone with the link can view it. Swipe down to dismiss.
      </DrawerDescription>
      <div className="grid gap-2">
        <Button>Copy link</Button>
        <DrawerClose render={<Button variant="secondary" />}>
          Cancel
        </DrawerClose>
      </div>
    </DrawerPopup>
  </Drawer>
);
