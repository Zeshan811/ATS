import {
    useState
} from 'react';
import {
    Link, useNavigate
} from 'react-router-dom';
import {
    useForm
} from 'react-hook-form';
import {
    useAuth
} from '../../context/AuthContext';
import {
    toast
} from 'react-hot-toast';
import {
    Eye, EyeOff, Briefcase, LogIn
} from 'lucide-react';

const LoginPage = () => {
    const { login
    } = useAuth();
    const navigate = useNavigate();
    const [showPass, setShowPass
    ] = useState(false);
    const [loading, setLoading
    ] = useState(false);

    const { register, handleSubmit, formState: { errors
    }
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const user = await login(data);
            toast.success(`Welcome back, ${user.name.split(' ')[
                0
            ]
                }!`);
            if (user.role === 'hr' || user.role === 'admin') {
                navigate('/hr/dashboard');
            } else {
                navigate('/candidate/dashboard');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                { /* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-600 rounded-2xl mb-4">
                        <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-display font-bold text-slate-900">Welcome Back</h1>
                    <p className="text-slate-500 text-sm mt-1">Sign in to your HireHub account</p>
                </div>

                <div className="card p-8">
                    <form onSubmit={handleSubmit(onSubmit)
                    } className="space-y-5">
                        <div>
                            <label className="label">Email Address</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className={`input-field ${errors.email ? 'border-red-300 focus:ring-red-400' : ''
                                    }`
                                }
                                {...register('email',
                                    {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^\S+@\S+$/i, message: 'Invalid email'
                                        },
                                    })
                                }
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message
                            }</p>
                            }
                        </div>

                        <div>
                            <label className="label">Password</label>
                            <div className="relative">
                                <input
                                    type={showPass ? 'text' : 'password'
                                    }
                                    placeholder="••••••••"
                                    className={`input-field pr-10 ${errors.password ? 'border-red-300 focus:ring-red-400' : ''
                                        }`
                                    }
                                    {...register('password',
                                        {
                                            required: 'Password is required'
                                        })
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />
                                    }
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message
                            }</p>
                            }
                        </div>

                        <button type="submit" disabled={loading
                        } className="btn-primary w-full justify-center py-3 disabled:opacity-60 disabled:cursor-not-allowed">
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Signing in...
                                </span>
                            ) : (
                                <><LogIn className="w-4 h-4" /> Sign In</>
                            )
                            }
                        </button>
                    </form>
                </div>

                <p className="text-center text-sm text-slate-500 mt-5">
                    Don't have an account?{' '
                    }
                    <Link to="/register" className="text-primary-600 font-semibold hover:underline">
                        Create one free
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;