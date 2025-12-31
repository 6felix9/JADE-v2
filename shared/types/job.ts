import { FACTOR_KEYS } from '../constants/factor_keys';

export type FactorKey = typeof FACTOR_KEYS[keyof typeof FACTOR_KEYS];

export interface Job {
    id: string;
    title: string;
    description: string;
    orgId: string;
    createdAt: string;
}

export interface FactorScore {
    factor: FactorKey;
    score: number;
    confidence: number;
    reasoning: string;
    citations: string[];
}
