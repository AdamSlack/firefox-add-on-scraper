export type SearchResults = {
  page_size: number;
  page_count: number;
  next: string | null;
  previous: string | null;
  results: SearchResult[];
}

export type SearchResult = {
  id: number,
  authors: Author[]
  average_daily_users: number;
  categories: Record<string, string[]>;
  contributions_url: string,
  created: string;
  current_version: Version;
  default_locale: string;
  description: Record<string, string>;
  developer_comments: string | null;
  edit_url: string;
  guid: string;
  has_eula: boolean;
  has_privacy_policy: boolean;
  homepage: string | null;
  icon_url: string;
  icons: Record<string, string>
  is_disabled: boolean;
  is_experimental: boolean;
  last_updated: boolean;
  name: Record<string, string>;
  previews: Preview[];
  promoted: boolean | null;
  ratings: Ratings;
  ratings_url: string;
  requires_payment: boolean;
  review_url: string;
  slug: string;
  status: string;
  summary: Record<string, string>;
  support_email: string | null;
  support_url: string | null;
  tags: string[];
  type: string;
  url: string;
  versions_url: string;
  weekly_downloads: number;
  _score: number;
}

export type Author = {
  id: number;
  name: string;
  url: string;
  username: string;
};

export type Version = {
  id: number;
  compatibility: Record<string, { min: string; max: string; }>;
  edit_url: string;
  file: FileDetails;
  is_strict_compatibility_enabled: boolean;
  license: License;
  release_notes: string | null;
  reviewed: string | null;
  version: string;
}

export type FileDetails = {
  id: number;
  created: string;
  hash: string;
  is_mozilla_signed_extension: boolean;
  size: number;
  status: string;
  url: string;
  permissions: string[];
  optional_permissions: string[];
}

export type License = {
  id: number;
  is_custom: boolean;
  name: Record<string, string>;
  url: string;
}

export type Preview = {
  id: number;
  caption: string | null;
  image_size: [x: number, y: number];
  image_url: string;
  thumbnail_size: [x: number, y: number];
  thumbnail_url: string;
}

export type Ratings = {
  average: number;
  bayesian_average: number;
  count: number;
  text_count: number;
}