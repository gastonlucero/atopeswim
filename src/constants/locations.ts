export interface Location {
  id: string;
  name: string;
  infoLink: string;
  surfForecastUrl: string;
  imageUrl: string;
}

export const LOCATIONS: Location[] = [
  {
    id: 'barceloneta',
    name: 'Espai de Mar, Barceloneta',
    infoLink: 'https://www.barcelona.cat/ca/que-pots-fer-a-bcn/banys-i-platges/platja-de-la-barceloneta',
    surfForecastUrl: 'https://wisuki.com/widget-details?spot=2617&lang=es&spotinfo=1',
    imageUrl: 'https://espaidemar.cat/wp-content/uploads/2024/01/IMG_4310.jpg',
  },
  {
    id: 'bogatell',
    name: 'Bogatell, Barcelona',
    infoLink: 'https://www.barcelona.cat/ca/que-pots-fer-a-bcn/banys-i-platges/platja-de-bogatell',
    surfForecastUrl: 'https://wisuki.com/widget-details?spot=8623&lang=es&spotinfo=1',
    imageUrl: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAF-zl5jfiY5GCpQb8SZfGNgQuXvyGK1QZ99kIaX9JheSZdD4yKz-xeupOUwsunA9dTJ38r9mKM3R8OA3aPC2cZUXidzQj6ZSZNs2kqgPYSNoQm1ldvsB-ZxPx4dpOWbM3YnxpCX=w203-h114-k-no',
  },
];
