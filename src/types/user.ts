export interface Identity {
  id: string;
  identity_key: string;
  first_name: string;
  last_name: string;
  sexe: "male" | "female";
  birth_date: string;
  birth_place: string;
  address: string;
  profession: string;
  distinctive_trait: string;
  status: "pending";
  father: null | Identity;
  mother: null | Identity;
}
