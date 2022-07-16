const express = require("express");
const Quiz = require("../models/Quiz");
const router = express.Router();


router.get("/quiz/:quizId", async (req, res) => { 
    const quizId = req.params.quizId;
    const quiz = await Quiz.findOne({ _id: quizId });
    if (quiz) {
        res.json(quiz);
        return;
    }
    res.json({
        message: "No such quiz exists"
    });
});

router.post("/quiz", async (req, res) => {
    //VALIDATION- starts
    function validateQuestion(questionObj) {
        const question = questionObj.question;
        if (!question)
            return false;
        options = questionObj.options;
        if (options.length < 1 || options.length > 5)
            return false;

    }

    function validateTitle(title) {
        return title.length > 0;
    }

    function validateTime(time) {
        const
            startTime = time.startTime,
            endTime = time.endTime;

        if (!startTime || !endTime)
            return false;

        return true;
    }

    function validateReq(quiz) {
        const
            questions = quiz.questions,
            title = quiz.title,
            time = quiz.time;
        var err = false;
        for (var i = 0; i < questions.length; i++)
            err = err | validateQuestion(questions[i]);
        err = err | validateTitle(title);
        err = err | validateTime(time);
    }
    //VALIDATION- ends
    const quizData = req.body.quiz;
    validateReq(quizData);


    const quiz = new Quiz(quizData);
    await quiz.save();
    res.json(quiz);
});

router.get("/generateLink/:quizId", async (req, res) => {
    const quizId = req.params.quizId;

    const quiz = await Quiz.findOne({ _id: quizId });
    if (!quiz)
        res.json({ message: "No quiz found for this ID" });
    else res.json({ link: "/quiz/" + quizId });

})

module.exports = router;