import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
        maxlength: [100, 'El nombre no puede exceder los 100 caracteres'],
        index: true
    },
    numeroControl: {
        type: String,
        required: [true, 'El número de control es obligatorio'],
        unique: true,
        trim: true,
        match: [/^[A-Z0-9]+$/, 'El número de control solo puede contener letras mayúsculas y números']
    },
    age: {
        type: Number,
        required: [true, 'La edad es obligatoria'],
        min: [15, 'La edad mínima es 15 años'],
        max: [100, 'La edad máxima es 100 años'],
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    versionKey: false
});

// Middleware para actualizar updatedAt
studentSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Método para transformar el documento antes de enviarlo
studentSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.__v;
    return obj;
};

// Verificar si el modelo ya existe antes de crearlo
const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

export default Student;