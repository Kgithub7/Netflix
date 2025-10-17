export interface VideosResponse {
  id?: number;
  results?: Video[];
  success?: boolean;
  status_code?: number;
  status_message?: string;
}

export interface Video {
  iso_639_1: ISO639_1 | string;
  iso_3166_1: ISO3166_1;
  name: string;
  key: string;
  site: Site;
  size: number;
  type: string;
  official: boolean;
  published_at: Date;
  id: string;
}

export type ISO3166_1 = "US";

export type ISO639_1 = "en";

export type Site = "YouTube";
