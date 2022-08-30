import { JSONFileSync, LowSync } from 'lowdb';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, '../db.json');
const adapter = new JSONFileSync<DatabaseSchema>(file);

type DatabaseSchema = {
  userToken: string | null;
  langs: string[];
};

function initializeDB() {
  const database = new LowSync(adapter);

  // Read data from JSON file, this will set db.data content
  database.read();

  database.data ||= {
    userToken: null,
    langs: [],
  };

  database.write();

  return database;
}

function createSubTvDB() {
  const database = initializeDB();
  const databaseData = database.data!;

  return {
    get userToken() {
      return databaseData.userToken;
    },
    setUserToken(token: NonNullable<DatabaseSchema['userToken']>): void {
      databaseData.userToken = token;
      database.write();
    },
    get langs() {
      return databaseData.langs;
    },
    setLangs(langs: DatabaseSchema['langs']) {
      databaseData.langs = langs;
      database.write();
    },
  };
}

export const db = createSubTvDB();
