import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "woozui";

const products = [
  { title: "Analytics", description: "See how people use your app." },
  { title: "Automations", description: "Run tasks on a schedule." },
  { title: "Messaging", description: "Email, push and in-app." },
  { title: "Storage", description: "Files, backed up for you." },
] as const;

const resources = [
  { title: "Documentation", description: "Guides and API reference." },
  { title: "Changelog", description: "What shipped this week." },
] as const;

export const Example = () => (
  <NavigationMenu>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent className="grid w-96 grid-cols-2">
        {products.map((product) => (
          <NavigationMenuLink key={product.title} href="#/components">
            <p className="font-medium">{product.title}</p>
            <p className="text-foreground-dimmed">{product.description}</p>
          </NavigationMenuLink>
        ))}
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
      <NavigationMenuContent className="grid w-60">
        {resources.map((resource) => (
          <NavigationMenuLink key={resource.title} href="#/docs">
            <p className="font-medium">{resource.title}</p>
            <p className="text-foreground-dimmed">{resource.description}</p>
          </NavigationMenuLink>
        ))}
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink bare href="#/docs">
        Pricing
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenu>
);
