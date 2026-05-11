import { Link } from 'react-router-dom';
import { ShieldOff, Home } from 'lucide-react';

const UnauthorizedPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
    <div className="text-center">
      <div className="w-20 h-20 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4">
        <ShieldOff className="w-10 h-10 text-red-500" />
      </div>
      <h1 className="text-2xl font-display font-bold text-slate-900 mb-2">Access Denied</h1>
      <p className="text-slate-500 mb-8 max-w-sm">
        You don't have permission to access this page.
      </p>
      <Link to="/" className="btn-primary">
        <Home className="w-4 h-4" /> Back to Home
      </Link>
    </div>
  </div>
);

export default UnauthorizedPage;
