import Koa from "koa";
import { DraftController } from "./controller";
import bodyParser from "koa-bodyparser";

const app = new Koa();

app.use(bodyParser());
app.use(DraftController.routes());
app.use(DraftController.allowedMethods());

app.listen(3000, () => {
  console.log("Draft API is running on port 3000");
});
