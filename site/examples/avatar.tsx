import { Avatar, AvatarFallback, AvatarImage } from "daybreaker";

const team = ["AL", "MV", "JK", "+3"] as const;

export const Example = () => (
  <div className="grid justify-items-center gap-5">
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
    <div className="flex -space-x-2">
      {team.map((initials) => (
        <Avatar key={initials} className="ring-2 ring-background">
          <AvatarFallback className="bg-background-dimmed">
            {initials}
          </AvatarFallback>
        </Avatar>
      ))}
    </div>
  </div>
);
