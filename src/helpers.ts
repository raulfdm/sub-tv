import figlet from 'figlet';
import { config, spinner } from './instances';

export function showAppTitle(): Promise<void> {
  return Promise.resolve(console.log(figlet.textSync('Sub - TV')));
}

export function generateApiUrl(uri: string): string {
  return `${config.serverUrl}/api${uri}`;
}

export function successMessage(): void {
  spinner.succeed('All subtitles were download successfully! :)');
}

export function errorHandling(err: Error): never {
  let message = 'Something went wrong';

  if (err.message.includes('404')) {
    message = 'The API might be not available. Please try later';
  } else if (err.message.includes('supported')) {
    message = err.message;
  } else {
    message = 'Unknow Error';
    console.error(err);
  }

  spinner.fail(message);

  process.exit(1);
}
