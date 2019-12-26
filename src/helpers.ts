import figlet from 'figlet';
import { DownloadReturn } from './service/Download';
import { spinner } from './instances';

export function showAppTitle() {
  console.log(figlet.textSync('Sub - TV'));
}

export function successMessage(result: DownloadReturn) {
  spinner.succeed(
    `Your subtitle has been download successfully. You can find the file inside "${result.outDir}"`,
  );
}
