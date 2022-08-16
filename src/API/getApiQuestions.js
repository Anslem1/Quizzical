async function getApiQuestions(playerChoice) {
    const { category, difficulty, type, amtOfQuestions } = playerChoice

    let categoryParam = ''
    let difficultyParam = ''
    let typeParam = ''
    let amtOfQuestionsParam = amtOfQuestions

    // console.log(typeParam)
    // console.log(amtOfQuestionsParam)
    if (category !== '') categoryParam = `&category=${category}`

    if (difficulty !== '') difficultyParam = `&difficulty=${difficulty}`

    if (type !== '') typeParam = `&type=${type}`

    if (amtOfQuestionsParam !== 5)
        amtOfQuestionsParam = `amount=${amtOfQuestions}`

    try {
        let apiUrl = `https://opentdb.com/api.php?${amtOfQuestionsParam}${categoryParam}${difficultyParam}${typeParam}`
        const res = await fetch(apiUrl)
        const data = await res.json()
        return data.results
        
    } catch (error) {
        console.log(error)
    }

        // https://opentdb.com/api.php?amount=10&category=26&difficulty=easy&type=multiple
}
// https://opentdb.com/api.php?amount=10&category=16&difficulty=medium&type=multiple

export default getApiQuestions