import {
  Building2, MapPin, Mail
} from 'lucide-react';

const BRANCHES = [
  {
    city: 'Islamabad', role: 'Headquarters', address: 'Blue Area, Islamabad', color: 'bg-blue-100 text-blue-700'
  },
  {
    city: 'Lahore', role: 'Regional Office', address: 'Johar Town, Lahore', color: 'bg-green-100 text-green-700'
  },
  {
    city: 'Karachi', role: 'Regional Office', address: 'Clifton, Karachi', color: 'bg-orange-100 text-orange-700'
  },
  {
    city: 'Remote', role: 'Virtual Office', address: 'Work from Anywhere', color: 'bg-purple-100 text-purple-700'
  },
];

const AboutPage = () => (
  <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 animate-fade-in">
    <div className="text-center mb-12">
      <h1 className="text-4xl font-display font-bold text-slate-900 mb-4">About HireHub</h1>
      <p className="text-slate-500 max-w-xl mx-auto">
        HireHub is a professional recruitment and applicant tracking system built for modern software houses operating across Pakistan.
      </p>
    </div>

    <div className="card p-8 mb-8">
      <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">Our Mission</h2>
      <p className="text-slate-600 leading-relaxed">
        We believe hiring should be transparent, efficient, and human. HireHub connects talented developers, designers, and tech professionals with leading software companies — making the entire hiring process seamless from application to offer letter.
      </p>
    </div>

    <div className="mb-8">
      <h2 className="text-2xl font-display font-bold text-slate-900 mb-6 text-center">Our Branches</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {BRANCHES.map(b => (
          <div key={b.city
          } className="card-hover p-5 text-center">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
              <Building2 className="w-6 h-6 text-slate-600" />
            </div>
            <h3 className="font-bold text-slate-900">{b.city
            }</h3>
            <span className={`badge ${b.color
              } mt-1`
            }>{b.role
              }</span>
            <p className="text-xs text-slate-500 mt-2 flex items-center justify-center gap-1">
              <MapPin className="w-3 h-3" />{b.address
              }
            </p>
          </div>
        ))
        }
      </div>
    </div>

    <div className="card p-8 text-center">
      <Mail className="w-10 h-10 text-primary-600 mx-auto mb-3" />
      <h2 className="text-xl font-bold text-slate-900 mb-2">Get in Touch</h2>
      <p className="text-slate-500 text-sm">Have questions about open positions or our hiring process?</p>
      <a href="mailto:hr@hirehub.pk" className="btn-primary mt-4 inline-flex">
        hr@hirehub.pk
      </a>
    </div>
  </div>
);

export default AboutPage;
