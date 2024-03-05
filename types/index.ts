export {};

declare global {
  interface Country {
    id?: string;
    colors: string[];
    slug: string;
    title: string;
  }

  interface Place {
    id: string;
    geo: [number, number];
    url: string;
    size: number;
    boost: boolean;
    title: string;
    country: string;
    slug: string;
    countryId: string;
  }

  interface Channel {
    stream: string;
    title: string;
    type: string;
    url: string;
    slug: string;
    id: string;
    src: string;
    subtitle?: string;
  }

  interface FavoriteChannel {
    id: string;
    url: string;
    title: string;
    countryId: string;
  }

  interface Theme {
    title:
      | "Steel Blue"
      | "Orange Red"
      | "Flag Palette"
      | "Deep Purple"
      | "Lush Lime"
      | "Sunlit Gold";
    value:
      | "steelblue"
      | "orangered"
      | "flag"
      | "deeppurple"
      | "sunlit"
      | "lime";
    gradient: string;
  }

  interface SearchPayload {
    channels: Channel[];
    countries: Country[];
    places: Place[];
  }

  interface AccordionContent {
    label: string;
    icon: string;
    slot: string;
    active: boolean;
  }
}
