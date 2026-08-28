Cypress.Commands.add('getEnv', (keys) => {
  const valores = {};

  keys.forEach((key) => {
    valores[key] = Cypress.env(key);
  });

  return cy.wrap(valores, { log: false });
});
