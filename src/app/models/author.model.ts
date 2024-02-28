import { Book } from "./book.model";

export interface Author {
  id: number,
  name: string,
  bio: string,
  books: Book[]
}