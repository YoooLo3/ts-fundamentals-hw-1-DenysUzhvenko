import { Book } from "./book";
import type { BookId } from "./types";

export class Library {
  private items: Map<BookId, Book>;

  constructor() {
    this.items = new Map<BookId, Book>();
  }

  add(item: Book): void {
    if (this.items.has(item.id)) {
      throw new Error("Item already exists");
    }
    this.items.set(item.id, item);
  }

  remove(id: BookId): void {
    const book = this.getBookOrThrow(id);
    if (book.getStatus() === "borrowed") {
      throw new Error("Cannot remove borrowed item");
    }
    this.items.delete(id);
  }

  listAll(): Book[] {
    return Array.from(this.items.values());
  }

  listAvailable(): Book[] {
    return Array.from(this.items.values()).filter(
      (book) => book.getStatus() === "available"
    );
  }

  borrow(bookId: BookId, personName: string): void {
    const book = this.getBookOrThrow(bookId);
    book.markBorrowed(personName);
  }

  return(bookId: BookId): void {
    const book = this.getBookOrThrow(bookId);
    book.markReturned();
  }

  private getBookOrThrow(id: BookId): Book {
    const book = this.items.get(id);
    if (!book) {
      throw new Error("Book not found");
    }
    return book;
  }
}
