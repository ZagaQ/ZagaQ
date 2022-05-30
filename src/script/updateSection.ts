import {auth, store} from '../config/firebase';
import {doc, updateDoc} from 'firebase/firestore';
import Section from './class/Section';

/**
 * 現在のユーザーの指定したIDの問題集データを上書きする
 * @param bookId 上書きするセクションが存在する問題集のID
 * @param sectionId 上書きするセクションのID
 * @param section 上書きするセクションデータ
 */
const updateSection = async (bookId: string, sectionId: string, section: Section) => {
  if (typeof(auth.currentUser?.uid) == 'string') {
    const uid = auth.currentUser?.uid;
    await updateDoc(doc(store, 'users', uid, 'books', bookId, 'sections', sectionId), {
      title: section.title,
      type: section.type,
      description: section.description,
    });
  } else {
    throw Error('ログインしていません。アプリケーションを再起動してログインしてください。');
  }
};

export default updateSection;
