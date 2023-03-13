import prettierOptions from '../../../.prettierrc.json';
import * as dbConfig from '@/db/sequelize-cli/config/config.json';
import * as path from 'path';
import { Sequelize } from 'sequelize-typescript';
import { generateMigration } from 'sequelize-typescript-model-migration';

const { database, username, password } = dbConfig.development;

const sequelize: Sequelize = new Sequelize(database, username, password, {
  models: [],
  dialect: 'postgres',
});

generateMigration(sequelize, {
  outDir: path.join(__dirname, './migrations'),
  snapshotDir: path.join(__dirname, './snapshots'),
  migrationName: 'be-migration',
  prettierOptions,
});
