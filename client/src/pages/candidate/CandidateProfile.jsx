import { useAuth } from '../../context/AuthContext';
import { User, Mail, Briefcase } from 'lucide-react';

// Note: The backend doesn't have profile update endpoints yet.
// This page shows the currently logged-in user's info from the token.

const CandidateProfile = () => {
    const { user } = useAuth();

    return (
        <div className="animate-fade-in max-w-2xl">
            <div className="mb-6">
                <h1 className="page-title">My Profile</h1>
                <p className="page-subtitle">Your account information</p>
            </div>

            {/* Profile Card */}
            <div className="card p-6 mb-6">
                <div className="flex items-center gap-5">
                    <div className="w-20 h-20 rounded-2xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <User className="w-9 h-9 text-primary-400" />
                    </div>
                    <div>
                        <h2 className="font-bold text-slate-900 text-xl">{user?.name}</h2>
                        <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-1">
                            <Mail className="w-3.5 h-3.5" /> {user?.email || 'Not available'}
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-1">
                            <Briefcase className="w-3.5 h-3.5" />
                            <span className="badge bg-primary-100 text-primary-700 capitalize">{user?.role}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card p-6">
                <h2 className="section-title mb-4">Account Details</h2>
                <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                        <span className="text-sm text-slate-500">Full Name</span>
                        <span className="text-sm font-semibold text-slate-800">{user?.name}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                        <span className="text-sm text-slate-500">Role</span>
                        <span className="text-sm font-semibold text-slate-800 capitalize">{user?.role}</span>
                    </div>
                </div>
                <p className="text-xs text-slate-400 mt-4">
                    Profile editing will be available in a future update when the backend adds a profile endpoint.
                </p>
            </div>
        </div>
    );
};

export default CandidateProfile;