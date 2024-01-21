export {};

declare global {
  interface Country {
    slug: string;
    title: string;
  }

  interface Place {
    id: number;
    geo: [number, number];
    url: string;
    size: number;
    boost: boolean;
    title: string;
    country: string;
    slug: string;
    countrySlug: string;
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
}
