import { Book } from "./book.model";

export interface Genre {
  id: number,
  name: string,
  books: Book[]
}