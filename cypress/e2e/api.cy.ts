import {
  validar,
  carritoSchema,
  itemCarritoSchema,
  productoSchema
} from '../support/apiHelpers';

interface ItemCarrito {
  productId: number;
  quantity: number;
}

describe('Fake Store API', () => {

  let token: string;
  let apiUrl: string;
  let username: string;
  let password: string;

  before(() => {

    cy.getEnv(['apiUrl', 'username', 'password']).then((env) => {
      apiUrl = env.apiUrl;
      username = env.username;
      password = env.password;

      cy.request({
        method: 'POST',
        url: `${apiUrl}/auth/login`,
        body: {
          username: username,
          password: password
        }
      }).then((res) => {
        expect(res.status).to.be.oneOf([200, 201]);
        expect(res.body.token).to.be.a('string').and.not.be.empty;

        token = res.body.token;
      });
    });

  });

  it('Login válido', () => {

    expect(token).to.be.a('string').and.not.be.empty;

  });

  it('Login inválido', () => {

    cy.request({
      method: 'POST',
      url: `${apiUrl}/auth/login`,
      body: {
        username: username,
        password: 'password-incorrecta'
      },
      failOnStatusCode: false
    }).then((res) => {

      expect(res.status).to.be.oneOf([400, 401]);
      expect(res.body).to.not.have.property('token');

    });

  });

  it('Crear, actualizar y eliminar carrito', () => {

    let productosElegidos: ItemCarrito[];
    let productoExtra: ItemCarrito;
    let cartId: number;

    cy.request({
      method: 'GET',
      url: `${apiUrl}/products`
    }).then((res) => {

      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.greaterThan(3);

      res.body.forEach((producto: any) => {
        validar(producto, productoSchema);
      });

      productosElegidos = res.body
        .slice(0, 3)
        .map((producto: any) => ({
          productId: producto.id,
          quantity: 1
        }));

      productoExtra = {
        productId: res.body[3].id,
        quantity: 1
      };

      return cy.request({
        method: 'POST',
        url: `${apiUrl}/carts`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          userId: 1,
          date: new Date().toISOString().split('T')[0],
          products: productosElegidos
        }
      });

    }).then((res) => {

      expect(res.status).to.be.oneOf([200, 201]);

      validar(res.body, carritoSchema);

      expect(res.body.products).to.have.length(3);

      res.body.products.forEach((producto: ItemCarrito) => {
        validar(producto, itemCarritoSchema);
      });

      cartId = res.body.id;

      return cy.request({
        method: 'PUT',
        url: `${apiUrl}/carts/${cartId}`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          userId: 1,
          date: new Date().toISOString().split('T')[0],
          products: [...productosElegidos, productoExtra]
        }
      });

    }).then((res) => {

      expect(res.status).to.eq(200);

      validar(res.body, carritoSchema);

      expect(res.body.products).to.have.length(4);

      expect(
        res.body.products.map(
          (producto: ItemCarrito) => producto.productId
        )
      ).to.include(productoExtra.productId);

      return cy.request({
        method: 'DELETE',
        url: `${apiUrl}/carts/${cartId}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

    }).then((res) => {

      expect(res.status).to.eq(200);

    });

  });

});