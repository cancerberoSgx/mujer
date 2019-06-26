export function processCommand(command: string | string[]) {
  if (typeof command !== 'string') {
    return command;
  }
  return command.split(/\s+/g); // TODO: support quoted args
}
