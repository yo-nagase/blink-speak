
export type Question = {
  id: string,
  contents: string,
  level: number,
  category: string[],
  correctCount: number,
  wrongCount: number,
  hash?: string
}
// 問題はDBから取得できる様にあらかじめ用意しておく。
export const questionList: Question[] = [{
  'id': '1',
  'contents': 'これはあなたのペンですか？',
  'level': 600,
  'category': ['プログラミング', 'IT'],
  'correctCount': 30,
  'wrongCount': 31
},
{
  'id': '2',
  'contents': '私は東京に住んでいます。',
  'level': 600,
  'category': ['プログラミング', 'IT'],
  'correctCount': 99,
  'wrongCount': 0
},
{
  'id': '3',
  'contents': '今日目覚ましを8時にセットしました',
  'level': 600,
  'category': ['プログラミング', 'IT'],
  'correctCount': 13,
  'wrongCount': 70
},
{
  'id': '4',
  'contents': '私は、名古屋出身です',
  'level': 600,
  'category': ['プログラミング', 'IT'],
  'correctCount': 88,
  'wrongCount': 95
},
{
  'id': '5',
  'contents': '今日は朝ごはんを食べましたか？',
  'level': 600,
  'category': ['プログラミング', 'IT'],
  'correctCount': 66,
  'wrongCount': 56
},
{
  'id': '6',
  'contents': '今日見た映画は、とても感動的でした。',
  'level': 600,
  'category': ['プログラミング', 'IT'],
  'correctCount': 67,
  'wrongCount': 84
},
{
  'id': '7',
  'contents': 'もし私がカエルだったら草を食べていたでしょう',
  'level': 600,
  'category': ['プログラミング', 'IT'],
  'correctCount': 0,
  'wrongCount': 42
},
{
  'id': '8',
  'contents': '海外に行ったことはありますか？',
  'level': 600,
  'category': ['プログラミング', 'IT'],
  'correctCount': 83,
  'wrongCount': 53
},
{
  'id': '9',
  'contents': 'どんな食べ物が好きですか？',
  'level': 600,
  'category': ['プログラミング', 'IT'],
  'correctCount': 28,
  'wrongCount': 31
},
{
  'id': '10',
  'contents': '沖縄は日本のどのあたりにありますか？',
  'level': 600,
  'category': ['プログラミング', 'IT'],
  'correctCount': 49,
  'wrongCount': 46
},
{
  'id': '11',
  'contents': '東京にはたくさんの外国人が訪れています。',
  'level': 600,
  'category': ['プログラミング', 'IT'],
  'correctCount': 41,
  'wrongCount': 29
},
{
  'id': '12',
  'contents': 'コーディング規約に従うことは、チームのコラボレーションを助けます。',
  'level': 600,
  'category': ['プログラミング', 'IT'],
  'correctCount': 66,
  'wrongCount': 17
},
{
  'id': '13',
  'contents': 'バグを修正するためにコードをデバッグしています。',
  'level': 600,
  'category': ['プログラミング', 'IT'],
  'correctCount': 25,
  'wrongCount': 83
},
{
  'id': '14',
  'contents': 'プログラミング言語を学ぶために、オンラインコースを受講しています。',
  'level': 600,
  'category': ['プログラミング', 'IT'],
  'correctCount': 68,
  'wrongCount': 53
},
{
  'id': '15',
  'contents': '私はこの前のテストで１００点を取りました。',
  'level': 600,
  'category': ['プログラミング', 'IT'],
  'correctCount': 52,
  'wrongCount': 93
},
{
  'id': '16',
  'contents': '変数とは、データを格納するための重要な要素です。',
  'level': 600,
  'category': ['プログラミング', 'IT'],
  'correctCount': 62,
  'wrongCount': 95
},
{
  'id': '17',
  'contents': 'ユーザーインターフェースのデザインにはユーザビリティを考慮する必要があります。',
  'level': 600,
  'category': ['プログラミング', 'IT'],
  'correctCount': 49,
  'wrongCount': 20
}]