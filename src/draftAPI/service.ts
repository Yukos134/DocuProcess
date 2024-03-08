import { Context } from "koa";
import database from "../database/database.connector";
import { Draft } from "../models/document.model";
import { DocumentData } from "../types";

class DraftService {
  public async createDraft(ctx: Context): Promise<void> {
    try {
      console.log("DraftService ctx=", ctx);

      const { title, content, creatorId, documentId } = ctx.request
        .body as DocumentData;
      console.log("DraftService title=", title);

      const draft: Draft = {
        title,
        content,
        creationDate: new Date(),
        creatorId,
        lastUpdatedDate: new Date(),
        lastUpdateAuthorId: creatorId,
      };
      console.log("DraftService draft=", draft);

      const createdDraft = await database.createDraft(draft, documentId);
      ctx.status = 201;
      ctx.body = { message: "Draft created successfully", createdDraft };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: "Internal server Error" };
    }
  }

  public async updateDraft(ctx: Context): Promise<void> {
    try {
      const { id } = ctx.params;
      const {
        title,
        content,
        creatorId: userId,
      } = ctx.request.body as DocumentData;

      const existingDraft = await database.getDraft(id);
      if (!existingDraft) {
        ctx.status = 404;
        ctx.body = { error: "Draft not found" };
        return;
      }

      const updatedDraft: Draft = {
        ...existingDraft,
        title: title ?? existingDraft.title,
        content: content ?? existingDraft.content,
        lastUpdatedDate: new Date(),
        lastUpdateAuthorId: userId ?? existingDraft.lastUpdateAuthorId,
      };

      await database.updateDraft(id, updatedDraft);

      ctx.status = 200;
      ctx.body = { message: "Draft updated successfully", updatedDraft };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: "Internal server error" };
    }
  }

  public async getDraft(ctx: Context): Promise<void> {
    try {
      const { id } = ctx.params;

      const existingDraft = await database.getDraft(id);

      if (!existingDraft) {
        ctx.status = 404;
        ctx.body = { error: "Draft not found" };
        return;
      }

      ctx.status = 200;
      ctx.body = { message: "Draft served successfully", existingDraft };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: "Internal server error" };
    }
  }

  public async publishDraft(ctx: Context): Promise<void> {
    try {
      const { id } = ctx.params;

      const existingDraft = await database.getDraft(id);
      if (!existingDraft) {
        ctx.status = 404;
        ctx.body = { error: "Draft not found" };
        return;
      }

      await database.publishDraft(id);

      ctx.status = 200;
      ctx.body = { message: "Draft published successfully", existingDraft };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: "Internal server error" };
    }
  }
}

const draftService = new DraftService();

export { draftService };
