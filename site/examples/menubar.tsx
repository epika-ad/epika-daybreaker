import {
  Menu,
  Menubar,
  MenubarTrigger,
  MenuCheckboxItem,
  MenuItem,
  MenuPopup,
  MenuSeparator,
} from "woozui";

export const Example = () => (
  <Menubar>
    <Menu>
      <MenubarTrigger>File</MenubarTrigger>
      <MenuPopup align="start">
        <MenuItem>New file</MenuItem>
        <MenuItem>Open…</MenuItem>
        <MenuItem>Save</MenuItem>
        <MenuSeparator />
        <MenuItem>Print…</MenuItem>
      </MenuPopup>
    </Menu>
    <Menu>
      <MenubarTrigger>Edit</MenubarTrigger>
      <MenuPopup align="start">
        <MenuItem>Undo</MenuItem>
        <MenuItem>Redo</MenuItem>
        <MenuSeparator />
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Paste</MenuItem>
      </MenuPopup>
    </Menu>
    <Menu>
      <MenubarTrigger>View</MenubarTrigger>
      <MenuPopup align="start">
        <MenuCheckboxItem defaultChecked>Sidebar</MenuCheckboxItem>
        <MenuCheckboxItem>Status bar</MenuCheckboxItem>
        <MenuSeparator />
        <MenuItem>Enter full screen</MenuItem>
      </MenuPopup>
    </Menu>
  </Menubar>
);
