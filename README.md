# Knex Data

Small CLI utility that allows you to create and run data migrations using the knex query builder.

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
