import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  FileIcon,
  XIcon,
} from "woozui";

const files = [
  { name: "sales-dashboard.pdf", detail: "PDF · 2.4 MB", state: "done" },
  { name: "q3-forecast.xlsx", detail: "Uploading… 62%", state: "uploading" },
  { name: "raw-export.csv", detail: "Too large to upload", state: "error" },
] as const;

export const Example = () => (
  <div className="grid w-full max-w-sm gap-4">
    <div className="grid gap-2">
      {files.map((file) => (
        <Attachment key={file.name} state={file.state} className="w-full">
          <AttachmentMedia>
            <FileIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{file.name}</AttachmentTitle>
            <AttachmentDescription>{file.detail}</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label={`Remove ${file.name}`}>
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      ))}
    </div>
    <AttachmentGroup>
      {["us", "jp", "it"].map((code) => (
        <Attachment key={code} orientation="vertical">
          <AttachmentMedia>
            <img src={`https://flagcdn.com/${code}.svg`} alt="" />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{code}.svg</AttachmentTitle>
            <AttachmentDescription>Image</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label={`Remove ${code}.svg`}>
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      ))}
    </AttachmentGroup>
  </div>
);
