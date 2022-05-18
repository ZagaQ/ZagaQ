import { auth, store } from '../config/firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import Book, { bookConverter } from './class/Book';

/**
 *現在のユーザーのすべてのbookの情報を配列として取得する
 */
const readBook = async () => {
  if(typeof(auth.currentUser?.uid) == "string") {
    const ret: {[id: string]: Book} = {}
    const uid = auth.currentUser?.uid;
    const querySnapShot = await getDocs(collection(store, "users", uid, "books").withConverter(bookConverter));
    querySnapShot.forEach((doc) => {
      ret[doc.id] = doc.data();
    });
    return ret;
  } else {
    throw Error("ログインしていません。アプリケーションを再起動してログインしてください。");
  }
}

export default readBook;
