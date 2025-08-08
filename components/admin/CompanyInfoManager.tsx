
import React, { useState, useEffect, useCallback } from 'react';
import { CompanyInfo } from '../../types';
import { getCompanyInfo, updateCompanyInfo } from '../../api/clientApi';
import { useToast } from '../../context/ToastContext';

const CompanyInfoManager: React.FC = () => {
    const [info, setInfo] = useState<Partial<CompanyInfo>>({});
    const [loading, setLoading] = useState(true);
    const { addToast } = useToast();

    const fetchInfo = useCallback(async () => {
        try {
            const data = await getCompanyInfo();
            setInfo(data);
        } catch (error) {
            addToast('Failed to load company information.', 'error');
        } finally {
            setLoading(false);
        }
    }, [addToast]);

    useEffect(() => {
        fetchInfo();
    }, [fetchInfo]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name.startsWith('socials.')) {
            const socialKey = name.split('.')[1] as keyof CompanyInfo['socials'];
            setInfo(prev => {
                const currentSocials = prev.socials || { x: '', facebook: '', linkedin: '' };
                return {
                    ...prev,
                    socials: {
                        ...currentSocials,
                        [socialKey]: value,
                    }
                };
            });
        } else if (name === 'address') {
             setInfo(prev => ({ ...prev, address: value.split('\n') }));
        } else {
            setInfo(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateCompanyInfo(info as CompanyInfo);
            addToast('Company information updated successfully.', 'success');
        } catch (error) {
            addToast('Failed to update company information.', 'error');
        }
    };
    
    if (loading) return <div className="text-center text-stone-600">Loading information...</div>;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-stone-700 mb-6">Manage Contacts & Socials</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-6">
                         <h3 className="text-lg font-semibold text-stone-800 border-b pb-2">Contact Details</h3>
                         <div>
                            <label className="text-stone-700" htmlFor="address">Address</label>
                            <textarea id="address" name="address" value={info.address?.join('\n') || ''} onChange={handleChange} required rows={3} className="block w-full px-4 py-2 mt-2 text-stone-700 bg-white border border-stone-200 rounded-md focus:border-amber-400 focus:ring-amber-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                             <p className="text-xs text-stone-500 mt-1">Enter each line of the address on a new line.</p>
                        </div>
                        <div>
                            <label className="text-stone-700" htmlFor="phone">Phone Number</label>
                            <input id="phone" name="phone" type="text" value={info.phone || ''} onChange={handleChange} required className="block w-full px-4 py-2 mt-2 text-stone-700 bg-white border border-stone-200 rounded-md focus:border-amber-400 focus:ring-amber-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label className="text-stone-700" htmlFor="email">Email Address</label>
                            <input id="email" name="email" type="email" value={info.email || ''} onChange={handleChange} required className="block w-full px-4 py-2 mt-2 text-stone-700 bg-white border border-stone-200 rounded-md focus:border-amber-400 focus:ring-amber-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                        </div>
                    </div>
                    {/* Social Media */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-stone-800 border-b pb-2">Social Media Links</h3>
                        <div>
                            <label className="text-stone-700" htmlFor="x">X URL</label>
                            <input id="x" name="socials.x" type="url" value={info.socials?.x || ''} onChange={handleChange} className="block w-full px-4 py-2 mt-2 text-stone-700 bg-white border border-stone-200 rounded-md focus:border-amber-400 focus:ring-amber-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label className="text-stone-700" htmlFor="facebook">Facebook URL</label>
                            <input id="facebook" name="socials.facebook" type="url" value={info.socials?.facebook || ''} onChange={handleChange} className="block w-full px-4 py-2 mt-2 text-stone-700 bg-white border border-stone-200 rounded-md focus:border-amber-400 focus:ring-amber-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label className="text-stone-700" htmlFor="linkedin">LinkedIn URL</label>
                            <input id="linkedin" name="socials.linkedin" type="url" value={info.socials?.linkedin || ''} onChange={handleChange} className="block w-full px-4 py-2 mt-2 text-stone-700 bg-white border border-stone-200 rounded-md focus:border-amber-400 focus:ring-amber-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-8">
                    <button type="submit" className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-amber-600 rounded-lg hover:bg-amber-700 focus:outline-none focus:ring focus:ring-amber-500 focus:ring-opacity-50">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default CompanyInfoManager;