import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import CandidateLayout from './components/layout/CandidateLayout';
import HRLayout from './components/layout/HRLayout';

// Route guard
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Public Pages
import HomePage from './pages/public/HomePage';
import JobsPage from './pages/public/JobsPage';
import JobDetailPage from './pages/public/JobPageDetail';
import AboutPage from './pages/public/AboutPage';
import NotFoundPage from './pages/public/NotFoundPage';
import UnauthorizedPage from './pages/public/UnauthorizedPage';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Candidate Pages
import CandidateDashboard from './pages/candidate/CandidateDashboard';
import CandidateApplications from './pages/candidate/CandidateApplications';
import CandidateProfile from './pages/candidate/CandidateProfile';
import ApplyJobPage from './pages/candidate/ApplyJobPage';

// HR Pages
import HRDashboard from './pages/hr/HRDashboard';
import HRJobs from './pages/hr/HRJobs';
import HRApplicants from './pages/hr/HRApplicants';
import HRInterviews from './pages/hr/HRInterviews';
import HRBranches from './pages/hr/HRBranches';
import './App.css';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#fff',
              color: '#1e293b',
              borderRadius: '12px',
              border: '1px solid #f1f5f9',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              fontSize: '14px',
              fontWeight: '500',
            },
            success: { iconTheme: { primary: '#4f46e5', secondary: '#fff' } },
          }}
        />

        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Candidate Routes — role is lowercased in AuthContext */}
          <Route element={<ProtectedRoute allowedRoles={['candidate']} />}>
            <Route element={<CandidateLayout />}>
              <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
              <Route path="/candidate/applications" element={<CandidateApplications />} />
              <Route path="/candidate/profile" element={<CandidateProfile />} />
              <Route path="/candidate/apply/:jobId" element={<ApplyJobPage />} />
            </Route>
          </Route>

          {/* HR Routes — role is lowercased in AuthContext */}
          <Route element={<ProtectedRoute allowedRoles={['hr', 'admin']} />}>
            <Route element={<HRLayout />}>
              <Route path="/hr/dashboard" element={<HRDashboard />} />
              <Route path="/hr/jobs" element={<HRJobs />} />
              <Route path="/hr/applicants" element={<HRApplicants />} />
              <Route path="/hr/interviews" element={<HRInterviews />} />
              <Route path="/hr/branches" element={<HRBranches />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;