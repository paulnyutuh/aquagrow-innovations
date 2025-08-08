import React, { useState, useEffect } from 'react';
import { SuccessStory } from '../types';
import { getGeneratedSuccessStories } from '../api/clientApi';

const ImpactMetricCard = ({ value, label, description }: { value: string, label: string, description: string }) => (
    <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
        <p className="text-5xl font-extrabold text-secondary">{value}</p>
        <p className="mt-2 text-xl font-bold text-neutral-dark">{label}</p>
        <p className="mt-3 text-base text-neutral">{description}</p>
    </div>
);

const SuccessStoryCard: React.FC<{ story: Omit<SuccessStory, 'farmerName'> & { name: string } }> = ({ story }) => (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <img className="h-64 w-full md:w-1/3 object-cover" src={story.imageUrl} alt={story.name} />
        <div className="p-8 flex flex-col justify-center">
            <p className="text-lg italic text-neutral-dark">"{story.quote}"</p>
            <div className="mt-4">
                <p className="font-bold text-primary-dark text-lg">{story.name}</p>
                <p className="text-neutral">{story.location}</p>
            </div>
            <p className="mt-4 text-neutral">{story.story}</p>
        </div>
    </div>
);


const ImpactPage: React.FC = () => {
    const [successStories, setSuccessStories] = useState<(Omit<SuccessStory, 'farmerName'> & { name: string })[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStories = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getGeneratedSuccessStories();
                setSuccessStories(data);
            } catch (err) {
                console.error("Failed to fetch success stories:", err);
                setError("Could not load success stories at this time. Please check back later.");
            } finally {
                setLoading(false);
            }
        };
        fetchStories();
    }, []);

    return (
        <div className="bg-neutral-light">
            <div className="relative isolate overflow-hidden py-24 sm:py-32">
                <img src="https://picsum.photos/1920/1080?image=299" alt="Farm landscape" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-neutral-dark/60"></div>
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Growth that Matters</h1>
                    <p className="mt-6 text-lg leading-8 text-gray-200 max-w-3xl mx-auto">
                        Our impact is measured not just in yields, but in transformed lives, resilient communities, and a healthier planet.
                    </p>
                </div>
            </div>

            {/* Key Metrics Section */}
            <section className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-neutral-dark sm:text-4xl">Our Impact by the Numbers</h2>
                        <p className="mt-4 text-lg leading-8 text-neutral">
                           These are the results we strive for with every partnership. Data is based on our pilot programs and future projections.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 md:max-w-none md:grid-cols-3">
                        <ImpactMetricCard value="200%" label="Average Income Increase" description="Farmers in our program see their income more than double within two years." />
                        <ImpactMetricCard value="70%" label="Water Savings" description="Our drip irrigation systems use significantly less water than traditional methods." />
                        <ImpactMetricCard value="1,500" label="Farmers Supported" description="The number of small-scale farmers we aim to onboard in the next three years." />
                    </div>
                </div>
            </section>

            {/* Success Stories Section */}
            <section className="py-24 sm:py-32 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-neutral-dark sm:text-4xl">Success Stories</h2>
                        <p className="mt-4 text-lg text-neutral">
                            Real stories from real farmers whose lives have been transformed through our partnership.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 space-y-16">
                         {loading ? (
                            <p className="text-center text-neutral">Loading success stories...</p>
                        ) : error ? (
                             <p className="text-center text-red-600 bg-red-50 p-4 rounded-md">{error}</p>
                        ) : (
                            successStories.map((story) => (
                                <SuccessStoryCard key={story.name} story={story} />
                            ))
                        )}
                    </div>
                </div>
            </section>
            
            {/* Environmental & Social Benefits Section */}
            <section className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
                        <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
                            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                                <h2 className="text-base font-semibold leading-7 text-primary">Broader Impact</h2>
                                <p className="mt-2 text-3xl font-bold tracking-tight text-neutral-dark sm:text-4xl">Beyond the Farm</p>
                                <p className="mt-6 text-lg leading-8 text-neutral">
                                    Our work creates a ripple effect, fostering positive change that extends far beyond individual plots of land.
                                </p>
                                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-neutral lg:max-w-none">
                                    <div className="relative pl-9">
                                        <dt className="inline font-semibold text-neutral-dark">Food Security:</dt>
                                        <dd className="inline"> By enabling year-round cultivation of diverse crops, we help strengthen local food supplies and reduce dependence on imports.</dd>
                                    </div>
                                    <div className="relative pl-9">
                                        <dt className="inline font-semibold text-neutral-dark">Water Conservation:</dt>
                                        <dd className="inline"> We actively combat water scarcity by implementing and championing water-efficient technologies, preserving this precious resource for future generations.</dd>
                                    </div>
                                    <div className="relative pl-9">
                                        <dt className="inline font-semibold text-neutral-dark">Rural Development:</dt>
                                        <dd className="inline"> Creating economic opportunities in rural areas helps reduce urban migration and builds more stable, prosperous local communities.</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                        <div className="sm:px-6 lg:px-0">
                             <img src="https://picsum.photos/1000/800?image=55" alt="Community" className="rounded-xl shadow-xl ring-1 ring-gray-400/10 w-full" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ImpactPage;