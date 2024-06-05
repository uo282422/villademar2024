# Splash Party 2024

## Iniciar el front-end
Se debe tener instalado Node.js y npm.
Despúes ejecutar los siguientes comandos en la terminal para iniciar el front-end en el puerto `3000`.
```bash
cd frontend
npm install
npm start
```

## Iniciar el back-end
En vez de implementar el backend desde 0, usamos MedusaJS. Esta ofrece muchas facilidades para crear un e-commerce, entre ellos un panel de administración para gestionar los productos, pedidos (http://localhost:7001) y una API REST para comunicarse con el frontend.
Se debe tener instalado Node.js y npm (o yarn) y Docker.

```bash	
cd backend
npm install
```

A continuación vamos levantar un contenedor Docker con una base de datos de Postgres con las credenciales de `POSTGRES_USER=postgres` y `POSTGRES_PASSWORD=S3cret` y que expone el puerto por defecto de postgres `5432` para que medusa pueda conectarse a la base de datos definido en el archivo dockler-compose.yml. Los contenedores Docker no son persistentes, por lo que si se detiene el contenedor, se perderán los datos. Para persistir los datos, se ha configurado para que usar un volumen donde guardar los datos `postgresql/data`. De esta manera si creamos nuevos productos en el dashboard podremos compartrlos para el modo desarrollo simplemente haciendo commit de los cambios.
> No sé si es buena idea subir la base de datos a github, pero creo para el modo desarrollo es útil de momento.
```bash
docker-compose up -d # Levanta el contenedor de postgres en segundo plano con la opción -d
```
>Para cerrar el contendor docker simplemente ejcutar `docker-compose down` en la carpeta backend.

Para que medusa pueda conectarse a la base de datos postgres se necesitan pasar las credenciles creando un archivo `.env` en la carpeta `backend` con las siguientes variables:
```bash
DATABASE_TYPE=postgres
DATABASE_URL=postgres://postgres:S3cret@localhost:5432/postgres
MEDUSA_ADMIN_ONBOARDING_TYPE=default
STORE_CORS=http://localhost:8000,http://localhost:7001
```

>Nota: Cree un usuario/admin con  el comando `medusa user -e admin@email.com -p 12345` que será el usuario que se usará para acceder al panel.

Finalmente, ejecutamos en la terminal los siguientes comandos para iniciar el back-end en el http://localhost:9000 y el panel de administración en http://localhost:7001.

```bash	
medusa develop  # npx medusa develop si no funciona?
```
