import type { OpenSubtitleDownloadApiResponse, UserCredentials } from '@sub-tv/open-subtitle';
import { JSONFileSync, LowSync } from 'lowdb';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const file = join(__dirname, '../subtv-db.json');
const adapter = new JSONFileSync<DatabaseSchema>(file);

export type DatabaseSchema = {
  credentials: UserCredentials | null;
  preferredLanguages: string[];
  remainingDownloads: number | null;
  downloads: {
    [id: string]: {
      link: string;
      fileName: string;
    };
  };
};

function initializeDB() {
  const database = new LowSync(adapter);

  // Read data from JSON file, this will set db.data content
  database.read();

  database.data ||= {
    credentials: null,
    preferredLanguages: ['en'],
    remainingDownloads: null,
    downloads: {},
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
    removeCredentials(): void {
      databaseData.credentials = null;
      database.write();
    },
    get getRemainingDownloads() {
      return databaseData.remainingDownloads;
    },
    setRemainingDownloads(remainingDownloads: number) {
      databaseData.remainingDownloads = remainingDownloads;
      database.write();
    },
    get preferredLanguages() {
      return databaseData.preferredLanguages;
    },
    setLangs(langs: DatabaseSchema['preferredLanguages']) {
      databaseData.preferredLanguages = langs;
      database.write();
    },
    getDownloadByFileName(fileName: string): DatabaseSchema['downloads'][string] | null {
      return databaseData.downloads[fileName] ?? null;
    },
    setDownloads(allDownloads: { [fileName: string]: OpenSubtitleDownloadApiResponse }) {
      Object.values(allDownloads).forEach((downloadInfo) => {
        databaseData.downloads[downloadInfo.file_name] = {
          link: downloadInfo.link,
          fileName: downloadInfo.file_name,
        };
      });

      database.write();
    },
  };
}

export const db = createSubTvDB();
