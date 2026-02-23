export type ComplianceDetails = {
  draftedAt?: Date;
  sentAt?: Date;
  compliedAt?: Date;
  complianceStatus?: string;
};

export type Takedown = {
  id: string;
  contentUrl: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  createdBy: string;
  history: string[];
  complianceDetails?: ComplianceDetails;
};
