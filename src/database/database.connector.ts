import { Draft, Document } from "../models/document.model";

class DatabaseConnector {
  private documents: Document[] = [];
  private drafts: Draft[] = [];

  createDraft(draft: Draft, documentId: number | undefined = undefined): Draft {
    const newDruftId = this.drafts.length === 0 ? 1 : this.drafts.length + 1;

    if (documentId) {
      this.drafts.push({ ...draft, id: newDruftId, documentId: documentId });
    } else {
      const newDocumentId =
        this.documents.length === 0 ? 1 : this.documents.length + 1;
      this.documents.push({ id: newDocumentId, draftId: undefined });
      this.drafts.push({ ...draft, id: newDruftId, documentId: newDocumentId });
    }

    return this.getDraft(newDruftId)!;
  }

  updateDraft(draftId: number, updatedData: Partial<Draft>): void {
    const draft = this.drafts.find((draft) => draft.id == draftId);
    if (draft) {
      Object.assign(draft, updatedData);
    }
  }

  getDraft(draftId: number): Draft | undefined {
    return this.drafts.find((draft) => draft.id == draftId);
  }

  getDocumentDrafts(documentId: number): Document[] | undefined {
    return this.drafts.filter((draft) => draft.documentId == documentId);
  }

  getDocument(documentId: number): Document | undefined {
    console.log("I'm in getDocument");

    return this.documents.find((doc) => doc.id == documentId && doc.draftId);
  }

  publishDraft(draftId: number): number | undefined {
    const currentDraft = this.getDraft(draftId);
    if (currentDraft) {
      const relatedDocument = this.getDocument(
        currentDraft.documentId!
      ) as Document;
      Object.assign(relatedDocument, { ...relatedDocument, draftId });
      return draftId;
    }
    return undefined;
  }

  getDocuments(): Document[] {
    console.log("I'm in getDocuments");

    // TODO: add pagination
    return this.documents.filter((doc) => doc.draftId);
  }
}

export default new DatabaseConnector();
