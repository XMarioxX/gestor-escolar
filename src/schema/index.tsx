
import { z } from 'zod'

export const LoginSchema = z.object({
    email: z.string()
        .email('Email inválido')
        .refine((val) => val.endsWith('@morelia.tecnm.mx'), {
            message: 'El correo debe ser @morelia.tecnm.mx',
        }),
    password: z.string().min(6, 'Contraseña mínima de 6 caracteres'),
})