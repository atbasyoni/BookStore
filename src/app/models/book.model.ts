import { Author } from "./author.model";
import { Genre } from "./genre.model";

export interface Book
{
  id: string;
  title: string;
  isbn?: string;
  description: string;
  pages?: number;
  language?: string;
  image?: string;
  price: number;
  publicationDate?: number;
  quantity: number;
  genre?: Genre;
  author?: Author;
  //rating?: string;
}