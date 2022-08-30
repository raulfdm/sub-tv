import type { UserCredentials } from '@sub-tv/open-subtitle';
import { JSONFileSync, LowSync } from 'lowdb';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, '../db.json');
const adapter = new JSONFileSync<DatabaseSchema>(file);

export type DatabaseSchema = {
  credentials: UserCredentials | null;
  preferredLanguages: string[];
};

function initializeDB() {
  const database = new LowSync(adapter);

  // Read data from JSON file, this will set db.data content
  database.read();

  database.data ||= {
    credentials: null,
    preferredLanguages: ['en'],
  };

  database.write();

  return database;
}

function createSubTvDB() {
  const database = initializeDB();
  const databaseData = database.data!;

  return {
    get userCredentials() {
      return databaseData.credentials;
    },
    hasCredentials() {
      return databaseData.credentials !== null;
    },
    setUserCredentials(credentials: NonNullable<DatabaseSchema['credentials']>): void {
      databaseData.credentials = credentials;
      database.write();
    },
    get preferredLanguages() {
      return databaseData.preferredLanguages;
    },
    setLangs(langs: DatabaseSchema['preferredLanguages']) {
      databaseData.preferredLanguages = langs;
      database.write();
    },
  };
}

export const db = createSubTvDB();
