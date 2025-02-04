export interface Service {
    id: number;
    type: string;
    title: string;
    location: string;
    island: string;
    price: string;
    highlights: string;
    image: string;
    get?: string[];
    expect?: string[];
    duration?: string;
    bestTime?: string[];
    faq?: FAQ[];
}

export type FAQ = {
    question: string;
    answer: string;
};
