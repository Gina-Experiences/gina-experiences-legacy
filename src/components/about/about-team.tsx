import {
    AboutTeamCard1,
    AboutTeamCard2,
} from '@/components/about/about-team-card';
import { teamData } from '@/data';

export default function AboutTeam() {
    return (
        <div className="w-full max-w-screen-2xl flex flex-col items-center justify-center py-40 space-y-12">
            <div className="w-svw flex flex-col items-center justify-center px-8 sm:px-24 pb-12">
                <div className="w-full xl:w-4/6 max-w-screen-2xl grid grid-cols-1 md:grid-cols-2 gap-8 ">
                    <div className="flex flex-col space-y-4">
                        <span
                            className="text-5xl font-bold bg-clip-text text-transparent pb-4"
                            style={{
                                backgroundImage:
                                    'linear-gradient(to right, #FFD100, #00A04B, #1B1464, #F6931D)',
                            }}
                        >
                            Meet The Gina Team!
                        </span>
                        <span className="text-justify">
                            Get to know the talented team behind Gina
                            Experiences! Driven by passion and innovation, our
                            team is dedicated to crafting unforgettable travel
                            experiences tailored just for you.{' '}
                            <b>
                                Meet the people who bring Gina to life, each
                                bringing unique expertise and a shared
                                commitment to making every journey
                                extraordinary.
                            </b>
                        </span>
                        <span className="text-justify">
                            Our team is made up of industry experts, creative
                            thinkers, and passionate travelers who believe in
                            the power of exploration and connection. From
                            designing immersive experiences to ensuring
                            exceptional service, we work together to transform
                            your travel dreams into reality.{' '}
                            <b>
                                Get to know the faces behind Gina and see how
                                our collective vision shapes every adventure we
                                create.
                            </b>
                        </span>
                    </div>
                    <div className="bg-[url('/images/about/hero-mission.jpg')] bg-cover bg-center w-full h-full min-h-96 rounded-3xl"></div>
                </div>
            </div>

            {teamData.map((team, index) => (
                <div key={index}>
                    <div className="w-full flex flex-col items-center justify-center space-y-12 md:hidden">
                        <AboutTeamCard1 team={team} />
                    </div>

                    <div className="w-full hidden md:flex flex-col items-center justify-center space-y-12">
                        {index % 2 === 0 ? (
                            <AboutTeamCard1 team={team} />
                        ) : (
                            <AboutTeamCard2 team={team} />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
