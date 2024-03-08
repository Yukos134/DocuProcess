import Koa from "koa";
import { DocumentController } from "./controller";
import bodyParser from "koa-bodyparser";

const app = new Koa();

app.use(bodyParser());
app.use(DocumentController.routes());
app.use(DocumentController.allowedMethods());

app.listen(3001, () => {
  console.log("Docunent API is running on port 3001");
});
