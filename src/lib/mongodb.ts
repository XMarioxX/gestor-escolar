import mongoose from 'mongoose';

export async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/GestorEscolar', {
        });
        console.log('MongoDB conectado exitosamente');
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error);
        throw error;
    }
}