import {auth, store} from '../config/firebase';
import {addDoc, collection} from 'firebase/firestore';
import Section from './class/Section';

/**
 * 現在のユーザーの問題集内にセクションを作成する
 * @param bookId セクションを作成するBookのid
 * @param section 作成するセクションのデータ
 * @param fileUri 問題データが格納されたCSVファイルのURI
 */
const createSection = async (
    bookId: string, section: Section, fileUri: string,
) => {
  if (typeof(auth.currentUser?.uid) == 'string') {
    const uid = auth.currentUser?.uid;
    console.log(fileUri); // TODO: 消す
    await addDoc(collection(store, 'users', uid, 'books', bookId, 'sections'), {
      title: section.title,
      type: section.type,
      description: section.description,
    });
  } else {
    throw Error('ログインしていません。アプリケーションを再起動してログインしてください。');
  }
};

export default createSection;
