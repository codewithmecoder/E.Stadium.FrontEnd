import { FieldMedias } from './fieldMedias.model';

export interface Field {
  id: string;
  stadiumId: string;
  numberOfPoeple: number;
  size: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  fieldMedias: FieldMedias[] | undefined;
}
