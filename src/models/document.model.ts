export interface Draft {
  id?: number;
  documentId?: number;
  title: string;
  content: string;
  creationDate: Date;
  creatorId: number;
  lastUpdatedDate: Date;
  lastUpdateAuthorId: number;
}

export interface Document {
  id?: number;
  draftId?: string;
}
