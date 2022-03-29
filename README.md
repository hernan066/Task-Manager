

## Task Manager

Primero, ejecute el servidor de desarrollo:

```bash
npm run dev
# or
yarn dev
```


Abra http://localhost:3000 con su navegador para ver el resultado.

Puede comenzar a editar la página modificando pages/index.tsx. La página se actualiza automáticamente a medida que edita el archivo.

Se puede acceder a las rutas API en http://localhost:3000/api/hello. Este punto final se puede editar en pages/api/hello.ts.

El directorio pages/api está asignado a /api/*. Los archivos en este directorio se tratan como rutas API en lugar de páginas React.


## Configurar variables de entorno

Renombrar el archivo __.env.template__ a __.env__

## Llenar la base de datos con la informacion de pruebas

``` http://localhost:3000/api/seed ```
