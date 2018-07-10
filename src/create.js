const fs = require("fs");
const path = require("path");

const inquirer = require("inquirer");
const moment = require("moment");
const slugify = require("slugify");
const chalk = require("chalk");

const {
  createMigrationsDirectoryIfNotExists,
  getKnexConfig,
  getMigrationStub,
  getMigrationsPath
} = require("../helpers");

module.exports = async program => {
  let { migrationName } = await inquirer.prompt([
    {
      type: "input",
      name: "migrationName",
      message: "Enter Migration Name:"
    }
  ]);

  migrationName = slugify(migrationName, {
    replacement: "_",
    remove: /[^a-zA-Z0-9 _]/g
  });

  const knexConfig = getKnexConfig(program);
  const cwd = process.cwd();
  const stubPath =
    getMigrationStub(knexConfig) ||
    path.join(__dirname, "..", "data_migration.stub");
  const stub = fs.readFileSync(stubPath, "utf8");
  const migrationsPath = getMigrationsPath(knexConfig);
  const filePrefix = moment().format("YYYYMMDDHHmmss");
  createMigrationsDirectoryIfNotExists(knexConfig);
  const fullPath = path.join(
    migrationsPath,
    `${filePrefix}_${migrationName}.js`
  );
  fs.writeFileSync(fullPath, stub);
  console.log(chalk.green(`Migration Created: ${fullPath}`));
};
