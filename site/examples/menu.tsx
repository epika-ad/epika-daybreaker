import { useState } from "react";
import {
  Button,
  CopyIcon,
  Menu,
  MenuCheckboxItem,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuPopup,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuTrigger,
  PencilIcon,
  ShareIcon,
  TrashIcon,
} from "daybreaker";

const countries = [
  { code: "al", name: "Albania" },
  { code: "de", name: "Germany" },
  { code: "it", name: "Italy" },
  { code: "jp", name: "Japan" },
  { code: "gb", name: "United Kingdom" },
  { code: "us", name: "United States" },
] as const;

const Flag = ({ code }: { code: string }) => (
  <img
    src={`https://flagcdn.com/${code}.svg`}
    alt=""
    className="size-5 shrink-0 rounded-full object-cover"
  />
);

const Basic = () => (
  <Menu>
    <MenuTrigger render={<Button variant="outline" />}>Options</MenuTrigger>
    <MenuPopup>
      <MenuItem>Rename</MenuItem>
      <MenuItem>Duplicate</MenuItem>
      <MenuSeparator />
      <MenuItem destructive>Delete</MenuItem>
    </MenuPopup>
  </Menu>
);

const WithIcons = () => (
  <Menu>
    <MenuTrigger render={<Button variant="outline" />}>Actions</MenuTrigger>
    <MenuPopup>
      <MenuItem>
        <PencilIcon />
        Rename
      </MenuItem>
      <MenuItem>
        <CopyIcon />
        Duplicate
      </MenuItem>
      <MenuItem>
        <ShareIcon />
        Share
      </MenuItem>
      <MenuSeparator />
      <MenuItem destructive>
        <TrashIcon />
        Delete
      </MenuItem>
    </MenuPopup>
  </Menu>
);

const Selectable = () => (
  <Menu>
    <MenuTrigger render={<Button variant="outline" />}>View</MenuTrigger>
    <MenuPopup>
      <MenuGroup>
        <MenuGroupLabel>Show</MenuGroupLabel>
        <MenuCheckboxItem defaultChecked>Sidebar</MenuCheckboxItem>
        <MenuCheckboxItem>Status bar</MenuCheckboxItem>
      </MenuGroup>
      <MenuSeparator />
      <MenuGroup>
        <MenuGroupLabel>Sort by</MenuGroupLabel>
        <MenuRadioGroup defaultValue="name">
          <MenuRadioItem value="name">Name</MenuRadioItem>
          <MenuRadioItem value="date">Date modified</MenuRadioItem>
          <MenuRadioItem value="size">Size</MenuRadioItem>
        </MenuRadioGroup>
      </MenuGroup>
    </MenuPopup>
  </Menu>
);

const Countries = () => {
  const [code, setCode] = useState<string>("al");
  const selected = countries.find((country) => country.code === code);

  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>
        <Flag code={code} />
        {selected?.name}
      </MenuTrigger>
      <MenuPopup>
        <MenuRadioGroup value={code} onValueChange={setCode}>
          {countries.map((country) => (
            <MenuRadioItem key={country.code} value={country.code} closeOnClick>
              <Flag code={country.code} />
              {country.name}
            </MenuRadioItem>
          ))}
        </MenuRadioGroup>
      </MenuPopup>
    </Menu>
  );
};

export const Example = () => (
  <div className="flex flex-wrap items-center justify-center gap-3">
    <Basic />
    <WithIcons />
    <Selectable />
    <Countries />
  </div>
);
