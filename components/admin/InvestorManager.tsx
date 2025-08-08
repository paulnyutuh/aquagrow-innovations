
import React, { useState } from 'react';
import { Investor } from '../../types';
import ConfirmModal from './ConfirmModal';
import { addInvestor, updateInvestor, deleteInvestor } from '../../api/clientApi';
import { useToast } from '../../context/ToastContext';


interface InvestorManagerProps {
    investors: Investor[];
    refreshInvestors: () => Promise<void>;
}

const InvestorManager: React.FC<InvestorManagerProps> = ({ investors, refreshInvestors }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentInvestor, setCurrentInvestor] = useState<Partial<Investor>>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [investorToDelete, setInvestorToDelete] = useState<Investor | null>(null);
    const { addToast } = useToast();

    const handleAddNewClick = () => {
        setCurrentInvestor({ name: '', email: '', phone: '', investmentAmount: 0, status: 'Pending' });
        setIsFormOpen(true);
    };

    const handleEditClick = (investor: Investor) => {
        setCurrentInvestor(investor);
        setIsFormOpen(true);
    };

    const handleDeleteClick = (investor: Investor) => {
        setInvestorToDelete(investor);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!investorToDelete) return;
        try {
            await deleteInvestor(investorToDelete.id);
            addToast('Investor deleted successfully.', 'success');
            await refreshInvestors();
        } catch (error) {
            console.error("Failed to delete investor:", error);
            addToast('Error: Could not delete investor.', 'error');
        } finally {
            setIsModalOpen(false);
            setInvestorToDelete(null);
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCurrentInvestor(prev => ({ ...prev, [name]: name === 'investmentAmount' ? parseFloat(value) || 0 : value }));
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { name, email, investmentAmount } = currentInvestor;
        if (!name || !email || investmentAmount === undefined) {
             addToast('Name, email, and investment amount are required.', 'error');
            return;
        }

        const isEditing = !!currentInvestor.id;

        try {
            if (isEditing) {
                await updateInvestor(currentInvestor as Investor);
                addToast('Investor updated successfully.', 'success');
            } else {
                await addInvestor({
                    name: currentInvestor.name || '',
                    email: currentInvestor.email || '',
                    phone: currentInvestor.phone || '',
                    investmentAmount: Number(currentInvestor.investmentAmount) || 0,
                    status: 'Pending',
                });
                addToast('Investor added successfully.', 'success');
            }
            await refreshInvestors();
            setIsFormOpen(false);
            setCurrentInvestor({});
        } catch (error) {
            console.error("Failed to save investor:", error);
            addToast('Error: Could not save investor.', 'error');
        }
    };

    const StatusBadge = ({ status }: { status: Investor['status'] }) => {
        const color = {
            Active: 'bg-teal-100 text-teal-800',
            Pending: 'bg-amber-100 text-amber-800',
            Closed: 'bg-stone-200 text-stone-800',
        }[status];
        return <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${color}`}>{status}</span>;
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-stone-700">Manage Investors</h2>
                <button onClick={isFormOpen ? () => setIsFormOpen(false) : handleAddNewClick} className="px-5 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-amber-600 rounded-lg hover:bg-amber-700 focus:outline-none focus:ring focus:ring-amber-500 focus:ring-opacity-80">
                    {isFormOpen ? 'Cancel' : '+ Add Investor'}
                </button>
            </div>

            {isFormOpen && (
                <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-stone-800 mb-4">{currentInvestor.id ? 'Edit Investor' : 'New Investor Record'}</h3>
                    <form onSubmit={handleFormSubmit}>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="text-stone-700" htmlFor="name">Investor Name</label>
                                <input id="name" name="name" type="text" value={currentInvestor.name || ''} onChange={handleFormChange} required className="block w-full px-4 py-2 mt-2 text-stone-700 bg-white border border-stone-200 rounded-md focus:border-amber-400 focus:ring-amber-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label className="text-stone-700" htmlFor="email">Contact Email</label>
                                <input id="email" name="email" type="email" value={currentInvestor.email || ''} onChange={handleFormChange} required className="block w-full px-4 py-2 mt-2 text-stone-700 bg-white border border-stone-200 rounded-md focus:border-amber-400 focus:ring-amber-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label className="text-stone-700" htmlFor="phone">Phone Number</label>
                                <input id="phone" name="phone" type="tel" value={currentInvestor.phone || ''} onChange={handleFormChange} className="block w-full px-4 py-2 mt-2 text-stone-700 bg-white border border-stone-200 rounded-md focus:border-amber-400 focus:ring-amber-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label className="text-stone-700" htmlFor="investmentAmount">Investment Amount ($)</label>
                                <input id="investmentAmount" name="investmentAmount" type="number" value={currentInvestor.investmentAmount || ''} onChange={handleFormChange} required className="block w-full px-4 py-2 mt-2 text-stone-700 bg-white border border-stone-200 rounded-md focus:border-amber-400 focus:ring-amber-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                            </div>
                            {currentInvestor.id && (
                                <div className="sm:col-span-2">
                                    <label className="text-stone-700" htmlFor="status">Status</label>
                                    <select id="status" name="status" value={currentInvestor.status || 'Pending'} onChange={handleFormChange} className="block w-full px-4 py-2 mt-2 text-stone-700 bg-white border border-stone-200 rounded-md focus:border-amber-400 focus:ring-amber-300 focus:ring-opacity-40 focus:outline-none focus:ring">
                                        <option>Pending</option>
                                        <option>Active</option>
                                        <option>Closed</option>
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
                                <th scope="col" className="px-6 py-4 text-sm font-semibold text-stone-600 uppercase tracking-wider">Email</th>
                                <th scope="col" className="px-6 py-4 text-sm font-semibold text-stone-600 uppercase tracking-wider">Phone</th>
                                <th scope="col" className="px-6 py-4 text-sm font-semibold text-stone-600 uppercase tracking-wider text-right">Amount</th>
                                <th scope="col" className="px-6 py-4 text-sm font-semibold text-stone-600 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-4 text-sm font-semibold text-stone-600 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-200">
                            {investors.map((investor) => (
                                <tr key={investor.id} className="hover:bg-stone-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-stone-800">{investor.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600">{investor.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600">{investor.phone || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600 text-right">${investor.investmentAmount.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600"><StatusBadge status={investor.status} /></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right space-x-2">
                                        <button onClick={() => handleEditClick(investor)} className="text-amber-600 hover:text-amber-900 transition">Edit</button>
                                        <button onClick={() => handleDeleteClick(investor)} className="text-rose-600 hover:text-rose-900 transition">Delete</button>
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
                message={`Are you sure you want to delete the record for ${investorToDelete?.name}? This action cannot be undone.`}
            />
        </div>
    );
};

export default InvestorManager;