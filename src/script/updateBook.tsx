import {auth, store} from '../config/firebase';
import {doc, updateDoc} from 'firebase/firestore';
import Book from './class/Book';

const createBook = async (id: string, book: Book) => {
  if (typeof(auth.currentUser?.uid) == 'string') {
    const uid = auth.currentUser?.uid;
    updateDoc(doc(store, 'users', uid, 'books', id), {
      title: book.title,
      author: book.author,
      description: book.description,
    });
  } else {
    throw Error('ログインしていません。アプリケーションを再起動してログインしてください。');
  }
};

export default createBook;
