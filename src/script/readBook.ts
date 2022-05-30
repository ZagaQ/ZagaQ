import {auth, store} from '../config/firebase';
import {collection, getDocs} from 'firebase/firestore';
import Book, {bookConverter} from './class/Book';
import Section from './class/Section';
import {sectionConverter} from './class/Section';

export type ReadBookReturn = {
  [id: string]: {
    'book': Book,
    'sections': {
      [id: string]: Section
    }
  }
}

/**
 *現在のユーザーのすべての所持問題集の情報をObjectとして取得する
 */
const readBook = async () => {
  if (typeof(auth.currentUser?.uid) == 'string') {
    const ret: ReadBookReturn = {};
    const uid = auth.currentUser?.uid;
    const bookQuerySnapShot = await getDocs(collection(store, 'users', uid, 'books').withConverter(bookConverter));
    bookQuerySnapShot.forEach((doc) => {
      ret[doc.id] = {
        'book': doc.data(),
        'sections': {},
      };
    });
    for (const key in ret) {
      if (key) {
        const sectionQuerySnapShot = await getDocs(
            collection(store, 'users', uid, 'books', key, 'sections').withConverter(sectionConverter),
        );
        sectionQuerySnapShot.forEach((doc) => {
          ret[key].sections[doc.id] = doc.data();
          console.log(doc.id);
        });
      }
    }
    console.log(ret);
    return ret;
  } else {
    throw Error('ログインしていません。アプリケーションを再起動してログインしてください。');
  }
};

export default readBook;
