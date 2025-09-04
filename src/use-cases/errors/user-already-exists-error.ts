export class UserAlreadyExistsError extends Error {
  constructor() {
    super("Email aready exists!");
  }
}
