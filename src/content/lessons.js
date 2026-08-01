// Phonetic spellings are simplified, kid-friendly approximations of Jyutping.
// Chinese characters are shown small/secondary — the app teaches speaking, not reading.
export const lessons = [
  {
    id: 'greetings',
    title: 'Greetings',
    emoji: '👋',
    color: '#ff8a5c',
    words: [
      { id: 'hello', english: 'Hello', emoji: '👋', characters: '你好', phonetic: 'nei5 hou2', say: 'nay-hoh' },
      { id: 'thanks', english: 'Thank you', emoji: '🙏', characters: '唔該', phonetic: 'm4 goi1', say: 'm-goy' },
      { id: 'bye', english: 'Goodbye', emoji: '🙋', characters: '拜拜', phonetic: 'baai1 baai3', say: 'bye-bye' },
      { id: 'morning', english: 'Good morning', emoji: '🌞', characters: '早晨', phonetic: 'jou2 san4', say: 'joh-sun' },
      { id: 'yes', english: 'Yes', emoji: '✅', characters: '係', phonetic: 'hai6', say: 'hi' },
      { id: 'no', english: 'No', emoji: '❌', characters: '唔係', phonetic: 'm4 hai6', say: 'm-hi' },
    ],
  },
  {
    id: 'family',
    title: 'Family',
    emoji: '👨‍👩‍👧‍👦',
    color: '#5c9dff',
    words: [
      { id: 'mom', english: 'Mom', emoji: '👩', characters: '媽媽', phonetic: 'maa4 maa1', say: 'ma-ma' },
      { id: 'dad', english: 'Dad', emoji: '👨', characters: '爸爸', phonetic: 'baa4 baa1', say: 'ba-ba' },
      { id: 'brother', english: 'Older brother', emoji: '👦', characters: '哥哥', phonetic: 'go4 go1', say: 'goh-goh' },
      { id: 'sister', english: 'Older sister', emoji: '👧', characters: '家姐', phonetic: 'gaa1 ze2', say: 'ga-jeh' },
      { id: 'grandma', english: 'Grandma', emoji: '👵', characters: '婆婆', phonetic: 'po4 po2', say: 'poh-poh' },
      { id: 'grandpa', english: 'Grandpa', emoji: '👴', characters: '公公', phonetic: 'gung1 gung1', say: 'gong-gong' },
    ],
  },
  {
    id: 'animals',
    title: 'Animals',
    emoji: '🐾',
    color: '#4cc98a',
    words: [
      { id: 'dog', english: 'Dog', emoji: '🐶', characters: '狗', phonetic: 'gau2', say: 'gow' },
      { id: 'cat', english: 'Cat', emoji: '🐱', characters: '貓', phonetic: 'maau1', say: 'maau' },
      { id: 'bird', english: 'Bird', emoji: '🐦', characters: '雀仔', phonetic: 'zoek3 zai2', say: 'jeuk-jai' },
      { id: 'fish', english: 'Fish', emoji: '🐟', characters: '魚', phonetic: 'jyu4', say: 'yu' },
      { id: 'rabbit', english: 'Rabbit', emoji: '🐰', characters: '兔仔', phonetic: 'tou3 zai2', say: 'toh-jai' },
      { id: 'elephant', english: 'Elephant', emoji: '🐘', characters: '大象', phonetic: 'daai6 zoeng6', say: 'dai-jeung' },
    ],
  },
]

export function getLesson(id) {
  return lessons.find((l) => l.id === id)
}
