
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, NavLink, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FarmerManager from '../../components/admin/FarmerManager';
import InvestorManager from '../../components/admin/InvestorManager';
import TeamManager from '../../components/admin/TeamManager';
import AdminOverviewPage from './AdminOverviewPage';
import { WaterDropIcon } from '../../components/icons';
import { Farmer, Investor, TeamMember } from '../../types';
import { getFarmers, getInvestors, getTeamMembers } from '../../api/clientApi';
import CompanyInfoManager from '../../components/admin/CompanyInfoManager';

const AdminDashboardPage: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [farmers, setFarmers] = useState<Farmer[]>([]);
    const [investors, setInvestors] = useState<Investor[]>([]);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [farmerData, investorData, teamData] = await Promise.all([
                getFarmers(),
                getInvestors(),
                getTeamMembers()
            ]);
            setFarmers(farmerData);
            setInvestors(investorData);
            setTeamMembers(teamData);
        } catch (e: any) {
            setError(e.message || 'Could not load required data. Please try again.');
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleLogout = () => {
        logout();
    };
    
    const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-3 text-stone-200 transition-colors duration-200 transform rounded-lg ${
      isActive ? 'bg-stone-700' : 'hover:bg-stone-700 hover:text-white'
    }`;

    return (
        <div className="flex h-screen bg-stone-100 font-sans cursor-default">
            <div className="hidden lg:flex flex-col w-64 bg-stone-800">
                <div className="flex items-center justify-center h-20 shadow-md">
                    <div className="flex items-center space-x-2 text-2xl font-bold text-white">
                         <WaterDropIcon className="h-8 w-8 text-teal-500" />
                         <span>AquaGrow</span>
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-between overflow-y-auto">
                    <nav className="mt-6 px-4 space-y-2">
                        <NavLink to="/admin/dashboard/overview" className={linkClass}>
                            <span className="mx-4 font-medium">Overview</span>
                        </NavLink>
                        <NavLink to="/admin/dashboard/farmers" className={linkClass}>
                            <span className="mx-4 font-medium">Farmers</span>
                        </NavLink>
                        <NavLink to="/admin/dashboard/investors" className={linkClass}>
                            <span className="mx-4 font-medium">Investors</span>
                        </NavLink>
                        <NavLink to="/admin/dashboard/team" className={linkClass}>
                            <span className="mx-4 font-medium">Team Members</span>
                        </NavLink>
                        <NavLink to="/admin/dashboard/settings" className={linkClass}>
                            <span className="mx-4 font-medium">Contacts & Socials</span>
                        </NavLink>
                    </nav>
                     <div>
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center w-full px-4 py-3 text-stone-300 transition-colors duration-200 transform hover:bg-stone-700 hover:text-white"
                        >
                            <span className="mx-auto font-medium">Back to Site</span>
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-3 text-stone-200 bg-stone-900 transition-colors duration-200 transform hover:bg-red-800/50"
                        >
                            <span className="mx-auto font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-stone-200 shadow-sm">
                    <h1 className="text-2xl font-semibold text-stone-800">Dashboard</h1>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-stone-100 p-6">
                    <div className="container mx-auto">
                        {loading && <div className="text-center text-stone-600">Loading data...</div>}
                        {error && <div className="text-center text-rose-600 bg-rose-100 p-4 rounded-lg">{error}</div>}
                        {!loading && !error && (
                            <Routes>
                                <Route index element={<Navigate to="overview" replace />} />
                                <Route path="overview" element={<AdminOverviewPage farmers={farmers} investors={investors} />} />
                                <Route path="farmers" element={<FarmerManager farmers={farmers} refreshFarmers={fetchData} />} />
                                <Route path="investors" element={<InvestorManager investors={investors} refreshInvestors={fetchData} />} />
                                <Route path="team" element={<TeamManager teamMembers={teamMembers} refreshTeamMembers={fetchData} />} />
                                <Route path="settings" element={<CompanyInfoManager />} />
                            </Routes>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
