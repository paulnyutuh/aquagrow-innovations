
import React from 'react';
import { Farmer, Investor } from '../../types';

interface AdminOverviewProps {
    farmers: Farmer[];
    investors: Investor[];
}

const KpiCard: React.FC<{ title: string; value: string | number; description: string; }> = ({ title, value, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-sm font-medium text-stone-500 uppercase tracking-wider">{title}</h3>
        <p className="mt-2 text-3xl font-bold text-stone-800">{value}</p>
        <p className="mt-1 text-sm text-stone-600">{description}</p>
    </div>
);

const BarChart: React.FC<{ title: string; data: { label: string; value: number; color: string; }[] }> = ({ title, data }) => {
    const maxValue = Math.max(...data.map(d => d.value), 1);
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-stone-700 mb-4">{title}</h3>
            <div className="space-y-4">
                {data.map(item => (
                    <div key={item.label} className="flex items-center">
                        <span className="w-24 text-sm text-stone-600">{item.label}</span>
                        <div className="flex-1 flex items-center">
                            <div className="w-full bg-stone-100 rounded-full h-6 mr-2">
                                <div
                                    className={`${item.color} h-6 rounded-full flex items-center justify-end pr-2 text-white text-xs font-bold`}
                                    style={{ width: `${(item.value / maxValue) * 100}%` }}
                                >
                                    {item.value > 0 && <span>{item.value}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {data.length === 0 && <p className="text-stone-500 text-sm">No data available.</p>}
            </div>
        </div>
    );
};


const AdminOverviewPage: React.FC<AdminOverviewProps> = ({ farmers, investors }) => {
    const totalFarmers = farmers.length;
    const activeFarmers = farmers.filter(f => f.status === 'Active').length;
    const totalInvestors = investors.length;
    const totalInvestment = investors.reduce((sum, i) => sum + i.investmentAmount, 0);

    const farmerStatusData = [
        { label: 'Active', value: farmers.filter(f => f.status === 'Active').length, color: 'bg-teal-500' },
        { label: 'Pending', value: farmers.filter(f => f.status === 'Pending').length, color: 'bg-amber-500' },
        { label: 'Rejected', value: farmers.filter(f => f.status === 'Rejected').length, color: 'bg-rose-500' },
    ];

    const investorStatusData = [
        { label: 'Active', value: investors.filter(i => i.status === 'Active').length, color: 'bg-teal-500' },
        { label: 'Pending', value: investors.filter(i => i.status === 'Pending').length, color: 'bg-amber-500' },
        { label: 'Closed', value: investors.filter(i => i.status === 'Closed').length, color: 'bg-stone-500' },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-stone-800">Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard title="Total Farmers" value={totalFarmers} description={`${activeFarmers} are active`} />
                <KpiCard title="Total Investors" value={totalInvestors} description="Across all funds" />
                <KpiCard title="Total Investment" value={`$${totalInvestment.toLocaleString()}`} description="Committed capital" />
                <KpiCard title="Active Projects" value={activeFarmers} description="Farms currently in operation" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BarChart title="Farmer Status" data={farmerStatusData} />
                <BarChart title="Investor Status" data={investorStatusData} />
            </div>
        </div>
    );
};

export default AdminOverviewPage;
