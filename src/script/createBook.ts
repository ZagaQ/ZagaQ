import {auth, store} from '../config/firebase';
import {addDoc, collection} from 'firebase/firestore';
import Book from './class/Book';

/**
 * 現在のユーザーの所持問題集を追加する
 * @param book 追加する問題集のデータ
 */
const createBook = async (book: Book) => {
  if (typeof(auth.currentUser?.uid) == 'string') {
    const uid = auth.currentUser?.uid;
    await addDoc(collection(store, 'users', uid, 'books'), {
      title: book.title,
      author: book.author,
      description: book.description,
    });
  } else {
    throw Error('ログインしていません。アプリケーションを再起動してログインしてください。');
  }
};

export default createBook;
