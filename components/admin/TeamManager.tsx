
import React, { useState } from 'react';
import { TeamMember } from '../../types';
import ConfirmModal from './ConfirmModal';
import { addTeamMember, updateTeamMember, deleteTeamMember } from '../../api/clientApi';
import { useToast } from '../../context/ToastContext';

interface TeamManagerProps {
    teamMembers: TeamMember[];
    refreshTeamMembers: () => Promise<void>;
}

const TeamManager: React.FC<TeamManagerProps> = ({ teamMembers, refreshTeamMembers }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentMember, setCurrentMember] = useState<Partial<TeamMember>>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const { addToast } = useToast();

    const handleAddNewClick = () => {
        setCurrentMember({ name: '', role: '', bio: '', imageUrl: '' });
        setImagePreview(null);
        setIsFormOpen(true);
    };

    const handleEditClick = (member: TeamMember) => {
        setCurrentMember(member);
        setImagePreview(member.imageUrl);
        setIsFormOpen(true);
    };
    
    const handleDeleteClick = (member: TeamMember) => {
        setMemberToDelete(member);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!memberToDelete) return;
        try {
            await deleteTeamMember(memberToDelete.id);
            addToast('Team member deleted.', 'success');
            await refreshTeamMembers();
        } catch (error) {
            console.error("Failed to delete team member:", error);
            addToast('Error: Could not delete team member.', 'error');
        } finally {
            setIsModalOpen(false);
            setMemberToDelete(null);
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCurrentMember(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setCurrentMember(prev => ({ ...prev, imageUrl: base64String }));
                setImagePreview(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { name, role, bio, imageUrl } = currentMember;
        if (!name || !role || !bio || !imageUrl) {
            addToast('All fields, including an image, are required.', 'error');
            return;
        }

        const isEditing = !!currentMember.id;

        try {
            if (isEditing) {
                await updateTeamMember(currentMember as TeamMember);
                addToast('Team member updated.', 'success');
            } else {
                await addTeamMember({ name, role, bio, imageUrl });
                addToast('Team member added.', 'success');
            }
            await refreshTeamMembers();
            setIsFormOpen(false);
            setCurrentMember({});
            setImagePreview(null);
        } catch (error) {
            console.error("Failed to save team member:", error);
            addToast('Error: Could not save team member.', 'error');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-stone-700">Manage Team Members</h2>
                <button onClick={isFormOpen ? () => setIsFormOpen(false) : handleAddNewClick} className="px-5 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-amber-600 rounded-lg hover:bg-amber-700 focus:outline-none focus:ring focus:ring-amber-500 focus:ring-opacity-80">
                    {isFormOpen ? 'Cancel' : '+ Add Member'}
                </button>
            </div>

            {isFormOpen && (
                <div className="p-6 mb-6 bg-white rounded-lg shadow-md transition-all duration-300">
                    <h3 className="text-lg font-semibold text-stone-800 mb-4">{currentMember.id ? 'Edit Team Member' : 'New Team Member'}</h3>
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2 space-y-6">
                                <div>
                                    <label className="text-stone-700" htmlFor="name">Full Name</label>
                                    <input id="name" name="name" type="text" value={currentMember.name || ''} onChange={handleFormChange} required className="block w-full px-4 py-2 mt-2 text-stone-700 bg-white border border-stone-200 rounded-md focus:border-amber-400 focus:ring-amber-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                                </div>
                                <div>
                                    <label className="text-stone-700" htmlFor="role">Role</label>
                                    <input id="role" name="role" type="text" value={currentMember.role || ''} onChange={handleFormChange} required className="block w-full px-4 py-2 mt-2 text-stone-700 bg-white border border-stone-200 rounded-md focus:border-amber-400 focus:ring-amber-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                                </div>
                            </div>
                             <div className="space-y-2">
                                <label className="text-stone-700">Photo</label>
                                <div className="mt-2 flex items-center justify-center flex-col space-y-4">
                                    <div className="h-32 w-32 rounded-full bg-stone-100 flex items-center justify-center overflow-hidden">
                                        {imagePreview ? <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" /> : <span className="text-xs text-stone-500">Preview</span>}
                                    </div>
                                    <label htmlFor="file-upload" className="cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-stone-800 shadow-sm ring-1 ring-inset ring-stone-300 hover:bg-stone-50">
                                        <span>Upload photo</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="text-stone-700" htmlFor="bio">Bio</label>
                            <textarea id="bio" name="bio" value={currentMember.bio || ''} onChange={handleFormChange} required rows={4} className="block w-full px-4 py-2 mt-2 text-stone-700 bg-white border border-stone-200 rounded-md focus:border-amber-400 focus:ring-amber-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                        </div>
                        <div className="flex justify-end mt-6">
                            <button type="submit" className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-amber-600 rounded-lg hover:bg-amber-700 focus:outline-none focus:ring focus:ring-amber-500 focus:ring-opacity-50">Save</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-stone-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-sm font-semibold text-stone-600 uppercase tracking-wider">Photo</th>
                                <th scope="col" className="px-6 py-4 text-sm font-semibold text-stone-600 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-4 text-sm font-semibold text-stone-600 uppercase tracking-wider">Role</th>
                                <th scope="col" className="px-6 py-4 text-sm font-semibold text-stone-600 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-200">
                            {teamMembers.map((member) => (
                                <tr key={member.id} className="hover:bg-stone-50">
                                    <td className="px-6 py-4">
                                        <img src={member.imageUrl} alt={member.name} className="h-12 w-12 rounded-full object-cover"/>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-stone-800">{member.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600">{member.role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right space-x-2">
                                        <button onClick={() => handleEditClick(member)} className="text-amber-600 hover:text-amber-900 transition">Edit</button>
                                        <button onClick={() => handleDeleteClick(member)} className="text-rose-600 hover:text-rose-900 transition">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ConfirmModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Confirm Deletion"
                message={`Are you sure you want to delete the record for ${memberToDelete?.name}? This action cannot be undone.`}
            />
        </div>
    );
};

export default TeamManager;