
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon, ArrowRightIcon } from '../components/icons';

const benefits = [
  { title: "Higher Yields", description: "Drip irrigation uses water more efficiently, leading to healthier crops and larger harvests." },
  { title: "Consistent Income", description: "We provide access to stable markets, ensuring you get a fair price for your produce." },
  { title: "No Upfront Cost", description: "AquaGrow covers the full cost of the drip irrigation system and installation." },
  { title: "Expert Support", description: "Receive ongoing training and agronomic support from our experienced team." },
];

const ImpactMetric = ({ value, label }: { value: string, label: string }) => (
  <div className="text-center">
    <p className="text-4xl md:text-5xl font-extrabold text-primary-dark">{value}</p>
    <p className="mt-1 text-lg text-neutral-dark">{label}</p>
  </div>
);

const TestimonialCard = ({ quote, name, location, image }: { quote: string, name: string, location: string, image: string }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center">
        <img src={image} alt={name} className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-primary-light" />
        <p className="text-neutral-dark italic mb-4">"{quote}"</p>
        <div className="font-bold text-primary-dark">{name}</div>
        <div className="text-sm text-neutral">{location}</div>
    </div>
);

const HomePage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-neutral-light pt-20 pb-24 md:pt-32 md:pb-36">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: "url('https://picsum.photos/1600/900?image=1028')"}}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-neutral-dark tracking-tight">
            Unlock Your Farm's Potential with <span className="text-primary-dark">Drip Irrigation</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-neutral">
            Join AquaGrow's Farm-to-Prosperity Program. We provide the technology, you provide the passion. No upfront capital needed.
          </p>
          <div className="mt-10">
            <Link
              to="/farmers"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-full text-white bg-accent hover:bg-accent-dark shadow-lg transform hover:scale-105 transition-transform"
            >
              Join Our Program Today
              <ArrowRightIcon className="ml-3 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-neutral-dark">Your Partner in Prosperity</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral">
              We succeed when you succeed. Our profit-sharing model is built on mutual trust and shared goals.
            </p>
          </div>
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto">
                  <CheckCircleIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-neutral-dark">{benefit.title}</h3>
                <p className="mt-2 text-base text-neutral">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Impact Metrics Section */}
      <section className="bg-neutral-light py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-neutral-dark">Our Growing Impact</h2>
                <p className="mt-4 text-lg text-neutral">Projected impact based on our proven model. Join us to make these numbers a reality.</p>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ImpactMetric value="+200%" label="Farmer Income Increase" />
            <ImpactMetric value="70%" label="Water Saved per Acre" />
            <ImpactMetric value="5,000+" label="Families Empowered" />
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-neutral-dark">From Our Farmers</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral">Don't just take our word for it. Hear from farmers who are part of the AquaGrow family.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <TestimonialCard 
                    quote="AquaGrow didn't just give me an irrigation system; they gave me hope. My yields have doubled, and I can finally send all my children to school."
                    name="Joseph Mutisya"
                    location="Makueni County"
                    image="https://picsum.photos/200/200?image=1005"
                 />
                 <TestimonialCard 
                    quote="The training and support are invaluable. I feel like a modern farmer now, confident in my ability to provide for my family year-round, not just during the rainy season."
                    name="Esther Nthenya"
                    location="Machakos County"
                    image="https://picsum.photos/200/200?image=1027"
                 />
            </div>
        </div>
      </section>

       {/* CTA Section */}
       <section className="bg-primary-dark">
        <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to transform your farm?</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-primary-light">
            Let's grow together. Learn more about our program and how you can apply.
          </p>
          <Link
            to="/farmers"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-dark bg-white hover:bg-neutral-light sm:w-auto"
          >
            Learn More for Farmers
          </Link>
           <Link
            to="/partners"
            className="mt-8 ml-4 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent hover:bg-accent-dark sm:w-auto"
          >
            Partner With Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
