import {
    useState
} from 'react';
import {
    useForm
} from 'react-hook-form';
import {
    useAuth
} from '../../context/AuthContext';
import {
    authService
} from '../../services/authService';
import {
    toast
} from 'react-hot-toast';
import {
    User, Save, Camera, Mail, Phone, MapPin
} from 'lucide-react';

const CandidateProfile = () => {
    const { user, updateUser
    } = useAuth();
    const [saving, setSaving
    ] = useState(false);
    const [uploadingPic, setUploadingPic
    ] = useState(false);

    const { register, handleSubmit, formState: { errors
    }
    } = useForm({
        defaultValues: {
            name: user?.name || '',
            phone: user?.phone || '',
            city: user?.city || '',
            skills: user?.skills?.join(', ') || '',
            experience: user?.experience || '',
            bio: user?.bio || '',
        },
    });

    const onSubmit = async (data) => {
        setSaving(true);
        try {
            const payload = {
                ...data,
                skills: data.skills ? data.skills.split(',').map(s => s.trim()).filter(Boolean) : [],
            };
            const { data: res
            } = await authService.updateProfile(payload);
            updateUser(res.user);
            toast.success('Profile updated successfully!');
        } catch {
            toast.error('Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const handlePicUpload = async (e) => {
        const file = e.target.files[
            0
        ];
        if (!file) return;
        setUploadingPic(true);
        try {
            const formData = new FormData();
            formData.append('picture', file);
            const { data
            } = await authService.uploadProfilePic(formData);
            updateUser(data.user);
            toast.success('Profile picture updated!');
        } catch {
            toast.error('Failed to upload picture');
        } finally {
            setUploadingPic(false);
        }
    };

    return (
        <div className="animate-fade-in max-w-2xl">
            <div className="mb-6">
                <h1 className="page-title">My Profile</h1>
                <p className="page-subtitle">Update your personal information and skills</p>
            </div>

            { /* Profile Picture */}
            <div className="card p-6 mb-6">
                <div className="flex items-center gap-5">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-2xl bg-primary-100 flex items-center justify-center overflow-hidden">
                            {user?.profilePicture
                                ? <img src={user.profilePicture
                                } alt="" className="w-full h-full object-cover" />
                                : <User className="w-9 h-9 text-primary-400" />
                            }
                        </div>
                        <label className="absolute -bottom-2 -right-2 w-7 h-7 bg-primary-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-700 transition-colors shadow-md">
                            <input type="file" accept="image/*" className="hidden" onChange={handlePicUpload
                            } />
                            {uploadingPic
                                ? <span className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" />
                                : <Camera className="w-3.5 h-3.5 text-white" />
                            }
                        </label>
                    </div>
                    <div>
                        <h2 className="font-bold text-slate-900">{user?.name
                        }</h2>
                        <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-0.5">
                            <Mail className="w-3.5 h-3.5" /> {user?.email
                            }
                        </div>
                        <span className="badge bg-primary-100 text-primary-700 mt-2">Candidate</span>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)
            }>
                <div className="card p-6 space-y-5">
                    <h2 className="section-title">Personal Information</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="label">Full Name</label>
                            <input className={`input-field ${errors.name ? 'border-red-300' : ''
                                }`
                            }
                                {...register('name',
                                    {
                                        required: 'Name is required'
                                    })
                                } />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message
                            }</p>
                            }
                        </div>
                        <div>
                            <label className="label">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input className="input-field pl-10" placeholder="+92 300 0000000"{...register('phone')
                                } />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="label">City</label>
                        <div className="relative">
                            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input className="input-field pl-10" placeholder="e.g. Lahore"{...register('city')
                            } />
                        </div>
                    </div>

                    <div>
                        <label className="label">Skills <span className="text-slate-400 font-normal">(comma separated)</span></label>
                        <input
                            className="input-field"
                            placeholder="React, Node.js, MongoDB, TypeScript..."{...register('skills')
                            }
                        />
                    </div>

                    <div>
                        <label className="label">Years of Experience</label>
                        <input
                            type="number"
                            min="0"
                            max="50"
                            className="input-field"
                            placeholder="e.g. 3"{...register('experience')
                            }
                        />
                    </div>

                    <div>
                        <label className="label">Bio / Summary</label>
                        <textarea
                            rows={
                                4
                            }
                            className="input-field resize-none"
                            placeholder="Write a brief professional summary..."{...register('bio')
                            }
                        />
                    </div>

                    <button type="submit" disabled={saving
                    } className="btn-primary disabled:opacity-60">
                        {saving ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Saving...
                            </span>
                        ) : (
                            <><Save className="w-4 h-4" /> Save Changes</>
                        )
                        }
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CandidateProfile;