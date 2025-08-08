import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { WaterDropIcon } from '../../components/icons';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(username, password);
    if (!success) {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col justify-center items-center p-4 cursor-default">
        <div className="absolute top-4 left-4">
            <button onClick={() => navigate('/')} className="px-4 py-2 bg-white rounded-md shadow-sm text-amber-700 hover:bg-amber-50 font-semibold transition-colors">
                &larr; Back to Main Site
            </button>
        </div>
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
            <div className="flex justify-center mb-6">
                 <div className="flex items-center space-x-2 text-3xl font-extrabold text-stone-800">
                    <WaterDropIcon className="h-10 w-10 text-teal-600" />
                    <span>AquaGrow Admin</span>
                </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-stone-700 mb-2">Admin Access</h2>
            <p className="text-center text-stone-500 mb-6 text-sm">
                Use `admin` / `password` to login.
            </p>
            
            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-stone-700">Username</label>
                    <div className="mt-1">
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password"className="block text-sm font-medium text-stone-700">Password</label>
                    <div className="mt-1">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                        />
                    </div>
                </div>

                {error && (
                    <p className="text-sm text-red-600 text-center">{error}</p>
                )}

                <div>
                    <button 
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent bg-amber-600 py-3 px-6 text-base font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors"
                    >
                        Enter Admin Dashboard
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default AdminLoginPage;