import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

/**
 * クイズ1問1問を表すクラス
 */
export default class Quiz {
  public number: number;
  public question: string;
  public answer: string;
  public anotherAnswer: string;
  public remarks: string;
  /**
   * 問題集を表すクラスを作成します
   * @param number 問題番号
   * @param question 問題文
   * @param answer 想定解
   * @param anotherAnswer 別解・正誤判定基準
   * @param remarks 備考
   */
  constructor(
      number: number,
      question: string,
      answer: string,
      anotherAnswer: string,
      remarks: string,
  )
  /**
   * 問題集を表すクラスを作成します
   * @param object 必要なデータが格納されたobject
   */
  constructor(object: {[key: string]: string})
  // eslint-disable-next-line require-jsdoc
  constructor(a: any, b?: string, c?: string, d?: string, e?: string) {
    if (typeof a == 'number') {
      this.number = a;
      this.question = b ?? '';
      this.answer = c ?? '';
      this.anotherAnswer = d ?? '';
      this.remarks = e ?? '';
    } else {
      this.number = parseInt(a['number']);
      this.question = a['question'];
      this.answer = a['answer'];
      this.anotherAnswer = a['anotherAnswer'] ?? '';
      this.remarks = a['remarks'] ?? '';
    }
  }
}

export const quizConverter = {
  toFirestore: (quiz: Quiz): DocumentData => {
    return {
      number: quiz.number,
      question: quiz.question,
      answer: quiz.answer,
      anotherAnswer: quiz.anotherAnswer,
      remarks: quiz.remarks,
    };
  },
  fromFirestore: (
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions,
  ): Quiz => {
    const data = snapshot.data(options);
    return new Quiz(data.number, data.question, data.answer, data.anotherAnswer, data.remarks);
  },
};

/**
 * そのobjectがQuizとして登録可能かを判定する
 * @param object Quizにすることが可能かを判定したいobject
 */
export function isQuiz(object: {[key: string]: string}) {
  return object['question'] && object['answer'] && object['number'];
}
