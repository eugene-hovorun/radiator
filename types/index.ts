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

  interface PlacesResponse {
    data: {
      list: Place[];
    };
  }

  interface Channel {
    stream: string;
    title: string;
    type: string;
    url: string;
    slug: string;
    id: string;
    src: string;
  }

  interface FavoriteChannel {
    id: string;
    url: string;
    title: string;
    countryId: string;
  }

  interface Theme {
    title: "Steel Blue" | "Orange Red" | "Flag palette";
    value: "steelblue" | "orangered" | "flag";
    gradient: string;
  }
}
