
import React, { useState } from 'react';
import { Farmer } from '../../types';
import ConfirmModal from './ConfirmModal';
import { addFarmer, updateFarmer, deleteFarmer } from '../../api/clientApi';
import { useToast } from '../../context/ToastContext';

interface FarmerManagerProps {
    farmers: Farmer[];
    refreshFarmers: () => Promise<void>;
}

const FarmerManager: React.FC<FarmerManagerProps> = ({ farmers, refreshFarmers }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentFarmer, setCurrentFarmer] = useState<Partial<Farmer>>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [farmerToDelete, setFarmerToDelete] = useState<Farmer | null>(null);
    const { addToast } = useToast();

    const handleAddNewClick = () => {
        setCurrentFarmer({ name: '', location: '', phone: '', status: 'Pending' });
        setIsFormOpen(true);
    };

    const handleEditClick = (farmer: Farmer) => {
        setCurrentFarmer(farmer);
        setIsFormOpen(true);
    };
    
    const handleDeleteClick = (farmer: Farmer) => {
        setFarmerToDelete(farmer);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!farmerToDelete) return;
        try {
            await deleteFarmer(farmerToDelete.id);
            addToast('Farmer deleted successfully.', 'success');
            await refreshFarmers();
        } catch (error) {
            console.error("Failed to delete farmer:", error);
            addToast('Error: Could not delete farmer.', 'error');
        } finally {
            setIsModalOpen(false);
            setFarmerToDelete(null);
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCurrentFarmer(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!currentFarmer.name || !currentFarmer.location) {
            addToast('Name and location are required.', 'error');
            return;
        }
        const isEditing = !!currentFarmer.id;

        try {
            if (isEditing) {
                await updateFarmer(currentFarmer as Farmer);
                addToast('Farmer updated successfully.', 'success');
            } else {
                await addFarmer({
                    name: currentFarmer.name || '',
                    location: currentFarmer.location || '',
                    phone: currentFarmer.phone || '',
                    status: 'Pending',
                });
                addToast('Farmer added successfully.', 'success');
            }
            await refreshFarmers();
            setIsFormOpen(false);
            setCurrentFarmer({});
        } catch (error) {
            console.error("Failed to save farmer:", error);
            addToast('Error: Could not save farmer.', 'error');
        }
    };

    const StatusBadge = ({ status }: { status: Farmer['status'] }) => {
        const color = {
            Active: 'bg-teal-100 text-teal-800',
            Pending: 'bg-amber-100 text-amber-800',
            Rejected: 'bg-rose-100 text-rose-800',
        }[status];
        return <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${color}`}>{status}</span>;
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-stone-700">Manage Farmers</h2>
                <button onClick={isFormOpen ? () => setIsFormOpen(false) : handleAddNewClick} className="px-5 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-amber-600 rounded-lg hover:bg-amber-700 focus:outline-none focus:ring focus:ring-amber-500 focus:ring-opacity-80">
                    {isFormOpen ? 'Cancel' : '+ Add Farmer'}
                </button>
            </div>

            {isFormOpen && (
                <div className="p-6 mb-6 bg-white rounded-lg shadow-md transition-all duration-300">
                    <h3 className="text-lg font-semibold text-stone-800 mb-4">{currentFarmer.id ? 'Edit Farmer' : 'New Farmer Application'}</h3>
                    <form onSubmit={handleFormSubmit}>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                            <div>
                                <label className="text-stone-700" htmlFor="name">Full Name</label>
                                <input id="name" name="name" type="text" value={currentFarmer.name || ''} onChange={handleFormChange} required className="block w-full px-4 py-2 mt-2 text-stone-700 bg-white border border-stone-200 rounded-md focus:border-amber-400 focus:ring-amber-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label className="text-stone-700" htmlFor="location">Location (County)</label>
                                <input id="location" name="location" type="text" value={currentFarmer.location || ''} onChange={handleFormChange} required className="block w-full px-4 py-2 mt-2 text-stone-700 bg-white border border-stone-200 rounded-md focus:border-amber-400 focus:ring-amber-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label className="text-stone-700" htmlFor="phone">Phone Number</label>
                                <input id="phone" name="phone" type="tel" value={currentFarmer.phone || ''} onChange={handleFormChange} className="block w-full px-4 py-2 mt-2 text-stone-700 bg-white border border-stone-200 rounded-md focus:border-amber-400 focus:ring-amber-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                            </div>
                             {currentFarmer.id && (
                                <div className="md:col-span-3">
                                    <label className="text-stone-700" htmlFor="status">Status</label>
                                    <select id="status" name="status" value={currentFarmer.status || 'Pending'} onChange={handleFormChange} className="block w-full px-4 py-2 mt-2 text-stone-700 bg-white border border-stone-200 rounded-md focus:border-amber-400 focus:ring-amber-300 focus:ring-opacity-40 focus:outline-none focus:ring">
                                        <option>Pending</option>
                                        <option>Active</option>
                                        <option>Rejected</option>
                                    </select>
                                </div>
                             )}
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
                                <th scope="col" className="px-6 py-4 text-sm font-semibold text-stone-600 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-4 text-sm font-semibold text-stone-600 uppercase tracking-wider">Location</th>
                                <th scope="col" className="px-6 py-4 text-sm font-semibold text-stone-600 uppercase tracking-wider">Phone</th>
                                <th scope="col" className="px-6 py-4 text-sm font-semibold text-stone-600 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-4 text-sm font-semibold text-stone-600 uppercase tracking-wider">Join Date</th>
                                <th scope="col" className="px-6 py-4 text-sm font-semibold text-stone-600 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-200">
                            {farmers.map((farmer) => (
                                <tr key={farmer.id} className="hover:bg-stone-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-stone-800">{farmer.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600">{farmer.location}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600">{farmer.phone || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600"><StatusBadge status={farmer.status} /></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600">{farmer.joinDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right space-x-2">
                                        <button onClick={() => handleEditClick(farmer)} className="text-amber-600 hover:text-amber-900 transition">Edit</button>
                                        <button onClick={() => handleDeleteClick(farmer)} className="text-rose-600 hover:text-rose-900 transition">Delete</button>
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
                message={`Are you sure you want to delete the record for ${farmerToDelete?.name}? This action cannot be undone.`}
            />
        </div>
    );
};

export default FarmerManager;