import SectionType from '../type/SectionType';
import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

/**
 * 問題集内の1セクションを表すクラス
 */
export default class Section {
  public title: string;
  public type: SectionType;
  public description: string;
  /**
   * 問題集を表すクラスを作成します
   * @param title セクション名
   * @param type セクションの分類
   * @param description 問題集の説明文
   */
  constructor(title: string, type: SectionType, description: string) {
    this.title = title;
    this.type = type;
    this.description = description;
  }
}

export const sectionConverter = {
  toFirestore: (section: Section): DocumentData => {
    return {
      title: section.title,
      type: section.type,
      description: section.description,
    };
  },
  fromFirestore: (
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions,
  ): Section => {
    const data = snapshot.data(options);
    return new Section(data.title, data.type, data.description);
  },
};
