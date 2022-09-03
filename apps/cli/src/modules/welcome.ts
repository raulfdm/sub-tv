import figlet from 'figlet';

import { inquirerUi } from '../config/inquirer';

function showAppTitle(): void {
  inquirerUi.log.write(figlet.textSync('Sub - TV'));
}

export function clearConsoleWithAppTitle(): void {
  console.clear();
  showAppTitle();
}
