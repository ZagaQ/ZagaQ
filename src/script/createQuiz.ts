import {auth, store} from '../config/firebase';
import {addDoc, collection} from 'firebase/firestore';
import Quiz from './class/Quiz';

/**
 * 現在のユーザーの指定セクション内にクイズを作成する
 * @param bookId クイズを作成する問題集のID
 * @param sectionId クイズを作成するセクションのID
 * @param quiz 作成するクイズのデータ
 */
const createQuiz = async (
    bookId: string, sectionId: string, quiz: Quiz,
) => {
  if (typeof(auth.currentUser?.uid) == 'string') {
    const uid = auth.currentUser?.uid;
    await addDoc(collection(store, 'users', uid, 'books', bookId, 'sections', sectionId, 'quiz'), {
      number: quiz.number,
      question: quiz.question,
      answer: quiz.answer,
      anotherAnswer: quiz.anotherAnswer,
      remarks: quiz.remarks,
    });
  } else {
    throw Error('ログインしていません。アプリケーションを再起動してログインしてください。');
  }
};

/**
 * そのobjectがQuizとして登録可能かを判定する
 * @param object Quizにすることが可能かを判定したいobject
 */
export function isQuiz(object: {[key: string]: string}) {
  return object['question'] && object['answer'] && object['number'];
}

export default createQuiz;
