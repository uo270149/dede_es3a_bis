import request, { Response } from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
import exp from 'constants';
import api from '../api';
import { IProducto } from '../modelos/productoModelo';
import { Types } from 'mongoose';

let app: Application;
//let server: http.Server;
const servidor = require('./servidor.tests');

beforeAll(async () => {
    /* app = express();
    const port: number = 5000;
    const options: cors.CorsOptions = {
        origin: ['http://localhost:3000']
    };
    app.use(cors(options));
    app.use(bp.json());
    app.use("/api", api);

    server = app.listen(port, (): void => {
        console.log('Servidor Restapi para testing escuchando en ' + port);
    }).on("error", (error: Error) => {
        console.error('Error ocurrido: ' + error.message);
    }) */

    // Iniciar la base de datos
    await servidor.startBD();
    // Iniciar el servidor
    app = await servidor.startServidor();
    // Añadir productos al servidor
    servidor.añadirProductos();

});

afterAll(async () => {
    //server.close();

    // Cerrar el servidor
    await servidor.closeServidor();
    // Cerrar la base de datos
    await servidor.closeBD();
});

describe('user ', () => {
    /**
     * Probar que podemos listar usuarios sin errores
     */
    it('can be listed', async () => {
        const response: Response = await request(app).get("api/users/list");
        expect(response.statusCode).toBe(200);
    });

    /**
     * Probar que un usuario puede ser creado a través de productService sin lanzar errores
     */
    it('can be created correctly', async () => {
        let username: string = 'Pablo';
        let email: string = 'gonzalezgpablo@uniovi.es';
        const response: Response = await request(app).post('/api/users/add').send({ name: username, email: email }).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
    })
});

describe('producto', () => {
    /**
     * Probar que podemos listar productos sin errores
     */
    it('can be listed', async () => {
        const response: Response = await request(app).get("api/products/list");
        const productos: IProducto[] = response.body;

        // todo en orden
        expect(response.statusCode).toBe(200);
        // la longitud de las listas es la misma
        expect(productos.length).toBe(servidor.productos.length);
        // comprobar que los productos obtenidos sean iguales
        for (var i = 0; i < productos.length; i++) {
            expect(productos[i]).toStrictEqual(servidor.productos[i]);
        }
    });

    /**
     * Probar que podemos obtener un producto por su referencia
     */
    it('Producto según su referencia ', async () => {
        let productoBuscado: IProducto = servidor.productos[1];

        const response: Response = await request(app).get('/api/products/' + productoBuscado.referencia.toString());
        expect(response.statusCode).toBe(200);

        // Obtenemos el producto del body de la respuesta
        let productoEncontrado = response.body;
        productoEncontrado.referencia = new Types.ObjectId(productoEncontrado.referencia);
        expect(productoEncontrado).toStrictEqual(productoBuscado);
    });

    /**
     * Probar que no obtenemos nada al buscar un producto que no existe
     */
    it('Producto que no existe en el sistema ', async () => {
        // Referencia de un producto inexistente
        let referencia: string = "asdfghjklñ";
        // Buscamos un producto con esa referencia (inexistente)
        const response: Response = await request(app).get('/api/products/' + referencia);
        // El código de respuesta debería ser 404 (no encontrado)
        expect(response.statusCode).toBe(404);
    });
});