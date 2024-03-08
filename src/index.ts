import cluster from "cluster";
import os from "os";

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  console.log(`Worker ${process.pid} started`);
  const draftAPI = require("./draftAPI");
  const documentAPI = require("./documentAPI");
  const databaseConnector = require("./database/database.connector");
}
