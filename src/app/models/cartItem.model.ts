import { Author } from "./author.model";
import { Genre } from "./genre.model";

export interface CartItem {
  id: number; // Unique identifier for the product
  title: string; // Product title
  author?: Author; // Optional author name
  genre?: Genre;
  price: number; // Product price
  quantity: number; // Quantity of this item in the cart
  image?: string; // Optional image URL for the product
}