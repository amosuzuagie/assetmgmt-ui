import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '../app/authContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { http } from '../shared/api/http';

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

type LoginForm = z.infer<typeof schema>;

export default function LoginPage () {

    const navigate =  useNavigate();
    const { login } = useAuth();
    
    const form = useForm<LoginForm>({
        resolver: zodResolver(schema),
    });

    const mutation = useMutation({
        mutationFn: (data: LoginForm) => http.post('/api/auth/login', data).then(res => res.data),
        onSuccess: (data) => {
            login(data.token, data.user);
            navigate('/dashboard');
        },
    });

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <form
                onSubmit={form.handleSubmit(values => mutation.mutate(values))}
                className='bg-white p-6 rounded w-96 shadow'
            >
                <h1 className='text-xl font-bold mb-4'>Login</h1>

                <input
                    {...form.register('email')}
                    placeholder='Email'
                    className='input'
                />

                <input
                    {...form.register('password')}
                    type='password'
                    placeholder='Password'
                    className='input mt-2'
                />

                <button
                    type='submit'
                    className='btn-primary w-full mt-4'
                    disabled={mutation.isPending}
                >Login</button>

                <p className='text-sm mt-3 text-center'>
                    No account? <Link to="/register" className='text-blue-600'>Register</Link>
                </p>
            </form>
        </div>
    );
}