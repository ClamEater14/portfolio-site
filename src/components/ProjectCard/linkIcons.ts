import { DEFAULT_PROJECT_LINK_ICON, type ProjectLinkIcon } from "../../types/ProjectLinkTypes";
import * as Icons from "../Icons";

const projectLinkIcons = {
  github: Icons.GitHub,
  link: Icons.Link45Degrees,
  globe: Icons.Globe,
  book: Icons.Book,
  download: Icons.Download,
  video: Icons.PlayButton,
} satisfies Record<ProjectLinkIcon, Icons.Icon>;

export function getProjectLinkIcon(key: unknown): Icons.Icon {
  if (typeof key === "string" && Object.hasOwn(projectLinkIcons, key)) {
    return projectLinkIcons[key as ProjectLinkIcon];
  }

  return projectLinkIcons[DEFAULT_PROJECT_LINK_ICON];
}
