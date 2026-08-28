import { login, inventory, cart, checkout } from '../locators/locators';

const productos: string[] = [
  'Sauce Labs Backpack',
  'Sauce Labs Bike Light',
  'Sauce Labs Bolt T-Shirt'
];

const precios: Record<string, string> = {};

const comprador = {
  firstName: 'Camila',
  lastName: 'Acosta',
  postalCode: '11000'
};

describe('Comprar', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');

    cy.get(login.usernameInput).type('standard_user');
    cy.get(login.passwordInput).type('secret_sauce');
    cy.get(login.loginButton).click();

    cy.url().should('include', '/inventory.html');
  });

  it('Comprar 3 productos', () => {

    productos.forEach((nombre) => {

      cy.contains(inventory.item, nombre).within(() => {

        cy.get(inventory.itemPrice)
          .invoke('text')
          .then((precio) => {
            precios[nombre] = precio;
          });

        cy.get(inventory.addToCartButton).click();
      });

    });

    cy.get(inventory.shoppingCartBadge)
      .should('have.text', '3');

    cy.get(inventory.shoppingCartLink).click();

    cy.url().should('include', '/cart.html');

    cy.get(cart.item)
      .should('have.length', 3);

    productos.forEach((nombre) => {

      cy.contains(cart.item, nombre).within(() => {

        cy.get(inventory.itemName)
          .should('have.text', nombre);

        cy.get(inventory.itemPrice)
          .should('have.text', precios[nombre]);

        cy.get(cart.quantity)
          .should('have.text', '1');

      });

    });

    cy.get(cart.checkout).click();

    cy.get(checkout.firstName).type(comprador.firstName);
    cy.get(checkout.lastName).type(comprador.lastName);
    cy.get(checkout.postalCode).type(comprador.postalCode);

    cy.get(checkout.continue).click();
    cy.get(checkout.finish).click();

    cy.url().should('include', '/checkout-complete.html');

    cy.get(checkout.completeHeader)
      .should('have.text', 'Thank you for your order!');

  });

});