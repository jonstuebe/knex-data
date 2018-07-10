#!/usr/bin/env node

const program = require("commander");

const pkg = require("./package.json");
const {
  getKnexConfig,
  getMigrationStub,
  getMigrations,
  createMigrationsDirectoryIfNotExists,
  getMigrationsPath
} = require("./helpers");

program
  .version(pkg.version)
  .option("--knex-config <path>", "knex config location");

const createMigration = require("./src/create");
const runMigration = require("./src/run");

program
  .command("create")
  .description("create a new data migration")
  .action(createMigration.bind(null, program));

program
  .command("run")
  .description("run a data migration")
  .action(runMigration.bind(null, program));

program.parse(process.argv);
