import cluster, { Worker } from "cluster";
import os from "os";
import { Context } from "koa";
import database from "../database/database.connector";
import { Document } from "../models/document.model";

class DocumentService {
  public async getDocument(ctx: Context): Promise<void> {
    try {
      const { id } = ctx.params;

      const existingDocument = await database.getDocument(id);

      if (!existingDocument) {
        ctx.status = 404;
        ctx.body = { error: "Draft not found" };
        return;
      }

      ctx.status = 200;
      ctx.body = { message: "Draft served successfully", existingDocument };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: "Internal server error" };
    }
  }

  public async getDocuments(ctx: Context): Promise<void> {
    try {
      const existingDocuments = await database.getDocuments();

      if (!existingDocuments) {
        ctx.status = 404;
        ctx.body = { error: "Draft not found" };
        return;
      }

      ctx.status = 200;
      ctx.body = { message: "Draft served successfully", existingDocuments };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: "Internal server error" };
    }
  }

  public async getDocumentDrafts(ctx: Context): Promise<void> {
    try {
      const { id: documentId } = ctx.params;

      const drafts = await database.getDocumentDrafts(documentId);
      if (!drafts) {
        ctx.status = 404;
        ctx.body = { error: "Drafts not found" };
        return;
      }

      ctx.status = 200;
      ctx.body = { message: "Draft served successfully", drafts };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: "Internal server error" };
    }
  }
}

const documentService = new DocumentService();

export { documentService };
