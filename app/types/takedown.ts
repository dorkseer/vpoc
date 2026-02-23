export type ComplianceDetails = {
  draftedAt?: Date;
  sentAt?: Date;
  compliedAt?: Date;
  complianceStatus?: string;
};

export type TakedownStatus = "drafting" | "pending_review" | "notice_sent" | "notice_denied";

export type Takedown = {
  id: string;
  contentUrl: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  status: TakedownStatus;
  createdBy: string;
  history: string[];
  complianceDetails?: ComplianceDetails;
};
