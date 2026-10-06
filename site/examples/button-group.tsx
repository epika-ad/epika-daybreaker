import {
  Button,
  ButtonGroup,
  ChevronDownIcon,
  CopyIcon,
  PencilIcon,
  TrashIcon,
} from "woozui";

export const Example = () => (
  <div className="grid justify-items-center gap-4">
    <ButtonGroup aria-label="Document actions">
      <Button variant="outline">
        <PencilIcon />
        Edit
      </Button>
      <Button variant="outline">
        <CopyIcon />
        Copy
      </Button>
      <Button variant="outline">
        <TrashIcon />
        Delete
      </Button>
    </ButtonGroup>
    <ButtonGroup aria-label="Save">
      <Button>Save changes</Button>
      <Button size="icon" aria-label="More save options">
        <ChevronDownIcon />
      </Button>
    </ButtonGroup>
  </div>
);
