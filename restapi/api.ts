import express, { Request, Response, Router } from 'express';
import { check } from 'express-validator';
//import mongoose from 'mongoose';
import { IProducto, Producto } from './modelos/productoModelo';

const Productos = require('./modelos/productoModelo');
const mongoose = require('mongoose');
const api: Router = express.Router();

interface User {
    name: string;
    email: string;
}

//This is not a restapi as it mantains state but it is here for
//simplicity. A database should be used instead.
let users: Array<User> = [];

api.get(
    "/users/list",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send(users);
    }
);

api.post(
    "/users/add", [
    check('name').isLength({ min: 1 }).trim().escape(),
    check('email').isEmail().normalizeEmail()
],
    async (req: Request, res: Response): Promise<Response> => {
        let name = req.body.name;
        let email = req.body.email;
        let user: User = { name: name, email: email };
        users.push(user);
        return res.sendStatus(200);
    }
);

api.get(
    "/products/list",
    async (req: Request, res: Response): Promise<Response> => {
        const productos: IProducto[] = await Productos.find({});
        return res.status(200).send(productos); // obtener productos de la bd
    }
);

api.get(
    "/products/:id",
    async (req: Request, res: Response): Promise<Response> => {
        var id = req.params.id;
        var objID = mongoose.Types.ObjectId(id);
        console.log(objID);
        const productos: IProducto = await Productos.findOne({ _id: objID });
        if (productos) {
            return res.status(200).send(productos);
        } else {
            return res.status(404).json({ message: 'El producto con nombre "${objID}" no se ha encontrado.' });
        }

    }
)

export default api;