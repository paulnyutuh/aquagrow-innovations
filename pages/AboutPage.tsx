import React, { useState, useEffect } from 'react';
import { TeamMember } from '../types';
import { getGeneratedTeamMembers } from '../api/clientApi';

const TeamMemberCard: React.FC<{ member: Omit<TeamMember, 'id'> }> = ({ member }) => (
    <div className="text-center">
        <img className="mx-auto h-40 w-40 rounded-full object-cover" src={member.imageUrl} alt={member.name} />
        <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-neutral-dark">{member.name}</h3>
        <p className="text-sm leading-6 text-primary-dark">{member.role}</p>
        <p className="mt-2 text-sm text-neutral">{member.bio}</p>
    </div>
);

const AboutPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<Omit<TeamMember, 'id'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getGeneratedTeamMembers();
        setTeamMembers(data);
      } catch (error) {
        console.error("Failed to fetch team members:", error);
        setError("We couldn't load our team information at the moment. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  return (
    <div className="bg-white">
      {/* Our Story Section */}
      <div className="relative isolate overflow-hidden py-24 sm:py-32">
        <img
          src="https://picsum.photos/2432/1442?image=1074"
          alt="Lush green farm"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        />
        <div className="absolute inset-0 bg-neutral-dark/70" aria-hidden="true" />
        <div className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl" aria-hidden="true">
            <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#10B981] to-[#0EA5E9] opacity-20" style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Our Story</h2>
            <p className="mt-6 text-lg leading-8 text-gray-200">
                AquaGrow Innovations was born from a simple yet powerful idea: that every farmer, regardless of their financial status, deserves access to the tools that can transform their land and livelihood. We saw the immense potential in the semi-arid regions of Kenya, a potential held back only by water scarcity and lack of capital. Our vision is to unlock this potential, creating a network of prosperous, climate-resilient farms that nourish communities and build a sustainable future.
            </p>
          </div>
        </div>
      </div>
      
      {/* Mission & Values Section */}
      <section className="mx-auto mt-16 max-w-7xl px-6 sm:mt-24 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-dark sm:text-4xl">Our Mission & Values</h2>
            <p className="mt-4 text-lg leading-8 text-neutral">
              We are committed to empowering farmers through a partnership built on trust, innovation, and shared success.
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-neutral lg:grid-cols-3">
            <div className="text-center p-6 bg-neutral-light rounded-lg">
              <dt className="font-semibold text-neutral-dark text-lg">Empowerment</dt>
              <dd className="mt-1">We provide tools, knowledge, and market access, empowering farmers to become successful entrepreneurs.</dd>
            </div>
            <div className="text-center p-6 bg-neutral-light rounded-lg">
              <dt className="font-semibold text-neutral-dark text-lg">Sustainability</dt>
              <dd className="mt-1">Our methods promote water conservation, soil health, and long-term ecological balance.</dd>
            </div>
            <div className="text-center p-6 bg-neutral-light rounded-lg">
              <dt className="font-semibold text-neutral-dark text-lg">Partnership</dt>
              <dd className="mt-1">We operate on a profit-sharing model. We don't succeed unless our farmers succeed. It's that simple.</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Unique Approach Section */}
       <section className="bg-primary-dark my-24 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-secondary-light">Our Model</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">A Different Kind of Partnership</p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              We've moved beyond charity to create a self-sustaining business model. By investing directly in farms and sharing the profits, we create a powerful cycle of growth and prosperity that benefits everyone involved. It's not a handout; it's a hand-up.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-dark sm:text-4xl">Meet Our Team</h2>
            <p className="mt-4 text-lg leading-8 text-neutral">
              A passionate group of experts dedicated to revolutionizing agriculture in Kenya.
            </p>
          </div>
          <div className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {loading ? (
              <p className="col-span-full text-neutral">Loading team...</p>
            ) : error ? (
                <p className="col-span-full text-red-600 bg-red-50 p-4 rounded-md">{error}</p>
            ) : (
              teamMembers.map((member) => (
                <TeamMemberCard key={member.name} member={member} />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;