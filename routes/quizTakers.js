const express = require("express"); 
const QuizTaker = require("../models/QuizTaker");
const router = express.Router();

router.post("/quiz/:quizId", async (req, res)=>{
    const quiz = req.body.quiz;
    const 
        taker = quiz.taker,
        startedAt = quiz.start,
        endedAt = quiz.end,
        quizId = req.params.quizId;

    const quizTaker = {
        name: taker+'@'+Date.now().toString(),
        quizId: quizId,
        started: startedAt,
        // totalTime: endedAt - startedAt,
        ended: endedAt
    }
    const newQuizTaker = new QuizTaker(quizTaker);
    const savedQuizTaker = await newQuizTaker.save();
    res.json(savedQuizTaker);
});

module.exports = router;