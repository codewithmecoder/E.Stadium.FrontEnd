import { Field } from '../fields/field.model';
import { StadiumMedia } from './stadiumMedias.model';

export interface StadiumInfo {
  id: string;
  userId: string;
  totalFields: number;
  name: string;
  description: string;
  lat: number;
  lon: number;
  createdAt: string;
  updatedAt: string;
  address: string;
  isActive: boolean;
  startTime: string;
  endTime: string;
  fields: Field[];
  stadiumMedias: StadiumMedia[];
}
