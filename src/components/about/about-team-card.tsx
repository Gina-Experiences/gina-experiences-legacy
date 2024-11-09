'use client';

import Image from 'next/image';
import { Team } from '@/types/team';

interface TeamCardProps {
    team: Team;
}

export function AboutTeamCard1({ team }: TeamCardProps) {
    return (
        <div className=" xl:w-4/6 grid grid-cols-1 md:grid-cols-2 mx-12 lg:mx-24 p-8 gap-8 bg-ginaWhite shadow-xl rounded-3xl">
            <div className="flex flex-col space-y-1 justify-center">
                <span
                    className="text-4xl font-bold bg-clip-text text-transparent"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, #FFD100, #00A04B, #1B1464, #F6931D)',
                    }}
                >
                    {team.name}
                </span>
                <span className="font-medium text-2xl pb-4">{team.title}</span>
                <span className="text-justify">{team.description}</span>
            </div>
            <div
                className="bg-cover bg-center w-full h-full min-h-96 rounded-3xl"
                style={{
                    backgroundImage: `url(${team.image})`,
                }}
            ></div>
        </div>
    );
}

export function AboutTeamCard2({ team }: TeamCardProps) {
    return (
        <div className=" xl:w-4/6 grid grid-cols-1 md:grid-cols-2 mx-12 lg:mx-24 p-8 gap-12 bg-ginaWhite shadow-xl rounded-3xl">
            <div
                className="bg-cover bg-center w-full h-full min-h-96 rounded-3xl"
                style={{
                    backgroundImage: `url(${team.image})`,
                }}
            ></div>
            <div className="flex flex-col space-y-1 justify-center">
                <span
                    className="text-4xl font-bold bg-clip-text text-transparent"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, #FFD100, #00A04B, #1B1464, #F6931D)',
                    }}
                >
                    {team.name}
                </span>
                <span className="font-medium text-2xl pb-4">{team.title}</span>
                <span className="text-justify">{team.description}</span>
            </div>
        </div>
    );
}

export default { AboutTeamCard1, AboutTeamCard2 };
