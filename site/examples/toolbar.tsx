import {
  CopyIcon,
  ShareIcon,
  Toggle,
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
  TrashIcon,
} from "woozui";

export const Example = () => (
  <Toolbar aria-label="Formatting">
    <ToolbarGroup aria-label="Text style">
      <ToolbarButton
        render={<Toggle defaultPressed />}
        aria-label="Bold"
        className="font-bold"
      >
        B
      </ToolbarButton>
      <ToolbarButton render={<Toggle />} aria-label="Italic" className="italic">
        I
      </ToolbarButton>
      <ToolbarButton
        render={<Toggle />}
        aria-label="Underline"
        className="underline"
      >
        U
      </ToolbarButton>
    </ToolbarGroup>
    <ToolbarSeparator />
    <ToolbarButton aria-label="Copy">
      <CopyIcon />
    </ToolbarButton>
    <ToolbarButton aria-label="Share">
      <ShareIcon />
    </ToolbarButton>
    <ToolbarSeparator />
    <ToolbarButton aria-label="Delete" className="hover:text-error">
      <TrashIcon />
    </ToolbarButton>
  </Toolbar>
);
