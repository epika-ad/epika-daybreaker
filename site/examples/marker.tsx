import {
  CircleCheckIcon,
  Marker,
  MarkerContent,
  MarkerIcon,
  SearchIcon,
} from "daybreaker";

export const Example = () => (
  <div className="grid w-full max-w-sm gap-4">
    <Marker variant="separator">
      <MarkerContent>Today</MarkerContent>
    </Marker>
    <Marker>
      <MarkerIcon>
        <SearchIcon />
      </MarkerIcon>
      <MarkerContent>Explored 4 files</MarkerContent>
    </Marker>
    <Marker variant="border">
      <MarkerIcon className="text-success">
        <CircleCheckIcon />
      </MarkerIcon>
      <MarkerContent>Ada joined the conversation</MarkerContent>
    </Marker>
    <Marker variant="separator" className="text-primary">
      <MarkerContent>New messages</MarkerContent>
    </Marker>
  </div>
);
