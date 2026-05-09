import {
    Link
} from 'react-router-dom';
import {
    ArrowRight, Building2, Zap, Shield, TrendingUp
} from 'lucide-react';

const STATS = [
    {
        value: '500+', label: 'Active Jobs'
    },
    {
        value: '12K+', label: 'Candidates'
    },
    {
        value: '4', label: 'Branches'
    },
    {
        value: '98%', label: 'Satisfaction'
    },
];

const FEATURES = [
    {
        icon: Zap, title: 'Fast Applications', desc: 'Apply to multiple jobs in minutes with your saved profile and resume.'
    },
    {
        icon: Shield, title: 'Secure & Private', desc: 'Your data is encrypted and stored securely. Full GDPR compliance.'
    },
    {
        icon: TrendingUp, title: 'Track Progress', desc: 'Real-time status updates from submission to offer — always in the loop.'
    },
    {
        icon: Building2, title: 'Multi-Branch', desc: 'Jobs across Islamabad, Lahore, Karachi, and Remote positions.'
    },
];

const STEPS = [
    {
        step: '01', title: 'Create Profile', desc: 'Sign up and complete your candidate profile with skills and experience.'
    },
    {
        step: '02', title: 'Upload Resume', desc: 'Upload your CV and cover letter securely via Cloudinary.'
    },
    {
        step: '03', title: 'Apply for Jobs', desc: 'Browse and apply to roles that match your skills and preferences.'
    },
    {
        step: '04', title: 'Get Hired', desc: 'Track your application, attend interviews, and land the job.'
    },
];

const HomePage = () => (
    <div className="animate-fade-in">
        { /* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-primary-950 to-slate-900 text-white">
            <div className="absolute inset-0 opacity-20" style={
                {
                    backgroundImage: "radial-gradient(circle at 25% 50%, #6366f1 0%, transparent 50%), radial-gradient(circle at 75% 20%, #818cf8 0%, transparent 40%)"
                }
            } />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
                <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-800/60 border border-primary-700/50 text-primary-300 text-xs font-semibold mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
                        Multi-Branch Recruitment Platform
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-display font-bold leading-tight mb-6">
                        Find Your Next
                        <br />
                        <span className="text-gradient">Dream Role</span>
                    </h1>
                    <p className="text-slate-300 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl">
                        HireHub connects top software talent with leading tech companies across Pakistan. Apply, track, and land your perfect job — all in one place.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link to="/jobs" className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-primary-900/30">
                            Browse All Jobs <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link to="/register" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl border border-white/20 transition-all duration-200 backdrop-blur-sm">
                            Create Free Account
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        { /* Stats */}
        <section className="bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                    {STATS.map(({ value, label
                    }) => (
                        <div key={label
                        } className="text-center">
                            <div className="text-3xl font-display font-bold text-primary-600">{value
                            }</div>
                            <div className="text-slate-500 text-sm mt-1">{label
                            }</div>
                        </div>
                    ))
                    }
                </div>
            </div>
        </section>

        { /* Features */}
        <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-14">
                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-4">Why Choose HireHub?</h2>
                    <p className="text-slate-500 max-w-xl mx-auto">A smarter way to manage your career — built for candidates who value transparency and efficiency.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {FEATURES.map(({ icon: Icon, title, desc
                    }) => (
                        <div key={title
                        } className="card-hover p-6">
                            <div className="w-11 h-11 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                                <Icon className="w-5 h-5 text-primary-600" />
                            </div>
                            <h3 className="font-bold text-slate-900 mb-2">{title
                            }</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{desc
                            }</p>
                        </div>
                    ))
                    }
                </div>
            </div>
        </section>

        { /* How it works */}
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-14">
                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-4">How It Works</h2>
                    <p className="text-slate-500 max-w-xl mx-auto">From signup to job offer in four simple steps.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {STEPS.map(({ step, title, desc
                    }) => (
                        <div key={step
                        } className="relative">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-4xl font-display font-bold text-primary-100">{step
                                }</span>
                            </div>
                            <h3 className="font-bold text-slate-900 mb-2">{title
                            }</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{desc
                            }</p>
                        </div>
                    ))
                    }
                </div>
            </div>
        </section>

        { /* CTA */}
        <section className="py-20 bg-primary-600">
            <div className="max-w-3xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-display font-bold text-white mb-4">Ready to Find Your Next Role?</h2>
                <p className="text-primary-200 mb-8">Join thousands of candidates who've found their dream jobs through HireHub.</p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/register" className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold px-8 py-3 rounded-xl hover:bg-primary-50 transition-all shadow-lg">
                        Get Started Free <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link to="/jobs" className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-all">
                        Browse Jobs
                    </Link>
                </div>
            </div>
        </section>
    </div>
);

export default HomePage;