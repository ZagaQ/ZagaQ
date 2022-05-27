export const sectionTypeObject = {
  'normal': '早押し問題',
  'paper': 'ペーパークイズ',
  'board': 'ボードクイズ',
  'speedBoard': '早押しボード',
  'other': 'その他',
};

type SectionType = keyof typeof sectionTypeObject
export default SectionType;
