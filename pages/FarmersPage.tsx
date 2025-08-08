import React, { useState, useEffect } from 'react';
import { FaqItem } from '../types';
import { getGeneratedFaqs } from '../api/clientApi';

const FaqComponent: React.FC<FaqItem & { initialOpen?: boolean }> = ({ question, answer, initialOpen = false }) => {
    const [isOpen, setIsOpen] = useState(initialOpen);
    return (
        <div className="border-b border-gray-200 py-6">
            <dt>
                <button onClick={() => setIsOpen(!isOpen)} className="flex w-full items-start justify-between text-left text-neutral">
                    <span className="text-base font-medium text-neutral-dark">{question}</span>
                    <span className="ml-6 flex h-7 items-center">
                        <svg className={`h-6 w-6 transform transition-transform duration-200 ${isOpen ? '-rotate-180' : 'rotate-0'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                </button>
            </dt>
            {isOpen && (
                <dd className="mt-2 pr-12 transition-all duration-300">
                    <p className="text-base text-neutral">{answer}</p>
                </dd>
            )}
        </div>
    );
};


const FarmersPage: React.FC = () => {
    const [faqItems, setFaqItems] = useState<FaqItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFaqs = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getGeneratedFaqs();
                setFaqItems(data);
            } catch (err) {
                console.error("Failed to fetch FAQs:", err);
                setError("Could not load frequently asked questions right now. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchFaqs();
    }, []);

    return (
        <div className="bg-white">
            <div className="bg-primary-dark">
                <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Your Journey to Prosperity Starts Here</h1>
                    <p className="mx-auto mt-4 max-w-3xl text-lg text-primary-light">
                        A step-by-step guide to partnering with AquaGrow Innovations. We make it simple, transparent, and profitable for you.
                    </p>
                </div>
            </div>

            {/* How It Works Section */}
            <section className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-primary">How It Works</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-neutral-dark sm:text-4xl">A Simple Path to Higher Yields</p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                            <div className="flex flex-col items-center text-center p-4">
                                <div className="text-5xl font-extrabold text-secondary">1</div>
                                <dt className="mt-4 text-xl font-semibold text-neutral-dark">Apply & Qualify</dt>
                                <dd className="mt-2 flex flex-auto flex-col text-base leading-7 text-neutral">
                                    <p className="flex-auto">Submit your application. Our team will visit your farm to assess land and water suitability and discuss the partnership.</p>
                                </dd>
                            </div>
                            <div className="flex flex-col items-center text-center p-4">
                                <div className="text-5xl font-extrabold text-secondary">2</div>
                                <dt className="mt-4 text-xl font-semibold text-neutral-dark">Installation & Training</dt>
                                <dd className="mt-2 flex flex-auto flex-col text-base leading-7 text-neutral">
                                    <p className="flex-auto">Once approved, we install a state-of-the-art drip irrigation system and provide you with initial inputs and comprehensive training.</p>
                                </dd>
                            </div>
                            <div className="flex flex-col items-center text-center p-4">
                                <div className="text-5xl font-extrabold text-secondary">3</div>
                                <dt className="mt-4 text-xl font-semibold text-neutral-dark">Grow, Harvest & Sell</dt>
                                <dd className="mt-2 flex flex-auto flex-col text-base leading-7 text-neutral">
                                    <p className="flex-auto">You manage the farm with our expert guidance. We help you harvest and sell the produce to our network of reliable buyers for the best price.</p>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </section>
            
            {/* Roles & Responsibilities Section */}
            <section className="bg-neutral-light py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-neutral-dark sm:text-4xl">A True Partnership</h2>
                        <p className="mt-4 text-lg text-neutral">We both have a role to play in our shared success.</p>
                    </div>
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold text-primary-dark">What You Get (Our Investment)</h3>
                            <ul className="mt-6 space-y-4 text-neutral">
                                <li className="flex items-start"><span className="text-primary mr-3 mt-1">&#10003;</span> A complete drip irrigation system, installed.</li>
                                <li className="flex items-start"><span className="text-primary mr-3 mt-1">&#10003;</span> High-quality seeds and initial farm inputs.</li>
                                <li className="flex items-start"><span className="text-primary mr-3 mt-1">&#10003;</span> Continuous hands-on training and agronomic support.</li>
                                <li className="flex items-start"><span className="text-primary mr-3 mt-1">&#10003;</span> Guaranteed access to a reliable market for your produce.</li>
                                <li className="flex items-start"><span className="text-primary mr-3 mt-1">&#10003;</span> A transparent share of the profits.</li>
                            </ul>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold text-accent-dark">Your Role (Your Contribution)</h3>
                            <ul className="mt-6 space-y-4 text-neutral">
                                <li className="flex items-start"><span className="text-accent mr-3 mt-1">&#10003;</span> Provide access to your land and a reliable water source.</li>
                                <li className="flex items-start"><span className="text-accent mr-3 mt-1">&#10003;</span> Dedicate your time and daily labor to manage the farm.</li>
                                <li className="flex items-start"><span className="text-accent mr-3 mt-1">&#10003;</span> Follow the expert agricultural advice and best practices.</li>
                                <li className="flex items-start"><span className="text-accent mr-3 mt-1">&#10003;</span> Commit to the partnership agreement with integrity.</li>
                                <li className="flex items-start"><span className="text-accent mr-3 mt-1">&#10003;</span> Share a passion for farming and a desire to succeed.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Eligibility Section */}
            <section className="py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="text-3xl font-bold text-center text-neutral-dark">Are You Eligible?</h2>
                        <p className="text-center mt-4 text-lg text-neutral">We are currently focused on specific regions but are always expanding. We look for farmers who:</p>
                        <ul className="mt-8 list-disc list-inside space-y-2 text-lg text-neutral bg-green-50 p-6 rounded-lg">
                            <li>Operate in the semi-arid regions of Kenya.</li>
                            <li>Have secure access to at least 1 acre of land.</li>
                            <li>Have a reliable water source on or near their land (borehole, river, well).</li>
                            <li>Are committed to farming as a business.</li>
                            <li>Are willing to learn and adopt new farming techniques.</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
                        <h2 className="text-2xl font-bold leading-10 tracking-tight text-neutral-dark">Frequently Asked Questions</h2>
                        <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                            {loading ? (
                                <p className="text-neutral">Loading questions...</p>
                            ) : error ? (
                                <p className="text-red-600 bg-red-50 p-4 rounded-md">{error}</p>
                            ) : (
                                faqItems.map((item, index) => (
                                    <FaqComponent key={item.question} {...item} initialOpen={index === 0} />
                                ))
                            )}
                        </dl>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default FarmersPage;