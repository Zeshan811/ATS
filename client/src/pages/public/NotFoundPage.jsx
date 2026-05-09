import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
    <div className="text-center">
      <div className="text-8xl font-display font-bold text-primary-200 mb-4">404</div>
      <h1 className="text-2xl font-display font-bold text-slate-900 mb-2">Page Not Found</h1>
      <p className="text-slate-500 mb-8 max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button onClick={() => window.history.back()} className="btn-secondary">
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
        <Link to="/" className="btn-primary">
          <Home className="w-4 h-4" /> Home
        </Link>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
