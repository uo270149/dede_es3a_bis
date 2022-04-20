import mongoose from 'mongoose'

interface ITalla {
    numero: String;
    cantidad: Number;
    producto: mongoose.Schema.Types.ObjectId;
  }
    
  interface TallaDoc extends mongoose.Document {
    numero: String;
    cantidad: Number;
    producto: String;
  }

  interface TallaModelInterface extends mongoose.Model<TallaDoc> {
    build(attr: ITalla): TallaDoc
  }

const tallaSchema = new mongoose.Schema({
    numero: {
        type: String,
        required: true,
        trim: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Producto"
    }
})

tallaSchema.statics.build = (attr: ITalla) => {
    return new Talla(attr)
}

const Talla = mongoose.model<TallaDoc,TallaModelInterface>('Talla',tallaSchema)

export { Talla, TallaDoc}
