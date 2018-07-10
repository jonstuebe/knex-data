# Knex Data

Small CLI utility that converts the knex query/schema builder method calls in migrations to standard sql. Has an interactive CLI that allows you to select which migration, specific the up or down migration, and whether or not to add a savepoint to the output. Transactions are added based on the knex settings inside of that project.

## Install

```shell
npm i --save-dev knex-data
```

or

```shell
yarn add --dev knex-data
```

## Creating Data Migrations

```shell
npx knex-data create
```

This creates a prompt to create a new migration

## Running Data Migrations

```shell
npx knex-data run
```

This gives you a list of all of the data migrations you have in your project. You can start typing to autocomplete through the list.

## Help

See `npx knex-data --help` for more details.
