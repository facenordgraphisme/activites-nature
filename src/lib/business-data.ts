export const business = {
  name: "Activités Nature",
  legalCity: "Baratier",
  address: {
    line1: "Z.A. Les Portes du Lac",
    postalCode: "05200",
    city: "Baratier",
    country: "France",
  },
  phones: [
    { label: "Patrick", number: "+33 7 66 01 05 09" },
    { label: "Xavier", number: "+33 6 83 56 42 84" },
  ],
  email: "activites.nature@gmail.com",
  facebook: "https://www.facebook.com/natureactivites",
  // Baratier, Hautes-Alpes — approximate coordinates for the map embed.
  coordinates: { lat: 44.5486, lng: 6.4938 },
  season: { start: "04-01", end: "10-02" },
} as const;

export const guides = [
  {
    key: "patrick",
    name: "Patrick",
  },
  {
    key: "xavier",
    name: "Xavier",
  },
] as const;
