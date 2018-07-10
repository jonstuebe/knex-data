const fs = require("fs");
const path = require("path");
const Promise = require("bluebird");

const inquirer = require("inquirer");

const {
  createMigrationsDirectoryIfNotExists,
  getKnexConfig,
  getMigrationsPath,
  getMigrations,
  formatChoices
} = require("../helpers");

module.exports = async program => {
  const knexConfig = getKnexConfig(program, false);
  const knex = require("knex")(knexConfig);
  createMigrationsDirectoryIfNotExists(knexConfig);

  const migrationsPath = getMigrationsPath(knexConfig);
  const migrations = getMigrations(migrationsPath);

  inquirer.registerPrompt(
    "autocomplete",
    require("inquirer-autocomplete-prompt")
  );

  const { migrationSelected } = await inquirer.prompt([
    {
      type: "autocomplete",
      name: "migrationSelected",
      message: "Please select the migration you would like to preview",
      source: (answersSoFar, input) => {
        return new Promise(resolve => {
          if (input === ("" || null)) {
            return resolve(formatChoices(migrations));
          } else {
            return resolve(
              formatChoices(
                migrations.filter(migration =>
                  migration.includes(input.replace(/ /g, "_"))
                )
              )
            );
          }
        });
      }
    }
  ]);

  const migration = require(path.join(migrationsPath, migrationSelected));
  if (migration) {
    await knex.transaction(trx => {
      return migration(trx, Promise);
    });
  }
  process.exit();
};
