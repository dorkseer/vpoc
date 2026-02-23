import { Takedown } from "./takedown";

export type Client = {
  id: string;
  fullName: string;
  publicName: string;
  email: string;
  managementCompany?: string;
  socialMedia?: SocialMediaLinks;
  takedowns: Takedown[];
};

export type SocialMediaLinks = {
  facebook?: string;
  instagram?: string;
  x?: string;
  youtube?: string;
  tiktok?: string;
  linkedin?: string;
  spotify?: string;
  soundcloud?: string;
  twitch?: string;
  reddit?: string;
};
