import { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export default class Book {
  public title: string;
  public author: string;
  public description: string;
  constructor(title: string, author: string, description: string) {
    this.title = title;
    this.author = author;
    this.description = description;
  }
}

export const bookConverter = {
  toFirestore: (book: Book): DocumentData => {
    return {
      title: book.title,
      author: book.author,
      description: book.description
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Book => {
    const data = snapshot.data(options)!;
    return new Book(data.title, data.author, data.description)
  }
}