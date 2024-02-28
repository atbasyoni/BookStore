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
  authorId: number;
  genreId: number;
  genre?: string;
  author?: string;
  //rating?: string;
}