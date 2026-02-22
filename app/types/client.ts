import { Takedown } from "./takedown";

export type Client = {
  id: string;
  fullName: string;
  publicName: string;
  email: string;
  managementCompany?: string;
  takedowns: Takedown[];
};
