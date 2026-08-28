declare namespace Cypress {
  interface Chainable {
    getEnv(keys: string[]): Chainable<Record<string, string>>;
  }
}
