// Typed loader for the Bodhi workshops "coming soon" listing.
//
// The content lives in ./workshops.json — that is the file to edit to add,
// update, or remove a workshop card. This module only adds the TypeScript type.

import data from "./workshops.json";

export type Workshop = {
  slug: string;
  title: string;
  description: string;
  price: string;
  image: string;
  mode: string;
  language: string;
};

export const workshops: Workshop[] = data.workshops as Workshop[];
