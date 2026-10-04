import { Badge } from "woozui";

export const Example = () => (
  <div className="flex max-w-64 flex-wrap justify-center gap-2">
    <Badge>Primary</Badge>
    <Badge variant="secondary">Secondary</Badge>
    <Badge variant="outline">Outline</Badge>
    <Badge variant="success">Success</Badge>
    <Badge variant="warning">Warning</Badge>
    <Badge variant="error">Error</Badge>
  </div>
);
