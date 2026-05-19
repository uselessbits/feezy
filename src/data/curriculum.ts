import type { Chapter } from './types';
import { mechanics } from './chapters/mechanics';
import { thermodynamics } from './chapters/thermodynamics';
import { currentElectricity } from './chapters/currentElectricity';

export const chapters: Chapter[] = [mechanics, thermodynamics, currentElectricity];
