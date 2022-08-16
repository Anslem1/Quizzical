import React, { useState, useEffect } from 'react'
import Allquestions from './components/Allquestions/Allquestions'
import topImg from './assets/images/topImage.png'
import bottomImg from './assets/images/bottomImage.png'
import './App.css'

function App () {
  const [gameStart, setGamestart] = useState(false)
  const [apiError, setApiError] = useState(false)
  const [playerChoice, setPlayerChoice] = useState({
    category: '',
    difficulty: '',
    type: '',
    amtOfQuestions: 6
  })

  function startGame () {
    setGamestart(prevGameStart => !prevGameStart)
  }

  const handleApiError = boolean => setApiError(boolean)

  function handleChange (e) {
    setPlayerChoice(prevPlayerChoice => {
      const { name, value } = e.target
      return {
        ...prevPlayerChoice,
        [name]: value
      }
    })
  }

  return (
    <div>

      {gameStart ? (
        <Allquestions
        handleApiError={handleApiError}
        playerChoice={playerChoice}
        startGame={startGame}
        />
      ) : (
        <div>
          <img src={topImg} alt='blob' className='topImg' />
          <main className='start-page'>
            <h1>Quizzical</h1>
            <p>Start the quiz and test your Knowledge</p>
            {apiError && (
              <h2 className='apierror'>
                Looks like something went wrong loading the questions. <br />{' '}
                Try again, later
              </h2>
            )}
            <div className='button-container'>
              <button
                {...(playerChoice.amtOfQuestions <= 6 && { disabled: true })}
                onClick={() =>
                  handleChange({
                    target: {
                      name: 'amtOfQuestions',
                      value: playerChoice.amtOfQuestions - 1
                    }
                  })
                }
              >
                -
              </button>
              <h1>{playerChoice.amtOfQuestions}</h1>
              <button
                {...(playerChoice.amtOfQuestions >= 40 && { disabled: true })}
                onClick={() =>
                  handleChange({
                    target: {
                      name: 'amtOfQuestions',
                      value: playerChoice.amtOfQuestions + 1
                    }
                  })
                }
              >
                +
              </button>
            </div>
            <div className='select-container'>
              <div className='select'>
                <label htmlFor='category'>Category:</label>
                <select
                  name='category'
                  id='category'
                  className='select-category'
                  onChange={handleChange}
                >
                  <option value=''>Any Category</option>
                  <option value='9'>General Knowledge</option>
                  <option value='10'>Entertainment: Books</option>
                  <option value='11'>Entertainment: Film</option>
                  <option value='12'>Entertainment: Music</option>
                  <option value='13'>
                    Entertainment: Musicals &amp; Theatres
                  </option>
                  <option value='14'>Entertainment: Television</option>
                  <option value='15'>Entertainment: Video Games</option>
                  <option value='16'>Entertainment: Board Games</option>
                  <option value='17'>Science &amp; Nature</option>
                  <option value='18'>Science: Computers</option>
                  <option value='19'>Science: Mathematics</option>
                  <option value='20'>Mythology</option>
                  <option value='21'>Sports</option>
                  <option value='22'>Geography</option>
                  <option value='23'>History</option>
                  <option value='24'>Politics</option>
                  <option value='25'>Art</option>
                  <option value='26'>Celebrities</option>
                  <option value='27'>Animals</option>
                  <option value='28'>Vehicles</option>
                  <option value='29'>Entertainment: Comics</option>
                  <option value='30'>Science: Gadgets</option>
                  <option value='31'>
                    Entertainment: Japanese Anime &amp; Manga
                  </option>
                  <option value='32'>
                    Entertainment: Cartoon &amp; Animations
                  </option>
                </select>
              </div>
              <div className='select'>
                <label htmlFor='difficulty'>Difficulty:</label>

                <select
                  name='difficulty'
                  id='difficulty'
                  className='select-category'
                  onChange={handleChange}
                >
                  <option value=''>Any Difficulty</option>
                  <option value='easy'>Easy</option>
                  <option value='medium'>Medium</option>
                  <option value='hard'>Hard</option>
                </select>
              </div>
              <div className='select'>
                <label htmlFor='type'>Type of questions:</label>

                <select
                  name='type'
                  id='type'
                  className='select-category'
                  onChange={handleChange}
                >
                  <option value=''>Any Type</option>
                  <option value='multiple'>Multiple Choice</option>
                  <option value='boolean'>True / False</option>
                </select>
              </div>
            </div>
            <div className='wrapper'>
              <button className='startBtn' onClick={startGame}>
                Start Quiz
              </button>
            </div>
          <a className='chidiebube' href='#'>Developed by Chidiebube</a>
          </main>
          <img src={bottomImg} className='bottomImg' />
        </div>
      )}


    </div>
  )
}

export default App
