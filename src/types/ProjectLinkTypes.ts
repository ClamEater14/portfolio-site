/** Stable CMS values; these are independent of React component names. */
export const PROJECT_LINK_ICON_KEYS = ["github", "link", "globe", "book", "download", "video"] as const;

export type ProjectLinkIcon = (typeof PROJECT_LINK_ICON_KEYS)[number];

export const DEFAULT_PROJECT_LINK_ICON: ProjectLinkIcon = "link";

/** Content fields for one entry in the ordered project links array. */
export interface ProjectLink {
  /** Required, trimmed destination label (1–80 characters). */
  label: string;
  /** Required, trimmed absolute HTTP or HTTPS URL. */
  url: string;
  /** Required CMS selection, defaulting to DEFAULT_PROJECT_LINK_ICON. */
  icon: ProjectLinkIcon;
}

/** Strapi adds a component ID to each persisted link entry. */
export interface ProjectLinkCollection extends ProjectLink {
  id: number;
}
