export type Question = {
  id: number
  prompt: string
  choices: [string, string, string, string]
  correctIndex: 0 | 1 | 2 | 3
}

export const questions: Question[] = [
  {
    id: 1,
    prompt: 'Which of these is a red wine grape?',
    choices: ['Chardonnay', 'Pinot Noir', 'Sauvignon Blanc', 'Riesling'],
    correctIndex: 1,
  },
  {
    id: 2,
    prompt: 'True Champagne can only be made in which region?',
    choices: ['Tuscany', 'Napa Valley', 'Champagne, France', 'Rioja'],
    correctIndex: 2,
  },
  {
    id: 3,
    prompt: 'Why do wine snobs hold a glass by the stem?',
    choices: [
      'It looks fancier in photos',
      'To avoid warming the wine with your hand',
      'Stems improve aroma chemistry',
      'It prevents fingerprints on the cork',
    ],
    correctIndex: 1,
  },
  {
    id: 4,
    prompt: 'Which grape is the primary variety in most red Burgundy?',
    choices: ['Merlot', 'Syrah', 'Cabernet Sauvignon', 'Pinot Noir'],
    correctIndex: 3,
  },
  {
    id: 5,
    prompt: 'Sangiovese is the signature grape of which Italian region?',
    choices: ['Piedmont', 'Tuscany', 'Veneto', 'Sicily'],
    correctIndex: 1,
  },
  {
    id: 6,
    prompt: 'What does “brut” typically indicate on a sparkling wine label?',
    choices: [
      'Very sweet',
      'Aged in oak only',
      'Dry / low residual sugar',
      'Made without bubbles',
    ],
    correctIndex: 2,
  },
  {
    id: 7,
    prompt: 'Which New World region is most associated with bold Cabernet Sauvignon?',
    choices: ['Mosel', 'Napa Valley', 'Chablis', 'Prosecco hills'],
    correctIndex: 1,
  },
  {
    id: 8,
    prompt: 'In Bordeaux classification talk, what is a “Left Bank” red typically based on?',
    choices: [
      'Pinot Noir',
      'Cabernet Sauvignon–dominant blends',
      '100% Merlot only',
      'Sparkling Chenin Blanc',
    ],
    correctIndex: 1,
  },
  {
    id: 9,
    prompt: 'What does “terroir” refer to in wine culture?',
    choices: [
      'A type of French oak barrel',
      'The sugar level after fermentation',
      'The place’s soil, climate, and growing conditions',
      'A legal aging requirement for Port',
    ],
    correctIndex: 2,
  },
  {
    id: 10,
    prompt:
      'If a wine is described as “volatile” with a nail-polish note, which compound is often implicated?',
    choices: [
      'Malic acid only',
      'Acetic acid / ethyl acetate',
      'Tartaric crystals',
      'Free sulfur dioxide at zero',
    ],
    correctIndex: 1,
  },
]

export const blurbs: Record<number, string> = {
  0: 'Not yet a wine snob. The cellar door is still closed—try again.',
  1: 'You once held a glass correctly. The sweater has begun.',
  2: 'You can tell red from white. Dangerous knowledge.',
  3: 'You order by the glass with mild confidence. Respectable.',
  4: 'You know a region or two. Friends have started nodding along.',
  5: 'Halfway to unbearable. The turtleneck is rising.',
  6: 'You correct pronunciations gently. They notice.',
  7: 'You swirl before you sip. The room adjusts.',
  8: 'You speak in appellations. Ordinary wine lists fear you.',
  9: 'Nearly peak snob. Only one wrong answer stands between you and the collar.',
  10: 'Ultimate wine snob. The sweater has achieved liftoff. Bow before you.',
}

export function portraitForScore(score: number): string | null {
  if (score < 1 || score > 10) return null
  return `/portraits/c${score}.png`
}
