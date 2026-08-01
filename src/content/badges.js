import { lessons } from './lessons'

export const badges = [
  {
    id: 'first-lesson',
    name: 'First Steps',
    emoji: '🎉',
    description: 'Finish your first lesson',
    earned: ({ progress }) => Object.values(progress).some((l) => (l.stars || 0) >= 1),
  },
  {
    id: 'perfect-lesson',
    name: 'Perfect Round',
    emoji: '⭐',
    description: 'Get 3 stars on any lesson',
    earned: ({ progress }) => Object.values(progress).some((l) => (l.stars || 0) >= 3),
  },
  {
    id: 'all-rounder',
    name: 'All-Rounder',
    emoji: '🌟',
    description: 'Earn at least 1 star in every lesson',
    earned: ({ progress }) => lessons.every((lesson) => (progress[lesson.id]?.stars || 0) >= 1),
  },
  {
    id: 'champion',
    name: 'Champion',
    emoji: '🏆',
    description: 'Get 3 stars in every lesson',
    earned: ({ progress }) => lessons.every((lesson) => (progress[lesson.id]?.stars || 0) >= 3),
  },
  {
    id: 'brave-speaker',
    name: 'Brave Speaker',
    emoji: '🎙️',
    description: 'Record yourself saying a word',
    earned: ({ recorded }) => recorded,
  },
]

export function earnedBadges({ progress, recorded }) {
  return badges.filter((badge) => badge.earned({ progress, recorded }))
}
