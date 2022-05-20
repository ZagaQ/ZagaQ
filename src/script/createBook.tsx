import {auth, store} from '../config/firebase';
import {addDoc, collection} from 'firebase/firestore';
import Book from './class/Book';

const createBook = async (book: Book) => {
  if (typeof(auth.currentUser?.uid) == 'string') {
    const uid = auth.currentUser?.uid;
    addDoc(collection(store, 'users', uid, 'books'), {
      title: book.title,
      author: book.author,
      description: book.description,
    });
  } else {
    throw Error('ログインしていません。アプリケーションを再起動してログインしてください。');
  }
};

export default createBook;
