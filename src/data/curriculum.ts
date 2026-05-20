import type { Chapter } from './types';
import { mechanics } from './chapters/mechanics';
import { thermodynamics } from './chapters/thermodynamics';
import { currentElectricity } from './chapters/currentElectricity';
import { optics } from './chapters/optics';

export const chapters: Chapter[] = [mechanics, thermodynamics, currentElectricity, optics];
