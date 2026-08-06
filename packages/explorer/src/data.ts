import { ExplorerItem } from "./types";

export const explorer: ExplorerItem[] = [
  {
    id: "src",
    name: "src",
    type: "folder",
    children: [
      {
        id: "app",
        name: "app",
        type: "folder",
        children: [
          {
            id: "page",
            name: "page.tsx",
            type: "file"
          }
        ]
      }
    ]
  },
  {
    id: "package",
    name: "package.json",
    type: "file"
  }
];
