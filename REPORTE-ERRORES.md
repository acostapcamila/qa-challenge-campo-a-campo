# Punto 3 - Reporte de errores

| FECHA      | DESCRIPCION              | IMPORTE PESOS | IMPORTE DOLARES |
|------------|--------------------------|---------------|-----------------|
| 21/11/2011 | Extracción               | -             | 1000.00         |
| 12/21/2011 | Dep&oacute;sito          |               | + 1000,00       |
| 01/10/2011 | Débito por transferensia |               | + 500.00        |

## a. Defectos detectados

1. **Formato de fecha:** `21/11/2011` (DD/MM/YYYY) vs `12/21/2011` (MM/DD/YYYY); este último es inválido si el formato esperado es DD/MM/YYYY (no existe el mes 21).
2. **HTML sin decodificar:** `Dep&oacute;sito` debería mostrarse como "Depósito".
3. **Error ortográfico:** "transferensia" → "transferencia".
4. **Separador decimal:** `1000.00` vs `1000,00` vs `500.00` (punto y coma mezclados).
5. **Datos desalineados:** hay 3 movimientos pero los importes no se asocian a su transacción ni a su moneda (PESOS casi vacía, DOLARES con todo).
6. **Signo incoherente:** "Extracción" y "Débito" son egresos (deberían ser negativos) pero figuran con `+`.

## b. Campos de un reporte de defecto

ID · Título · Módulo/Funcionalidad · Ambiente · Precondiciones · Pasos para reproducir · Resultado esperado · Resultado obtenido · Severidad · Prioridad · Reproducibilidad · Evidencia · Estado.

## Reporte de ejemplo

| Campo | Detalle |
|-------|---------|
| **ID** | BUG-001 |
| **Título** | Formato de fecha inconsistente e inválido en el listado de movimientos |
| **Módulo** | Billetera virtual - Movimientos de cuenta |
| **Ambiente** | Web - Chrome 120 / Windows 11 |
| **Precondiciones** | Usuario autenticado con movimientos registrados |
| **Pasos** | 1. Iniciar sesión. 2. Ir a "Movimientos de cuenta". 3. Observar la columna FECHA. |
| **Resultado esperado** | Todas las fechas con un único formato válido (DD/MM/YYYY) |
| **Resultado obtenido** | Se mezclan `21/11/2011` (DD/MM/YYYY) y `12/21/2011` (MM/DD/YYYY); este último es inválido |
| **Severidad / Prioridad** | Alta / Alta |
| **Reproducibilidad** | Siempre |
| **Estado** | Nuevo |
