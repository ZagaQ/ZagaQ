import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

/**
 * 問題集のデータを表すクラス
 */
export default class Book {
  public title: string;
  public author: string;
  public description: string;
  /**
   * 問題集を表すクラスを作成します
   * @param title 問題集のタイトル
   * @param author 問題集の発行者
   * @param description 問題集の説明文
   */
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
      description: book.description,
    };
  },
  fromFirestore: (
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions,
  ): Book => {
    const data = snapshot.data(options);
    return new Book(data.title, data.author, data.description);
  },
};
