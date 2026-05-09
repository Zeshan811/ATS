import {
  useState, useEffect
} from 'react';
import {
  useForm
} from 'react-hook-form';
import {
  branchService
} from '../../services/branchService';
import {
  toast
} from 'react-hot-toast';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import {
  Building2, Plus, Edit2, Trash2, MapPin, Phone, Mail
} from 'lucide-react';

const defaultValues = {
  name: '', city: '', address: '', phone: '', email: '', manager: ''
};

const HRBranches = () => {
  const [branches, setBranches
  ] = useState([]);
  const [loading, setLoading
  ] = useState(true);
  const [modalOpen, setModalOpen
  ] = useState(false);
  const [editBranch, setEditBranch
  ] = useState(null);
  const [deleteId, setDeleteId
  ] = useState(null);
  const [saving, setSaving
  ] = useState(false);

  const { register, handleSubmit, reset, formState: { errors
  }
  } = useForm({
    defaultValues
  });

  const fetchBranches = () => {
    setLoading(true);
    branchService.getAllBranches()
      .then(({ data
      }) => setBranches(data.branches || []))
      .catch(() => setBranches([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBranches();
  },
    []);

  const openCreate = () => {
    setEditBranch(null); reset(defaultValues); setModalOpen(true);
  };
  const openEdit = (branch) => {
    setEditBranch(branch); reset(branch); setModalOpen(true);
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      if (editBranch) {
        await branchService.updateBranch(editBranch._id, data);
        toast.success('Branch updated!');
      } else {
        await branchService.createBranch(data);
        toast.success('Branch created!');
      }
      setModalOpen(false);
      fetchBranches();
    } catch {
      toast.error('Failed to save branch');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await branchService.deleteBranch(deleteId);
      toast.success('Branch deleted');
      fetchBranches();
    } catch {
      toast.error('Failed to delete branch');
    }
  };

  const CITY_COLORS = {
    Islamabad: 'bg-blue-100 text-blue-700',
    Lahore: 'bg-green-100 text-green-700',
    Karachi: 'bg-orange-100 text-orange-700',
    Remote: 'bg-purple-100 text-purple-700',
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="page-title">Branch Management</h1>
          <p className="page-subtitle">{branches.length
          } branches configured</p>
        </div>
        <button onClick={openCreate
        } className="btn-primary">
          <Plus className="w-4 h-4" /> Add Branch
        </button>
      </div>

      {loading ? <LoadingSpinner /> : branches.length === 0 ? (
        <EmptyState
          icon={Building2
          }
          title="No Branches Yet"
          description="Add your company branches to assign jobs to specific locations"
          action={<button onClick={openCreate
          } className="btn-primary"><Plus className="w-4 h-4" /> Add Branch</button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {branches.map(branch => (
            <div key={branch._id
            } className="card p-5">
              <div className="flex items-start justify-between gap-2 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{branch.name
                    }</h3>
                    <span className={`badge text-xs ${CITY_COLORS[branch.city
                    ] || 'bg-slate-100 text-slate-600'
                      }`
                    }>
                      {branch.city
                      }
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(branch)
                  } className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setDeleteId(branch._id)
                  } className="p-1.5 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                {branch.address && (
                  <div className="flex items-start gap-2 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-slate-400" />
                    <span>{branch.address
                    }</span>
                  </div>
                )
                }
                {branch.phone && (
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{branch.phone
                    }</span>
                  </div>
                )
                }
                {branch.email && (
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{branch.email
                    }</span>
                  </div>
                )
                }
                {branch.manager && (
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <p className="text-xs text-slate-500">Manager: <span className="font-semibold text-slate-700">{branch.manager
                    }</span></p>
                  </div>
                )
                }
              </div>
            </div>
          ))
          }
        </div>
      )
      }

      { /* Create/Edit Modal */}
      <Modal isOpen={modalOpen
      } onClose={() => setModalOpen(false)
      } title={editBranch ? 'Edit Branch' : 'Add New Branch'
      } size="md">
        <form onSubmit={handleSubmit(onSubmit)
        } className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Branch Name *</label>
              <input className={`input-field ${errors.name ? 'border-red-300' : ''
                }`
              }
                placeholder="e.g. Lahore Office"{...register('name',
                  {
                    required: 'Branch name is required'
                  })
                } />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message
              }</p>
              }
            </div>
            <div>
              <label className="label">City *</label>
              <select className={`input-field ${errors.city ? 'border-red-300' : ''
                }`
              }
                {...register('city',
                  {
                    required: 'City is required'
                  })
                }>
                <option value="">Select city</option>
                {
                  ['Islamabad', 'Lahore', 'Karachi', 'Remote'
                  ].map(c => <option key={c
                  }>{c
                    }</option>)
                }
              </select>
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message
              }</p>
              }
            </div>
          </div>
          <div>
            <label className="label">Address</label>
            <input className="input-field" placeholder="Full street address"{...register('address')
            } />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Phone</label>
              <input className="input-field" placeholder="+92 51 0000000"{...register('phone')
              } />
            </div>
            <div>
              <label className="label">Email</label>
              <input type="email" className="input-field" placeholder="branch@company.pk"{...register('email')
              } />
            </div>
          </div>
          <div>
            <label className="label">Branch Manager</label>
            <input className="input-field" placeholder="Manager full name"{...register('manager')
            } />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)
            } className="btn-secondary">Cancel</button>
            <button type="submit" disabled={saving
            } className="btn-primary disabled:opacity-60">
              {saving ? 'Saving...' : editBranch ? 'Update Branch' : 'Add Branch'
              }
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId
        }
        onClose={() => setDeleteId(null)
        }
        onConfirm={handleDelete
        }
        title="Delete Branch"
        message="Are you sure you want to delete this branch? This action cannot be undone."
        confirmLabel="Delete"
        danger
      />
    </div>
  );
};

export default HRBranches;
