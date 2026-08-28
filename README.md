# QA Challenge 

**API Testing**  [Fake Store API](https://fakestoreapi.com/) → `cypress/e2e/api.cy.ts`
**E2E de UI**  [Sauce Demo](https://www.saucedemo.com/) → `cypress/e2e/compras.cy.ts`
**Reporte de errores**  [`REPORTE-ERRORES.md`](./REPORTE-ERRORES.md)

- Node.js 18 o superior
- npm

Clonár el repo 
```bash
npm install
```


## Variables de entorno

Las credenciales y la URL de la API van por variables de entorno. Los valores por defecto ya están en el bloque `env` de `cypress.config.ts`, así
que **funciona out of the box**:

| Variable   | Para qué sirve                | Valor por defecto          |
|------------|-------------------------------|----------------------------|
| `apiUrl`   | URL base de la Fake Store API | `https://fakestoreapi.com` |
| `username` | Usuario del login de la API   | `mor_2314`                 |
| `password` | Password del login de la API  | `83r5^_`                   |


1. Creás un `cypress.env.json` en la raíz (ya está ignorado por git):

   ```json
   {
     "apiUrl": "https://fakestoreapi.com",
     "username": "mor_2314",
     "password": "83r5^_"
   }
   ```

2. O los pasás por consola con el prefijo `CYPRESS_`:

   ```bash
   CYPRESS_username=mor_2314 CYPRESS_password='83r5^_' npm test
   ```

## Cómo correr los tests

Todo se corre con scripts de npm (modo headless):

```bash
npm test          # Corre TODO (API + UI)
npm run test:api  # Solo la API (Fake Store API)
npm run test:ui   # Solo el E2E de UI (Sauce Demo)
```
para verlo en la interfaz:

```bash
npm run cy:open
```

## Estructura

```
cypress/
├── e2e/
│   ├── api.cy.ts        # API: login, token y carrito (crear/actualizar/eliminar)
│   └── compras.cy.ts    # E2E: compra completa en Sauce Demo
├── locators/
│   └── locators.ts      # Todos los selectores de la UI juntos
└── support/
    ├── apiHelpers.ts    # Helper que valida estructura y tipos + los schemas
    ├── commands.js      # Custom command cy.getEnv
    ├── e2e.js           # Arranque del soporte
    └── index.d.ts       # Tipado del custom command
cypress.config.ts        # Config + variables de entorno
```

### API Fake Store API

- El login pide el token*una sola vez en un hook `before` y lo reutiliza en el header
  `Authorization: Bearer <token>` para el resto de los requests.
- Los productos del carrito salen dinámicamente de `GET /products`, no son fijos.
- En cada endpoint valido el **código HTTP + estructura + tipos de datos** con el helper `validar`.
- Ojo con el **DELETE**: Fake Store API es un backend simulado y no guarda los carritos que
  creás con `POST`, así que al borrar uno recién creado devuelve `200` con body `null`. Por eso
  ese paso valida solo el código HTTP.

### UI Sauce Demo

- El login queda fuera del alcance, así que lo hago como precondición en `beforeEach` con el
  usuario `standard_user`.
- Los selectores están todos en `cypress/locators/locators.ts` para que sea fácil de mantener.
- Valido cantidad de productos, nombres, precios individuales y el mensaje final de compra.
