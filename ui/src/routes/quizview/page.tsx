import { useCallback, useEffect, useState } from "react";
import Quiz from "./quiz";

interface answerObjectInterface {
  answer: string;
  explanation: string;
}

interface answersSelectedByUserInterface {
  [key: string]: answerObjectInterface;
}

interface quizQuestionOptionsInterface {
  label: string;
  text: string;
}

interface questionBankInterface {
  id: number;
  description: string;
  options: quizQuestionOptionsInterface[];
}

const QuizView = ({ courseNameAsProps, questionBankAsProps, courseIdAsProps, onQuizClosed }: { courseNameAsProps: string; questionBankAsProps: questionBankInterface[] | null; courseIdAsProps : string; onQuizClosed: () => void }) => {

  const [marksReceived, setMarksReceived] = useState<Number>(0);
  const [totalMarks, setTotalMarks] = useState<Number>(Number(questionBankAsProps?.length) | 0);
  const [marksInPercent, setMarksInPercent] = useState<Number>(0);

  const startQuiz = useCallback(() =>{
    const startScreen = document.getElementById("quiz-start-wrapper");
    if(startScreen){
      startScreen.style.display = "none";
    }
    const quizScreen = document.getElementById("quiz-main-wrapper");
    if(quizScreen){
      quizScreen.style.display = "block";
    }
  }, [])

  const handleQuizSubmitted = async (answersSelectedByUser: answersSelectedByUserInterface) =>{

    const reqBody = {
      answersById: answersSelectedByUser,
      courseId: courseIdAsProps
    }

    const req = await fetch(`http://localhost:3000/courses/getscoreforquiz`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody)
    });

    const res = await req.json();
    

    // Object.keys(answersByIdAsProps).forEach(key =>{
    //   if(answersSelectedByUser[key] && (answersByIdAsProps[key].answer === answersSelectedByUser[key].answer)){
    //     scoreAcquired++;
    //   }
    //   scorePossible++;
    // })

    setMarksReceived(res.scoreAcquired);
    setTotalMarks(res.maxScore);
    setMarksInPercent(res.scoreInPercent);

    submitQuiz();
  }

  const submitQuiz = useCallback(() =>{
    const quizScreen = document.getElementById("quiz-main-wrapper");
    if(quizScreen){
      quizScreen.style.display = "none";
    }
    const summaryScreen = document.getElementById("quiz-summary-wrapper");
    if(summaryScreen){
      summaryScreen.style.display = "block";
    }
  }, [])

  const retryQuiz = useCallback(() =>{
    const summaryScreen = document.getElementById("quiz-summary-wrapper");
    if(summaryScreen){
      summaryScreen.style.display = "none";
    }
    const startScreen = document.getElementById("quiz-start-wrapper");
    if(startScreen){
      startScreen.style.display = "block";
    }
  }, [])

  useEffect(()=>{
    const startScreen = document.getElementById("quiz-start-wrapper");
    if(startScreen){
      startScreen.style.display = "block";
    }
    const quizScreen = document.getElementById("quiz-main-wrapper");
    if(quizScreen){
      quizScreen.style.display = "none";
    }
    const summaryScreen = document.getElementById("quiz-summary-wrapper");
    if(summaryScreen){
      summaryScreen.style.display = "none";
    }
  }, [])

  return (
    <div className="window-view" id="quiz-window">
      <div className="window-title bg-muted-dark">
        <p className="window-title-text">Quiz On {courseNameAsProps}</p>
        <button className="window-title-action bg-error border--none border--smooth" onClick={()=>{onQuizClosed()}}>&nbsp;&nbsp; X &nbsp;&nbsp;</button>
      </div>
      <div className="window-content bg-muted-light">
        <div id="quiz-start-wrapper" className="content-view">
          <div className="grid-row--vertical col-height--inherit row-center row-middle">
            <h1 className="title">Ready for a Quiz ?</h1><br/>
            <p className="subtitle">Test yourself based on the topics covered in the course.</p>
            <p className="subtitle">The questions will either be single correct or multiple correct in a multiple choice questions format.</p><br/>
            <button className="border--smooth border--none bg-brand-light text-brand primary-quiz-button" onClick={()=>startQuiz()}>Start Quiz</button>
          </div>
        </div>

        <Quiz questionBankAsPropsForQuiz={questionBankAsProps} onQuizSubmitted={handleQuizSubmitted} />
        
        <div id="quiz-summary-wrapper" className="content-view">
          <div className="grid-row--vertical col-height--inherit row-center row-middle">
            <h1 className="title">Your Quiz is submitted</h1>
            <p className="subtitle">Here's how you performed</p>
            <p className="text--regular">{marksReceived.toString()}/{totalMarks.toString()} or {marksInPercent.toString()}%</p>
            <button className="border--smooth border--none bg-brand-light text-brand primary-quiz-button" onClick={()=>retryQuiz()}>Retry Quiz</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizView;
