import React from 'react';
import { Link } from 'react-router-dom';

const PartnersPage: React.FC = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-neutral-dark">
                <div className="absolute inset-0">
                    <img
                        className="h-full w-full object-cover"
                        src="https://picsum.photos/1920/1280?image=338"
                        alt="Investment growth"
                    />
                    <div className="absolute inset-0 bg-neutral-dark/70 mix-blend-multiply" aria-hidden="true" />
                </div>
                <div className="relative mx-auto max-w-7xl py-24 px-6 sm:py-32 lg:px-8">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">Invest in Sustainable Growth</h1>
                    <p className="mt-6 max-w-3xl text-xl text-gray-300">
                        Partner with AquaGrow to generate compelling financial returns while creating lasting social and environmental impact in Kenya.
                    </p>
                </div>
            </div>

            {/* Why Partner Section */}
            <section className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-primary">The Opportunity</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-neutral-dark sm:text-4xl">Why Partner with AquaGrow</p>
                        <p className="mt-6 text-lg leading-8 text-neutral">
                            We offer a unique, de-risked investment opportunity at the intersection of ag-tech, impact investing, and emerging markets.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                            <div className="flex flex-col rounded-lg bg-neutral-light p-8">
                                <dt className="text-xl font-semibold text-neutral-dark">Scalable Business Model</dt>
                                <dd className="mt-2 flex flex-auto flex-col text-base leading-7 text-neutral">
                                    <p className="flex-auto">Our farm-in-a-box approach is standardized and repeatable, designed for rapid and efficient scaling across multiple regions.</p>
                                </dd>
                            </div>
                            <div className="flex flex-col rounded-lg bg-neutral-light p-8">
                                <dt className="text-xl font-semibold text-neutral-dark">Proven Impact</dt>
                                <dd className="mt-2 flex flex-auto flex-col text-base leading-7 text-neutral">
                                    <p className="flex-auto">We don't just talk about impact; we measure it. Our model delivers quantifiable improvements in farmer income, water use, and food security.</p>
                                </dd>
                            </div>
                            <div className="flex flex-col rounded-lg bg-neutral-light p-8">
                                <dt className="text-xl font-semibold text-neutral-dark">Strong Management</dt>
                                <dd className="mt-2 flex flex-auto flex-col text-base leading-7 text-neutral">
                                    <p className="flex-auto">Led by a team with deep expertise in agriculture, technology, finance, and local community engagement, we have the skills to execute our vision.</p>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </section>
            
            {/* Investment Opportunity Section */}
            <section className="bg-primary-dark text-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">A Dual Return: Profit & Purpose</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Your investment directly funds the purchase and installation of drip irrigation systems and initial inputs for our partner farmers. Revenue is generated from the sale of high-value produce, and profits are shared between the farmer, AquaGrow, and our investors. This creates a sustainable loop of capital that fuels further expansion and deepens our impact. We offer a clear pathway to financial returns, coupled with the profound social dividend of empowering communities and building a more food-secure future.
                        </p>
                    </div>
                </div>
            </section>
            
            {/* Scalability Vision Section */}
            <section className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-neutral-dark sm:text-4xl">Our Vision for Scale</h2>
                        <p className="mt-4 text-lg leading-8 text-neutral">
                            We are poised for significant growth. Our roadmap outlines a clear strategy for expansion.
                        </p>
                    </div>
                    <div className="mt-16 border-t border-gray-200 pt-16">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div className="p-6">
                                <p className="text-2xl font-bold text-secondary">Phase 1: 2024</p>
                                <p className="mt-2 font-semibold text-neutral-dark">500 Acres | 500 Farmers</p>
                                <p className="mt-1 text-neutral">Establish a strong foothold in Makueni and Machakos counties, refining operations and logistics.</p>
                            </div>
                            <div className="p-6 border-l border-r border-gray-200">
                                <p className="text-2xl font-bold text-secondary">Phase 2: 2025-2026</p>
                                <p className="mt-2 font-semibold text-neutral-dark">2,000 Acres | 2,000 Farmers</p>
                                <p className="mt-1 text-neutral">Expand into neighboring semi-arid counties and introduce crop diversification and value-addition services.</p>
                            </div>
                            <div className="p-6">
                                <p className="text-2xl font-bold text-secondary">Phase 3: 2027+</p>
                                <p className="mt-2 font-semibold text-neutral-dark">5,000+ Acres | 5,000+ Farmers</p>
                                <p className="mt-1 text-neutral">Achieve national scale, explore regional expansion, and integrate carbon credit programs.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-neutral-light">
                <div className="mx-auto max-w-7xl py-12 px-6 sm:py-16 lg:flex lg:items-center lg:justify-between lg:py-20 lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight text-neutral-dark sm:text-4xl">
                        <span className="block">Ready to make an impact?</span>
                        <span className="block text-primary">Partner with AquaGrow today.</span>
                    </h2>
                    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                        <div className="inline-flex rounded-md shadow">
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center rounded-md border border-transparent bg-accent px-5 py-3 text-base font-medium text-white hover:bg-accent-dark"
                            >
                                Contact our Partnerships Team
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PartnersPage;