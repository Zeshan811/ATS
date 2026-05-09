import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard, Briefcase, FileText, User, LogOut, X, Briefcase as BriefcaseIcon
} from 'lucide-react';

const links = [
    { to: '/candidate/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/candidate/applications', icon: FileText, label: 'My Applications' },
    { to: '/jobs', icon: Briefcase, label: 'Browse Jobs' },
    { to: '/candidate/profile', icon: User, label: 'My Profile' },
];

const CandidateSidebar = ({ onClose }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="h-full flex flex-col bg-white border-r border-slate-100 w-64">
            {/* Logo */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center">
                        <BriefcaseIcon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="font-bold text-slate-900">HireHub</span>
                </div>
                {onClose && (
                    <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 lg:hidden">
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* User info */}
            <div className="px-5 py-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                        {user?.profilePicture
                            ? <img src={user.profilePicture} alt="" className="w-9 h-9 rounded-full object-cover" />
                            : <User className="w-4 h-4 text-primary-600" />
                        }
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">{user?.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {links.map(({ to, icon: Icon, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        onClick={onClose}
                        className={({ isActive }) => isActive ? 'sidebar-link-active' : 'sidebar-link'}
                    >
                        <Icon className="w-4 h-4" />
                        {label}
                    </NavLink>
                ))}
            </nav>

            {/* Logout */}
            <div className="px-3 py-4 border-t border-slate-100">
                <button
                    onClick={handleLogout}
                    className="sidebar-link w-full text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default CandidateSidebar;