import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => (
    <footer className="bg-slate-900 text-slate-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2.5 mb-4">
                        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                            <Briefcase className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-white text-lg">HireHub ATS</span>
                    </div>
                    <p className="text-sm leading-relaxed max-w-xs">
                        A professional multi-branch recruitment & applicant tracking system for modern software houses.
                    </p>
                    <div className="mt-6 space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-primary-500" />
                            Islamabad · Lahore · Karachi · Remote
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-4 h-4 text-primary-500" />
                            hr@hirehub.pk
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-primary-500" />
                            +92 300 0000000
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4 text-sm">Quick Links</h4>
                    <ul className="space-y-2.5">
                        {[['/', 'Home'], ['/jobs', 'Browse Jobs'], ['/about', 'About Us'], ['/login', 'Sign In']].map(([to, label]) => (
                            <li key={to}>
                                <Link to={to} className="text-sm hover:text-primary-400 transition-colors">{label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4 text-sm">Branches</h4>
                    <ul className="space-y-2.5">
                        {['Islamabad HQ', 'Lahore Office', 'Karachi Office', 'Remote'].map((b) => (
                            <li key={b} className="text-sm">{b}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs">© 2025 HireHub ATS. All rights reserved.</p>
                <p className="text-xs">Built with React + Node.js + MongoDB</p>
            </div>
        </div>
    </footer>
);

export default Footer;