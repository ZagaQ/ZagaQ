import {auth, store} from '../config/firebase';
import {deleteDoc, doc} from 'firebase/firestore';

const deleteBook = async (id: string) => {
  if (typeof(auth.currentUser?.uid) == 'string') {
    const uid = auth.currentUser?.uid;
    await deleteDoc(doc(store, 'users', uid, 'books', id));
  } else {
    throw Error('ログインしていません。アプリケーションを再起動してログインしてください。');
  }
};

export default deleteBook;
