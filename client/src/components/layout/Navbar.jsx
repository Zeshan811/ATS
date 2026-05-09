import {
    useState
} from 'react';
import {
    Link, NavLink, useNavigate
} from 'react-router-dom';
import {
    useAuth
} from '../../context/AuthContext';
import {
    Briefcase, Menu, X, User, LogOut, LayoutDashboard
} from 'lucide-react';

const Navbar = () => {
    const { isAuthenticated, user, logout
    } = useAuth();
    const [mobileOpen, setMobileOpen
    ] = useState(false);
    const [dropdownOpen, setDropdownOpen
    ] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const dashboardPath = user?.role === 'hr' || user?.role === 'admin' ? '/hr/dashboard' : '/candidate/dashboard';

    return (
        <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    { /* Logo */}
                    <Link to="/" className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                            <Briefcase className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-slate-900 text-lg">
                            Hire<span className="text-gradient">Hub</span>
                        </span>
                    </Link>

                    { /* Desktop nav */}
                    <div className="hidden md:flex items-center gap-1">
                        <NavLink to="/jobs" className={({ isActive
                        }) => isActive ? 'px-4 py-2 text-sm font-semibold text-primary-600' : 'px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors'
                        }>
                            Browse Jobs
                        </NavLink>
                        <NavLink to="/about" className={({ isActive
                        }) => isActive ? 'px-4 py-2 text-sm font-semibold text-primary-600' : 'px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors'
                        }>
                            About
                        </NavLink>
                    </div>

                    { /* Right */}
                    <div className="hidden md:flex items-center gap-3">
                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)
                                    }
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                                        {user?.profilePicture
                                            ? <img src={user.profilePicture
                                            } alt="" className="w-8 h-8 rounded-full object-cover" />
                                            : <User className="w-4 h-4 text-primary-600" />
                                        }
                                    </div>
                                    <span className="text-sm font-semibold text-slate-700">{user?.name?.split(' ')[
                                        0
                                    ]
                                    }</span>
                                </button>
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-52 card shadow-lg py-2 border border-slate-100">
                                        <Link to={dashboardPath
                                        } className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50" onClick={() => setDropdownOpen(false)
                                        }>
                                            <LayoutDashboard className="w-4 h-4 text-slate-400" /> Dashboard
                                        </Link>
                                        <Link to="/candidate/profile" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50" onClick={() => setDropdownOpen(false)
                                        }>
                                            <User className="w-4 h-4 text-slate-400" /> Profile
                                        </Link>
                                        <div className="border-t border-slate-100 my-1" />
                                        <button onClick={handleLogout
                                        } className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                                            <LogOut className="w-4 h-4" /> Sign Out
                                        </button>
                                    </div>
                                )
                                }
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="btn-ghost">Sign In</Link>
                                <Link to="/register" className="btn-primary">Get Started</Link>
                            </>
                        )
                        }
                    </div>

                    { /* Mobile toggle */}
                    <button className="md:hidden p-2 rounded-lg hover:bg-slate-100" onClick={() => setMobileOpen(!mobileOpen)
                    }>
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />
                        }
                    </button>
                </div>
            </div>

            { /* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-slate-100 px-4 py-4 space-y-2 bg-white">
                    <NavLink to="/jobs" className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={() => setMobileOpen(false)
                    }>Browse Jobs</NavLink>
                    <NavLink to="/about" className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={() => setMobileOpen(false)
                    }>About</NavLink>
                    {isAuthenticated ? (
                        <>
                            <Link to={dashboardPath
                            } className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={() => setMobileOpen(false)
                            }>Dashboard</Link>
                            <button onClick={handleLogout
                            } className="block w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50">Sign Out</button>
                        </>
                    ) : (
                        <div className="flex gap-3 pt-2">
                            <Link to="/login" className="btn-secondary flex-1 justify-center" onClick={() => setMobileOpen(false)
                            }>Sign In</Link>
                            <Link to="/register" className="btn-primary flex-1 justify-center" onClick={() => setMobileOpen(false)
                            }>Register</Link>
                        </div>
                    )
                    }
                </div>
            )
            }
        </nav>
    );
};

export default Navbar;