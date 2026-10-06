import { useState } from "react";
import {
  BellIcon,
  Button,
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarLink,
  NavbarLinks,
  SearchIcon,
} from "woozui";

const links = ["Home", "Products", "Pricing", "Docs"] as const;

export const Example = () => {
  const [current, setCurrent] = useState<string>("Home");

  return (
    <Navbar className="max-w-2xl">
      <NavbarBrand href="#/components/navbar">
        <span className="size-5 rounded-full bg-primary" />
        Acme
      </NavbarBrand>
      <NavbarLinks className="max-sm:hidden">
        {links.map((link) => (
          <NavbarLink
            key={link}
            href="#/components/navbar"
            current={link === current}
            onClick={() => setCurrent(link)}
          >
            {link}
          </NavbarLink>
        ))}
      </NavbarLinks>
      <NavbarActions>
        <Button variant="ghost" size="icon" aria-label="Search">
          <SearchIcon />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <BellIcon />
        </Button>
        <Button size="sm">Sign in</Button>
      </NavbarActions>
    </Navbar>
  );
};
