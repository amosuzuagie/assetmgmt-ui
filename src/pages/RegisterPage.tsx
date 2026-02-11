import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { http } from "../shared/api/http";
import z from "zod";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    role: z.enum(['ADMIN', 'AUDIT', 'FINANCE', 'MANAGERS', 'DIRECTORS'])
});

type RegisterForm = z.infer<typeof schema>;

export default function RegisterPage () {
    const navigate = useNavigate();

    const form = useForm<RegisterForm>({
        resolver: zodResolver(schema),
    });

    const mutation = useMutation({
        mutationFn: (data: RegisterForm) => http.post('/api/auth/register', data),
        onSuccess: () => navigate('/login'),
    });

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={form.handleSubmit(values => mutation.mutate(values))}
                className="bg-white p-6 rounded w-96 shadow"
            >
                <h1 className="text-xl font-bold mb-4">Register</h1>

                <input {...form.register('firstName')} placeholder="First name" className="input" />
                <input {...form.register('lastName')} placeholder="Last name" className="input mt-2" />
                <input {...form.register('email')} placeholder="Email" className="input mt-2" />
                <input {...form.register('password')} type="password" placeholder="Password" className="input mt-2" />

                <select
                    {...form.register('role')}
                    className="input mt-2"
                    defaultValue=""
                >
                    <option value="" disabled>Select role</option>
                    <option value='ADMIN'>ADMIN</option>
                    <option value='AUDIT'>AUDIT</option>
                    <option value='FINANCE'>FINANCE</option>
                    <option value='MANAGERS'>MANAGERS</option>
                    <option value='DIRECTORS'>DIRECTORS</option>
                </select>

                <button className="btn-primary w-full mt-4">Register</button>

                <p className="text-sm mt-3 text-center">
                    Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
                </p>
            </form>
        </div>
    );
}