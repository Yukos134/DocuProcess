import Router from "@koa/router";
import { draftService } from "./service";

const router = new Router();

router.post("/draft", draftService.createDraft);
router.patch("/draft/:id", draftService.updateDraft);
router.get("/draft/:id", draftService.getDraft);
router.patch("/draft/:id/publish", draftService.publishDraft);

export { router as DraftController };
