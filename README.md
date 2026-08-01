# CantoKid

A mobile-friendly web app that helps kids around age 10 learn to **speak**
Cantonese — listening and pronunciation practice, not reading/writing
Chinese characters.

## How it works

- **Lessons** are grouped by theme (Greetings, Family, Animals), each with a
  handful of words/phrases.
- **Flashcards** show an emoji, the English meaning, and a simplified
  phonetic spelling. Tap **Listen** to hear it spoken in Cantonese
  (`zh-HK` text-to-speech), then **Practice saying it** to record yourself
  and play your attempt back next to the native audio.
- **Quiz** mode plays a word's audio and asks the kid to pick the matching
  picture/word — a listening-comprehension check, not a reading test.
- **Progress** (stars per lesson) is saved to `localStorage`, no backend or
  account needed.

Chinese characters are shown small and secondary on each flashcard, since
the goal is spoken fluency first.

## Requirements

- Cantonese text-to-speech relies on the browser having a `zh-HK` voice
  installed. This varies by device/browser — Chrome on Android and Safari on
  iOS generally have good Cantonese voice support built in.
- Recording your voice for playback comparison requires microphone
  permission.

## Development

```bash
npm install
npm run dev      # start local dev server
npm run build    # production build
npm run lint     # oxlint
```

Built with React + Vite. No backend — deployable as a static site (Vercel,
Netlify, GitHub Pages, etc).
