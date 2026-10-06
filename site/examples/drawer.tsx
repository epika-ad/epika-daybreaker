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
  <div className="flex flex-wrap justify-center gap-2">
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>
        Bottom sheet
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
    <Drawer swipeDirection="right">
      <DrawerTrigger render={<Button variant="outline" />}>
        Side panel
      </DrawerTrigger>
      <DrawerPopup side="right">
        <DrawerTitle>Filters</DrawerTitle>
        <DrawerDescription>
          A panel attached to the right edge. Swipe right to dismiss.
        </DrawerDescription>
        <DrawerClose render={<Button variant="secondary" />}>Done</DrawerClose>
      </DrawerPopup>
    </Drawer>
  </div>
);
