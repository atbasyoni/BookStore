import { Book } from "./book.model";

export interface Review {
  id: number,
  content: string,
  rating: number,
  book: Book,
}