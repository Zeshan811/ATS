import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff, Briefcase, UserPlus } from 'lucide-react';

const RegisterPage = () => {
    const { register: authRegister } = useAuth();
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch('password');

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const { confirmPassword, phone, ...payload } = data;
            // Backend enum expects "Candidate" (capitalised)
            await authRegister({ ...payload, role: 'Candidate' });
            toast.success('Account created! Welcome to HireHub 🎉');
            navigate('/candidate/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-600 rounded-2xl mb-4">
                        <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-display font-bold text-slate-900">Create Account</h1>
                    <p className="text-slate-500 text-sm mt-1">Join HireHub and start your journey</p>
                </div>

                <div className="card p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="label">Full Name</label>
                            <input
                                type="text"
                                placeholder="Muhammad Ali"
                                className={`input-field ${errors.name ? 'border-red-300' : ''}`}
                                {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Too short' } })}
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="label">Email Address</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className={`input-field ${errors.email ? 'border-red-300' : ''}`}
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                                })}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="label">Password</label>
                            <div className="relative">
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    placeholder="Min. 6 characters"
                                    className={`input-field pr-10 ${errors.password ? 'border-red-300' : ''}`}
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: { value: 6, message: 'Minimum 6 characters' },
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                >
                                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        <div>
                            <label className="label">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Repeat password"
                                className={`input-field ${errors.confirmPassword ? 'border-red-300' : ''}`}
                                {...register('confirmPassword', {
                                    required: 'Please confirm your password',
                                    validate: (val) => val === password || 'Passwords do not match',
                                })}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full justify-center py-3 mt-2 disabled:opacity-60"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Creating account...
                                </span>
                            ) : (
                                <><UserPlus className="w-4 h-4" /> Create Account</>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-sm text-slate-500 mt-5">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary-600 font-semibold hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;