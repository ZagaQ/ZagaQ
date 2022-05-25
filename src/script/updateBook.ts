import {auth, store} from '../config/firebase';
import {doc, updateDoc} from 'firebase/firestore';
import Book from './class/Book';

/**
 * 現在のユーザーの指定したIDの問題集データを上書きする
 * @param id 上書きする問題集データのID
 * @param book 上書きする問題集データ
 */
const updateBook = async (id: string, book: Book) => {
  if (typeof(auth.currentUser?.uid) == 'string') {
    const uid = auth.currentUser?.uid;
    await updateDoc(doc(store, 'users', uid, 'books', id), {
      title: book.title,
      author: book.author,
      description: book.description,
    });
  } else {
    throw Error('ログインしていません。アプリケーションを再起動してログインしてください。');
  }
};

export default updateBook;
