export type Experience = {
    id: number;
    title: string;
    location: string;
    island: string;
    price: string;
    highlights: string;
    image: string;
    get?: string[] | null;
    expect: string[];
    duration: string;
    bestTime: string[];
};

export type FAQ = {
    question: string;
    answer: string;
};
