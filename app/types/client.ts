export type Takedown = {
  id: string;
  contentUrl: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
};

export type Client = {
  id: string;
  fullName: string;
  publicName: string;
  email: string;
  managementCompany?: string;
  takedowns: Takedown[];
};
