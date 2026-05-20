export interface Country {
  name: {
    common: string;
    official: string;
  };
  capital?: string[];
  population: number;
  currencies?: Record<string, { name: string; symbol?: string }>;
  languages?: Record<string, string>;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  region: string;
}
