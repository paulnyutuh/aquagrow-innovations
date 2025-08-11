
import React from 'react';

const changelogData = [
    {
        version: '1.2.1',
        date: 'July 27, 2024',
        changes: {
            '✨ New Features': [
                'Added a new Changelog page to track application updates and feature releases over time.',
            ],
            '🐛 Bug Fixes & Improvements': [
                'Improved the clarity of the admin login page instructions.',
            ],
        }
    },
    {
        version: '1.2.0',
        date: 'July 26, 2024',
        changes: {
            '✨ New Features': [
                'Implemented a full-featured admin dashboard for managing farmers, investors, and team members.',
                'Added dynamic content generation for team bios, success stories, and FAQs using Gemini API.',
                'Introduced a user-friendly contact form with AI-powered inquiry processing.',
            ],
            '🐛 Bug Fixes & Improvements': [
                'Fixed a critical bug causing a blank page on load by correcting a library import.',
                'Enhanced security by moving all Gemini API calls to serverless functions, protecting the API key.',
                'Added a user feedback system with toast notifications for form submissions and admin actions.',
                'Improved data persistence with a more robust LocalStorage solution.',
            ],
        }
    },
    {
        version: '1.1.0',
        date: 'July 24, 2024',
        changes: {
            '✨ New Features': [
                'Developed the core public-facing pages: Home, About, Farmers, Impact, and Partners.',
                'Established a secure authentication flow for the admin section.',
                'Created a responsive layout for optimal viewing on all devices.',
            ],
            '🚀 Infrastructure': [
                'Set up the initial React application structure with TypeScript and Tailwind CSS.',
                'Integrated client-side routing using `react-router-dom`.',
                'Designed a professional and consistent color scheme and typography.'
            ]
        }
    },
     {
        version: '1.0.0',
        date: 'July 22, 2024',
        changes: {
            '🚀 Infrastructure': [
                'Initial project setup and scaffolding.',
                'Welcome to AquaGrow Innovations!',
            ]
        }
    },
];

const ChangeTypeTitle = ({ title }: { title: string }) => {
    const icon = title.includes('Features') ? '✨' : title.includes('Bug') ? '🐛' : '🚀';
    const color = title.includes('Features') ? 'text-primary-dark' : title.includes('Bug') ? 'text-accent-dark' : 'text-secondary-dark';

    return (
        <h3 className={`text-lg font-semibold ${color} mt-6 mb-3 flex items-center`}>
            <span className="mr-3 text-xl">{icon}</span>
            {title}
        </h3>
    );
}

const ChangelogPage: React.FC = () => {
  return (
    <div className="bg-neutral-light py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-neutral-dark sm:text-5xl">What's New at AquaGrow</h1>
                <p className="mt-4 text-lg leading-8 text-neutral">
                    We're constantly improving our platform. Here's a log of our recent updates and enhancements.
                </p>
            </div>
            <div className="mt-16 space-y-12">
                {changelogData.map(entry => (
                    <div key={entry.version} className="p-8 bg-white rounded-xl shadow-lg border border-gray-200/50">
                        <div className="flex justify-between items-baseline flex-wrap gap-2">
                            <h2 className="text-2xl font-bold text-primary-dark">Version {entry.version}</h2>
                            <p className="text-sm text-neutral-dark font-medium bg-primary/10 px-3 py-1 rounded-full">{entry.date}</p>
                        </div>
                        <div className="mt-4">
                            {Object.entries(entry.changes).map(([type, list]) => (
                                <div key={type}>
                                    <ChangeTypeTitle title={type} />
                                    <ul className="space-y-2 text-neutral-dark/90">
                                        {(list as string[]).map(item => (
                                            <li key={item} className="flex items-start">
                                                <svg className="h-5 w-5 text-primary flex-shrink-0 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default ChangelogPage;
