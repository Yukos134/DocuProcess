# DocuProcess

Take Home Test - Platform

To start project:

```bash
yarn
yarn start:dev
```

Instead of using real DB, I'm using arrays of Drafts and Documents.
This approach of using different "tables in DB" was selected to provide better performance of Document API's.

To provide better porformance, I'm using cluster module.

To make this project ready for deployment should be done:

- run project in docker(docker compose)
- add deploy script to run the project in production(yarn start:prod)
- deploy DB in docker compose(PostgreSQL for example)
- add configure DB script to alter tables of Drafts and Documents
- configure nginx to balance the load if there will be multi pods of backend(for example Red Hat)
- write tests(mocha for example)
- add linter(eslint for example)
- add precommit tool to run linter and tests before each commit(black for example)
- also needed pipelines
