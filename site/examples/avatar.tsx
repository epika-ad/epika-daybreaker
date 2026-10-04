import { Avatar, AvatarFallback, AvatarImage } from "woozui";

export const Example = () => (
  <div className="flex items-center gap-3">
    <Avatar size="sm">
      <AvatarFallback>AL</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarImage src="https://github.com/wooz-05.png" alt="wooz-05" />
      <AvatarFallback>WZ</AvatarFallback>
    </Avatar>
    <Avatar size="lg">
      <AvatarFallback>GH</AvatarFallback>
    </Avatar>
  </div>
);
