import { DepartementVO } from './Departement';

export interface PersonneVO {
  id?: number | undefined;
  nom: string | undefined;
  prenom: string | undefined;
  age: number | undefined;
  departementVO: DepartementVO | undefined;
}
