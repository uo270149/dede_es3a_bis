import express, { Request, Response} from 'express';
import { Talla } from '../modelos/tallaModelo';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/talla/add', async (req: Request, res: Response) => {
  const { numero, cantidad, producto } = req.body;

  const talla = Talla.build({ numero, cantidad, producto });
  await talla.save();
  return res.status(201).send(talla);
})

//Devuelve todas las tallas de un producto
router.get('/tallas/:id_producto', async (req: Request, res: Response) => {
  const tallas = await Talla
    .find({producto: req.params.id_producto}, { _id: 0 ,  numero: 1, cantidad: 1 } )
    .sort({numero: 'asc'});
  return res.status(200).send(tallas);
});

//Devuelve todas las tallas con existencias de un producto
router.get('/tallas_disponibles/:id_producto', async (req: Request, res: Response) => {
  const tallas = await Talla
    .find(
      {   
        producto: req.params.id_producto,
        cantidad: { $gt: 0 } 
      },
      { _id: 0 ,  numero: 1, cantidad: 1 } )
    .sort({numero: 'asc'});
  return res.status(200).send(tallas);
});

export { router as tallaRouter };
