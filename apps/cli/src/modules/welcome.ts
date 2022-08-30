import figlet from 'figlet';

function showAppTitle(): void {
  console.log(figlet.textSync('Sub - TV'));
}

export function clearConsoleWithAppTitle(): void {
  console.clear();
  showAppTitle();
}
