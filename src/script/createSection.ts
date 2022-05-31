import {auth, store} from '../config/firebase';
import {addDoc, collection} from 'firebase/firestore';
import Section from './class/Section';
import readCsv from './readcsv';
import createQuiz from './createQuiz';
import Quiz from './class/Quiz';
import {isQuiz} from './class/Quiz';

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
    const sectionRef = await addDoc(collection(store, 'users', uid, 'books', bookId, 'sections'), {
      title: section.title,
      type: section.type,
      description: section.description,
    });
    const quizData = await readCsv(fileUri);
    for (const item of quizData) {
      if (isQuiz(item)) {
        createQuiz(bookId, sectionRef.id, new Quiz(item));
      }
    }
  } else {
    throw Error('ログインしていません。アプリケーションを再起動してログインしてください。');
  }
};

export default createSection;
