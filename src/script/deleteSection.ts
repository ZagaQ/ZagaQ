import {auth, store} from '../config/firebase';
import {deleteDoc, doc} from 'firebase/firestore';

/**
 * 指定したIDの問題集内の指定したIDのセクションを現在のユーザーから削除する
 * @param bookId 削除するセクションのある問題集のID
 * @param sectionId 削除するセクションのID
 */
const deleteSection = async (bookId: string, sectionId: string) => {
  if (typeof(auth.currentUser?.uid) == 'string') {
    const uid = auth.currentUser?.uid;
    await deleteDoc(doc(store, 'users', uid, 'books', bookId, 'sections', sectionId));
  } else {
    throw Error('ログインしていません。アプリケーションを再起動してログインしてください。');
  }
};

export default deleteSection;
