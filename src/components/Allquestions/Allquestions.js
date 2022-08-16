import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import ReactConfetti from 'react-confetti'
import './Allquestions.css'

import Eachquestion from '../Eachquestions/Eachquestion'
import getApiQuestions from '../../API/getApiQuestions'

const Allquestions = ({ playerChoice, startGame, handleApiError }) => {
  const [questionsArray, setQuestionsArray] = useState([])
  const [checkAnswerBtn, setCheckAnswerBtn] = useState(false)
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)

  const allQuestionsAnswered = questionsArray.every(
    question => question.selectedAnswer !== ''
  )

  useEffect(() => {
    getApiQuestions(playerChoice).then(questions => {
      if (questions.length === 0) {
        startGame()
        handleApiError(true)
        return
      } else {
        handleApiError(false)
      }

      return setQuestionsArray(
        questions.map(question => {
          return {
            ...question,
            id: nanoid(),
            selectedAnswer: '',
            showAnswer: false
          }
        })
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  useEffect(() => {
    if (questionsArray.length !== 0 && allQuestionsAnswered) {
      let correctAnswers = 0

      questionsArray.forEach(question => {
        if (question.correct_answer === question.selectedAnswer)
          correctAnswers++
      })

      setCorrectAnswersCount(correctAnswers)
      setCheckAnswerBtn(true)
    }
  }, [questionsArray])

  const handleSelectAnswer = (questionId, answer) => {
    if (!isGameOver) {
      setQuestionsArray(prevQuestionsArray =>
        prevQuestionsArray.map(question =>
          question.id === questionId
            ? { ...question, selectedAnswer: answer }
            : question
        )
      )
    }
  }

  const checkAnswers = () => {
    if (allQuestionsAnswered) {
      setIsGameOver(true)

      setQuestionsArray(prevQuestionsArray =>
        prevQuestionsArray.map(question => ({ ...question, showAnswer: true }))
      )
    }
  }

  const resetGame = () => {
    setCheckAnswerBtn(false)
    setIsGameOver(false)
    startGame()
  }

  const questionElements = questionsArray.map(question => (
    <Eachquestion
      key={question.id}
      id={question.id}
      question={question.question}
      correctAnswer={question.correct_answer}
      incorrectAnswers={question.incorrect_answers}
      difficulty={question.difficulty}
      category={question.category}
      selectedAnswer={question.selectedAnswer}
      showAnswer={question.showAnswer}
      handleSelectAnswer={handleSelectAnswer}
    />
  ))

  return (
    <div>
      <div className='house'>
              <i class='fa-solid fa-house-chimney' onClick={startGame}></i>
      </div>
      <div className='container'>
        {checkAnswerBtn && correctAnswersCount === questionsArray.length && (
          <div className='confetti-container'>
            <ReactConfetti className='confetti' />
          </div>
        )}
        <section className='questionList-container'>
          {questionElements}

          <div className='bottom-container'>
            {isGameOver && (
              <h3 className='correct-answers-text'>
                You scored {correctAnswersCount}/{questionsArray.length} correct
                answers
              </h3>
            )}

            <button
              className={`btn-primary ${
                checkAnswerBtn
                  ? 'btn-check-answers'
                  : 'btn-check-answers-disabled'
              }`}
              onClick={isGameOver ? resetGame : checkAnswers}
            >
              {isGameOver ? 'Play again' : 'Check answers'}
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Allquestions
