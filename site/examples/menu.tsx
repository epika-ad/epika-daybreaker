import {
  Button,
  Menu,
  MenuCheckboxItem,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuTrigger,
} from "woozui";

export const Example = () => (
  <Menu>
    <MenuTrigger render={<Button variant="outline" />}>Options</MenuTrigger>
    <MenuPopup>
      <MenuItem>Rename</MenuItem>
      <MenuItem>Duplicate</MenuItem>
      <MenuCheckboxItem defaultChecked>Pinned</MenuCheckboxItem>
      <MenuSeparator />
      <MenuItem destructive>Delete</MenuItem>
    </MenuPopup>
  </Menu>
);
