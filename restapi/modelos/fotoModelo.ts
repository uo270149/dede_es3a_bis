import mongoose from 'mongoose'

interface IFoto {
    ruta:String;
    descripcion: String;
    producto: mongoose.Schema.Types.ObjectId;
  }
    
  interface FotoDoc extends mongoose.Document {
    ruta:String;
    descripcion: String;
    producto: String;
  }

  interface FotoModelInterface extends mongoose.Model<FotoDoc> {
    build(attr: IFoto): FotoDoc
  }

const fotoSchema = new mongoose.Schema({
    ruta: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: false,
        trim: true
    },
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Producto"
    }
})

fotoSchema.statics.build = (attr: IFoto) => {
    return new Foto(attr)
}

const Foto = mongoose.model<FotoDoc,FotoModelInterface>('Foto',fotoSchema)

export { Foto , FotoDoc}
