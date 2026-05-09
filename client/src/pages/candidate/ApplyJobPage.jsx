import {
    useState, useEffect
} from 'react';
import {
    useParams, useNavigate, Link
} from 'react-router-dom';
import {
    useForm
} from 'react-hook-form';
import {
    jobService
} from '../../services/jobService';
import {
    applicationService
} from '../../services/applicationService';
import {
    toast
} from 'react-hot-toast';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import {
    ArrowLeft, Upload, Send, FileText
} from 'lucide-react';

const ApplyJobPage = () => {
    const { jobId
    } = useParams();
    const navigate = useNavigate();
    const [job, setJob
    ] = useState(null);
    const [loadingJob, setLoadingJob
    ] = useState(true);
    const [submitting, setSubmitting
    ] = useState(false);
    const [resumeFile, setResumeFile
    ] = useState(null);
    const [coverFile, setCoverFile
    ] = useState(null);

    const { register, handleSubmit, formState: { errors
    }
    } = useForm();

    useEffect(() => {
        jobService.getJobById(jobId)
            .then(({ data
            }) => setJob(data.job))
            .catch(() => navigate('/jobs'))
            .finally(() => setLoadingJob(false));
    },
        [jobId
        ]);

    const onSubmit = async (data) => {
        if (!resumeFile) {
            toast.error('Please upload your resume'); return;
        }
        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('job', jobId);
            formData.append('coverLetter', data.coverLetter);
            formData.append('resume', resumeFile);
            if (coverFile) formData.append('coverLetterFile', coverFile);

            await applicationService.apply(formData);
            toast.success('Application submitted successfully!');
            navigate('/candidate/applications');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to submit application');
        } finally {
            setSubmitting(false);
        }
    };

    if (loadingJob) return <LoadingSpinner fullScreen />;

    return (
        <div className="animate-fade-in max-w-2xl mx-auto">
            <Link to={`/jobs/${jobId
                }`
            } className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-medium mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Job
            </Link>

            <div className="mb-6">
                <h1 className="page-title">Apply for Position</h1>
                <p className="page-subtitle">{job?.title
                } · {job?.branch
                    }</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)
            } className="space-y-5">
                { /* Resume Upload */}
                <div className="card p-5">
                    <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary-600" /> Resume (Required)
                    </h2>
                    <label className={`flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed cursor-pointer transition-colors ${resumeFile ? 'border-primary-400 bg-primary-50' : 'border-slate-200 hover:border-primary-300 hover:bg-slate-50'
                        }`
                    }>
                        <input
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            onChange={e => setResumeFile(e.target.files[
                                0
                            ])
                            }
                        />
                        {resumeFile ? (
                            <div className="text-center">
                                <FileText className="w-8 h-8 text-primary-600 mx-auto mb-1" />
                                <p className="text-sm font-semibold text-primary-700">{resumeFile.name
                                }</p>
                                <p className="text-xs text-primary-500">{(resumeFile.size / 1024).toFixed(1)
                                } KB</p>
                            </div>
                        ) : (
                            <div className="text-center">
                                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                                <p className="text-sm font-medium text-slate-600">Click to upload resume</p>
                                <p className="text-xs text-slate-400 mt-1">PDF only, max 5MB</p>
                            </div>
                        )
                        }
                    </label>
                </div>

                { /* Cover Letter File */}
                <div className="card p-5">
                    <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Upload className="w-4 h-4 text-primary-600" /> Cover Letter File (Optional)
                    </h2>
                    <label className={`flex flex-col items-center justify-center w-full h-24 rounded-xl border-2 border-dashed cursor-pointer transition-colors ${coverFile ? 'border-green-400 bg-green-50' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`
                    }>
                        <input
                            type="file"
                            accept=".pdf,.docx"
                            className="hidden"
                            onChange={e => setCoverFile(e.target.files[
                                0
                            ])
                            }
                        />
                        {coverFile ? (
                            <p className="text-sm font-semibold text-green-700">{coverFile.name
                            }</p>
                        ) : (
                            <div className="text-center">
                                <p className="text-sm text-slate-500">Upload cover letter (PDF or DOCX)</p>
                            </div>
                        )
                        }
                    </label>
                </div>

                { /* Cover letter text */}
                <div className="card p-5">
                    <h2 className="font-bold text-slate-900 mb-4">Cover Letter Message</h2>
                    <textarea
                        rows={
                            6
                        }
                        placeholder="Write a brief cover letter explaining why you're a great fit for this role..."
                        className={`input-field resize-none ${errors.coverLetter ? 'border-red-300' : ''
                            }`
                        }
                        {...register('coverLetter',
                            {
                                required: 'Cover letter is required', minLength: {
                                    value: 50, message: 'Please write at least 50 characters'
                                }
                            })
                        }
                    />
                    {errors.coverLetter && <p className="text-red-500 text-xs mt-1">{errors.coverLetter.message
                    }</p>
                    }
                </div>

                <div className="flex gap-3">
                    <Link to={`/jobs/${jobId
                        }`
                    } className="btn-secondary flex-1 justify-center">Cancel</Link>
                    <button type="submit" disabled={submitting
                    } className="btn-primary flex-1 justify-center disabled:opacity-60">
                        {submitting ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Submitting...
                            </span>
                        ) : (
                            <><Send className="w-4 h-4" /> Submit Application</>
                        )
                        }
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ApplyJobPage;