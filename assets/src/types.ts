export type Criterium = {
  name: string;
  description: string;
};

export type Pet = {
  name: string;
  pictureUrl: string;
  description: string;
};

export type Available = {
  criteria: boolean;
  pets: boolean;
};
