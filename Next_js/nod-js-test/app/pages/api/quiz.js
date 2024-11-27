// versjon < 13 => pages/api/quiz.js

const quiz = [
    {
      question: 'Spørsmål 1',
      answers: [
        {
          answere: 'Alternativ 1',
        },
        {
          answere: 'Alternativ 2',
        },
        {
          answere: 'Alternativ 3',
        },
        {
          answere: 'Alternativ 4',
          correct: true,
        },
      ],
    },
    {
      question: 'Spørsmål 2',
      answers: [
        {
          answere: 'Alternativ 1',
        },
        {
          answere: 'Alternativ 2',
        },
        {
          answere: 'Alternativ 3',
        },
        {
          answere: 'Alternativ 4',
          correct: true,
        },
      ],
    },
  ]
  
  export default function handler(req, res) {
    res.status(200).json({ success: true, data: quiz })
  }