import { ObjectId } from 'mongoose';

export type User = {
    name:string;
    email:string;
  }

export type Product = {
  nombre: string;
  precio: number;
}

export type TypeProduct = {
  _objectId: ObjectId;
  id: string;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
}