import Format from "./Format";
import Genre from "./Genre";
import Language from "./Languages";

export interface Movie {
  theatre: any;
  id: number;
  name: string;
  poster_url: string;
  desc: string;
  rating: number;
  release_date: string;
  duration: number;
  languages: Language[];
  genres: Genre[];
  cast: string;
  formats: Format[];
}
