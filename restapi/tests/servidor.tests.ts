/**
 * Servidor de ayuda con la ejecución de los tests
 * Para iniciar la restapi usando una bd interna
 */

import { IProducto } from "../modelos/productoModelo";

const { MongoMemoryServer } = require("mongodb-memory-server");
// const mongod = await MongoMemoryServer.create();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const api = require('../api');
const productoSchema = require('../modelos/productoModelo');

let mongod: { start: () => any; getUri: () => any; stop: () => any; server: { close: () => any; } };

// Coleccion de productos para las pruebas
export const productos: IProducto[] = [
    {
        "referencia": "1",
        "marca": "Adidas",
        "modelo": "Superstar",
        "color": "Blanco",
        "precio": 100,
        "descripcion": "Zapatilla de Mujer Originals",
        "categoria": "Mujer"
    }, {
        "referencia": "2",
        "marca": "Nike",
        "modelo": "Blazer",
        "color": "Negro",
        "precio": 94.99,
        "descripcion": "Zapatilla Nike Blazer Low'77 Jumbo",
        "categoria": "Mujer"
    }, {
        "referencia": "3",
        "marca": "New Balance",
        "modelo": "Made in UK 920",
        "color": "Gris oscuro",
        "precio": 210,
        "descripcion": "Zapatilla New Balance de hombre color gris oscuro",
        "categoria": "Hombre"
    }, {
        "referencia": "4",
        "marca": "Vans",
        "modelo": "Checkerboard Classic Slip-On",
        "color": "Blanco y Negro",
        "precio": 70,
        "descripcion": "Zapatilla de Vans de hombre, modelo checkerboard classic slip-on",
        "categoria": "Hombre"
    }
];

/**
 * Iniciar la base de datos
 */
module.exports.startBD = async () => {
    mongod = new MongoMemoryServer({ binary: { version: "4.4.5" }, instance: { port: 27017, dbName: "testBD" } });
    await mongod.start();
    const mongo_uri = await mongod.getUri();
    console.log("Conectado a: " + mongo_uri);
}

/**
 * Iniciar el Servidor
 */
module.exports.startServidor = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/testBD?", { useNewUrlParser: true, useUnifiedTopology: true });

    console.log("Conexión realizada con éxito.");

    var app = express();

    app.use(cors());
    app.options("*", cors());
    app.use(express.json());
    app.use("/api", api);

    mongod.server = await app.listen(5000);

    return app;
}

/**
 * Cerrar el Servidor
 */
module.exports.closeServidor = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.server.close();
    console.log("Servidor cerrado.");
}

/**
 * Cerrar la base de datos
 */
module.exports.closeBD = async () => {
    await mongod.stop();
}

/**
 * Añadir productos a la colección
 */
module.exports.añadirProductos = async () => {
    productoSchema.createCollection();
    productoSchema.insertMany(productos);
}

/**
 * Limpiar la base de datos
 */
module.exports.limpiarBD = async () => {
    const colecciones = mongoose.connection.collections;

    for (const clave in colecciones) {
        const coleccion = colecciones[clave];
        await coleccion.deleteMany();
    }
}