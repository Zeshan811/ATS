import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import HRSidebar from './HRSidebar';
import { Menu } from 'lucide-react';

const HRLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}
            <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <HRSidebar onClose={() => setSidebarOpen(false)} />
            </div>
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="lg:hidden flex items-center gap-4 px-4 py-3 bg-slate-900 border-b border-slate-800">
                    <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-slate-800">
                        <Menu className="w-5 h-5 text-slate-300" />
                    </button>
                    <span className="font-bold text-white">HireHub HR</span>
                </div>
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-thin">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default HRLayout;