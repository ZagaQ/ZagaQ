import { auth, store } from '../config/firebase';
import { addDoc, collection } from 'firebase/firestore';

const createBook = async (title: string, author: string, description: string) => {
  try {
    if(typeof(auth.currentUser?.uid) == "string") {
      const uid = auth.currentUser?.uid;
      addDoc(collection(store, "users", uid, "books"), {
        title: title,
        author: author,
        description: description,
      });
    } else {
      throw Error("ログインしていません。アプリケーションを再起動してログインしてください。");
    }
  } catch(e) {
    throw e;
  }
}

export default createBook;
