import figlet from 'figlet';

function getAppTitle(): string {
  return figlet.textSync('Sub - TV');
}

export function printAppTitle(): void {
  console.clear();
  console.log(getAppTitle());
}
