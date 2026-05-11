import { Building2, MapPin, Mail, Phone } from 'lucide-react';

// Backend doesn't have a /branches route.
// Branches are hardcoded in the Job model enum: Islamabad, Lahore, Karachi, Remote
// This page displays them as static info.
//branches
const STATIC_BRANCHES = [
  {
    _id: '1',
    name: 'Islamabad HQ',
    city: 'Islamabad',
    address: 'Blue Area, Islamabad',
    phone: '+92 51 1234567',
    email: 'islamabad@hirehub.pk',
    manager: 'General Manager',
  },
  {
    _id: '2',
    name: 'Lahore Office',
    city: 'Lahore',
    address: 'Johar Town, Lahore',
    phone: '+92 42 1234567',
    email: 'lahore@hirehub.pk',
    manager: 'Regional Manager',
  },
  {
    _id: '3',
    name: 'Karachi Office',
    city: 'Karachi',
    address: 'Clifton, Karachi',
    phone: '+92 21 1234567',
    email: 'karachi@hirehub.pk',
    manager: 'Regional Manager',
  },
  {
    _id: '4',
    name: 'Remote',
    city: 'Remote',
    address: 'Work from Anywhere',
    phone: '',
    email: 'remote@hirehub.pk',
    manager: '',
  },
];

const CITY_COLORS = {
  Islamabad: 'bg-blue-100 text-blue-700',
  Lahore: 'bg-green-100 text-green-700',
  Karachi: 'bg-orange-100 text-orange-700',
  Remote: 'bg-purple-100 text-purple-700',
};

const HRBranches = () => (
  <div className="animate-fade-in">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="page-title">Branch Management</h1>
        <p className="page-subtitle">{STATIC_BRANCHES.length} branches configured</p>
      </div>
    </div>


    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {STATIC_BRANCHES.map((branch) => (
        <div key={branch._id} className="card p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">{branch.name}</h3>
              <span className={`badge text-xs ${CITY_COLORS[branch.city] || 'bg-slate-100 text-slate-600'}`}>
                {branch.city}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            {branch.address && (
              <div className="flex items-start gap-2 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-slate-400" />
                <span>{branch.address}</span>
              </div>
            )}
            {branch.phone && (
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{branch.phone}</span>
              </div>
            )}
            {branch.email && (
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{branch.email}</span>
              </div>
            )}
            {branch.manager && (
              <div className="mt-3 pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-500">
                  Manager: <span className="font-semibold text-slate-700">{branch.manager}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default HRBranches;