import Router from "@koa/router";
import { documentService } from "./service";

const router = new Router();

router.get("/documents/:id", documentService.getDocument);
router.get("/documents", documentService.getDocuments);
router.get("/documents/:id/drafts", documentService.getDocumentDrafts);

export { router as DocumentController };
