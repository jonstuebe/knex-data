const fs = require("fs");
const path = require("path");
const { get } = require("lodash");

const getKnexConfig = (program, safe = true) => {
  const cwd = process.cwd();
  const knexConfigPath = program.knexConfig
    ? path.resolve(cwd, program.knexConfig)
    : path.resolve(cwd, "knexfile");
  let knexConfig = require(knexConfigPath.toString());
  if (knexConfig.development) {
    knexConfig = knexConfig[process.env.NODE_ENV || "development"];
  }
  if (safe) {
    knexConfig.connection = null;
    delete knexConfig.connection;
  }
  return knexConfig;
};

const getMigrationsPath = knexConfig => {
  return get(
    knexConfig,
    "data_migrations.directory",
    path.resolve(process.cwd(), "data_migrations")
  );
};

const getMigrations = migrationsPath => {
  return fs
    .readdirSync(migrationsPath)
    .filter(file => file.match(/^[0-9]*?_\S*.[a-zA-Z]$/));
};

const getMigrationStub = knexConfig => {
  return get(knexConfig, "data_migrations.stub", null);
};

const formatChoices = choices => {
  return choices.map(choice => {
    return {
      name: choice,
      value: choice
    };
  });
};

const createMigrationsDirectoryIfNotExists = knexConfig => {
  const cwd = process.cwd();
  const migrationsPath = getMigrationsPath(knexConfig);
  if (!fs.existsSync(migrationsPath)) {
    fs.mkdirSync(migrationsPath);
  }
};

module.exports = {
  getKnexConfig,
  getMigrationsPath,
  getMigrationStub,
  createMigrationsDirectoryIfNotExists,
  getMigrations,
  formatChoices
};
