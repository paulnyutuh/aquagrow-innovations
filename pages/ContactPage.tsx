import React, { useState, useEffect } from 'react';
import { getCompanyInfo, processContactInquiry } from '../api/clientApi';
import { CompanyInfo } from '../types';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: 'Farmer Inquiry',
        message: '',
    });
    const [status, setStatus] = useState('');
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);

    useEffect(() => {
        getCompanyInfo().then(setCompanyInfo).catch(console.error);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Sending...');
        try {
            const result = await processContactInquiry(formData);
            const successMessage = `Thank you, ${formData.name}! Your message regarding "${result.summary}" has been received. We will get back to you shortly.`;
            setStatus(successMessage);
            setFormData({ name: '', email: '', phone: '', subject: 'Farmer Inquiry', message: '' });
        } catch (error) {
            console.error("Failed to process contact form:", error);
            setStatus('Sorry, there was an error sending your message. Please try again later.');
        }
    };

    return (
        <div className="relative bg-white">
            <div className="absolute inset-0">
                <div className="absolute inset-y-0 left-0 w-1/2 bg-neutral-light" />
            </div>
            <div className="relative mx-auto max-w-7xl lg:grid lg:grid-cols-5">
                <div className="bg-neutral-light py-16 px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
                    <div className="mx-auto max-w-lg">
                        <h2 className="text-2xl font-bold tracking-tight text-neutral-dark sm:text-3xl">Get in Touch</h2>
                        <p className="mt-3 text-lg leading-6 text-neutral">
                            We'd love to hear from you. Whether you're a farmer interested in our program, a potential investor, or just want to learn more, please reach out.
                        </p>
                        {companyInfo ? (
                        <dl className="mt-8 text-base text-neutral">
                            <div>
                                <dt className="sr-only">Physical address</dt>
                                <dd>
                                    {companyInfo.address.map((line, i) => <p key={i}>{line}</p>)}
                                </dd>
                            </div>
                            <div className="mt-6">
                                <dt className="sr-only">Phone number</dt>
                                <dd className="flex">
                                    <svg className="h-6 w-6 flex-shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span className="ml-3">{companyInfo.phone}</span>
                                </dd>
                            </div>
                            <div className="mt-3">
                                <dt className="sr-only">Email</dt>
                                <dd className="flex">
                                    <svg className="h-6 w-6 flex-shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="ml-3">{companyInfo.email}</span>
                                </dd>
                            </div>
                        </dl>
                        ) : (
                            <div className="mt-8 text-neutral">Loading contact details...</div>
                        )}
                    </div>
                </div>
                <div className="bg-white py-16 px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
                    <div className="mx-auto max-w-lg lg:max-w-none">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
                            <div>
                                <label htmlFor="name" className="sr-only">Full name</label>
                                <input type="text" name="name" id="name" autoComplete="name" value={formData.name} onChange={handleChange} required className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-primary focus:ring-primary" placeholder="Full name" />
                            </div>
                             <div>
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input id="email" name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} required className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-primary focus:ring-primary" placeholder="Email" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="sr-only">Phone</label>
                                <input type="text" name="phone" id="phone" autoComplete="tel" value={formData.phone} onChange={handleChange} className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-primary focus:ring-primary" placeholder="Phone" />
                            </div>
                            <div>
                                <label htmlFor="subject" className="sr-only">I am a...</label>
                                <select id="subject" name="subject" value={formData.subject} onChange={handleChange} className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-primary focus:ring-primary bg-white">
                                    <option>Farmer Inquiry</option>
                                    <option>Investor Inquiry</option>
                                    <option>General Question</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="message" className="sr-only">Message</label>
                                <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} required className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-primary focus:ring-primary" placeholder="Message" />
                            </div>
                            <div>
                                <button type="submit" disabled={status === 'Sending...'} className="inline-flex justify-center rounded-md border border-transparent bg-primary py-3 px-6 text-base font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:bg-neutral">
                                    {status === 'Sending...' ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                             {status && status !== 'Sending...' && (
                                <p className={`text-lg mt-4 ${status.startsWith('Sorry') ? 'text-rose-600' : 'text-primary-dark'}`}>{status}</p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;