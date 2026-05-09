import { FileSearch } from 'lucide-react';

const EmptyState = ({ icon: Icon = FileSearch, title = 'Nothing here', description = '', action }) => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
            <Icon className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-slate-800 font-semibold text-lg mb-1">{title}</h3>
        {description && <p className="text-slate-500 text-sm max-w-xs">{description}</p>}
        {action && <div className="mt-4">{action}</div>}
    </div>
);

export default EmptyState;