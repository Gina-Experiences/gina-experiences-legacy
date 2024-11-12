'use client';

import Image from 'next/image';
import { Team } from '@/types/team';

interface TeamCardProps {
    team: Team;
}

export function AboutTeamCard1({ team }: TeamCardProps) {
    return (
        <div className="w-svw flex justify-center px-8 sm:px-24">
            <div className="w-full xl:w-4/6 max-w-screen-2xl grid grid-cols-1 md:grid-cols-2 p-8 gap-8 bg-ginaWhite shadow-xl rounded-3xl">
                <div className="flex flex-col space-y-1 items-center text-center justify-center">
                    <span
                        className="text-4xl font-bold bg-clip-text text-transparent"
                        style={{
                            backgroundImage:
                                'linear-gradient(to right, #FFD100, #00A04B, #1B1464, #F6931D)',
                        }}
                    >
                        {team.name}
                    </span>
                    <span className="font-medium text-2xl pb-4">
                        {team.title}
                    </span>
                </div>
                <div>
                    <Image
                        src={team.image}
                        alt={team.name}
                        quality={100}
                        width={600}
                        height={600}
                        className="rounded-3xl w-full h-[400px] md:h-[500px] object-cover object-center"
                    />
                </div>
            </div>
        </div>
    );
}

export function AboutTeamCard2({ team }: TeamCardProps) {
    return (
        <div className="w-svw flex flex-col items-center justify-center px-8 sm:px-24">
            <div className="w-full xl:w-4/6 max-w-screen-2xl grid grid-cols-1 md:grid-cols-2 p-8 gap-8 bg-ginaWhite shadow-xl rounded-3xl">
                <div>
                    <Image
                        src={team.image}
                        alt={team.name}
                        quality={100}
                        width={600}
                        height={600}
                        className="rounded-3xl w-full h-[400px] md:h-[500px] object-cover object-center"
                    />
                </div>
                <div className="flex flex-col space-y-1 items-center text-center justify-center">
                    <span
                        className="text-4xl font-bold bg-clip-text text-transparent"
                        style={{
                            backgroundImage:
                                'linear-gradient(to right, #FFD100, #00A04B, #1B1464, #F6931D)',
                        }}
                    >
                        {team.name}
                    </span>
                    <span className="font-medium text-2xl pb-4">
                        {team.title}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default { AboutTeamCard1, AboutTeamCard2 };
