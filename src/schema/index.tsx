
import { z } from 'zod'

export const RegisterSchema = z.object({
    name: z.string().min(2, 'Nombre debe tener al menos 2 caracteres'),
    email: z.string()
        .email('Email inválido')
        .refine((val) => val.endsWith('@morelia.tecnm.mx'), {
            message: 'El correo debe ser @morelia.tecnm.mx',
        }),
    password: z.string().min(6, 'Contraseña mínima de 6 caracteres'),
    confirmPassword: z.string(),
        }).refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
})