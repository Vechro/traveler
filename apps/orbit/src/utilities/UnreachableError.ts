export class UnreachableError extends Error {
  constructor(reason?: string) {
    super(`Unreachable error: ${reason}`);
  }
}
