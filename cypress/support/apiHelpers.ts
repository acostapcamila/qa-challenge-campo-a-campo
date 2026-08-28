type Tipo =
  | 'string'
  | 'number'
  | 'boolean'
  | 'array'
  | 'object';

type Schema = Record<string, Tipo>;

export const validar = (
  objeto: any,
  schema: Schema
): void => {

  Object.entries(schema).forEach(([campo, tipo]) => {

    expect(objeto).to.have.property(campo);

    expect(objeto[campo]).to.be.a(tipo);

  });

};

export const carritoSchema: Schema = {
  id: 'number',
  userId: 'number',
  date: 'string',
  products: 'array'
};

export const itemCarritoSchema: Schema = {
  productId: 'number',
  quantity: 'number'
};

export const productoSchema: Schema = {
  id: 'number',
  title: 'string',
  price: 'number',
  category: 'string'
};