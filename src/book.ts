import type { BookId, Genre, LoanStatus } from "./types";

export interface BookOptions {
  id: BookId;
  title: string;
  author: string;
  year: number;
  genre: Genre;
}

export function makeBook(opts: Partial<BookOptions> = {}): Book {
  return new Book({
    id: opts.id || `id-${Math.random().toString(36).slice(2)}`,
    title: opts.title || "Untitled",
    author: opts.author || "Unknown",
    year: opts.year || new Date().getFullYear(),
    genre: opts.genre || "fiction",
  });
}

export class Book {
  public readonly id: BookId;
  public readonly title: string;
  public readonly author: string;
  public readonly year: number;
  public readonly genre: Genre;

  private status: LoanStatus;
  private borrowedBy: string | null;

  constructor(opts: BookOptions) {
    this.id = opts.id;
    this.title = opts.title;
    this.author = opts.author;
    this.year = opts.year;
    this.genre = opts.genre;
    this.status = "available";
    this.borrowedBy = null;
  }

  getStatus(): LoanStatus {
    return this.status;
  }

  markBorrowed(personName: string): void {
    if (this.status === "borrowed") {
      throw new Error(`Already borrowed by ${this.borrowedBy}`);
    }
    this.status = "borrowed";
    this.borrowedBy = personName;
  }

  markReturned(): void {
    if (this.status === "available") {
      throw new Error("Already available");
    }
    this.status = "available";
    this.borrowedBy = null;
  }

  getInfo(): string {
    const base = `${this.title} — ${this.author} (${this.year}), ${this.genre}`;
    if (this.status === "available") {
      return `${base} [Available]`;
    } else {
      return `${base} [Borrowed by ${this.borrowedBy}]`;
    }
  }
}
