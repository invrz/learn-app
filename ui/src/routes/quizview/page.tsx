import { useCallback, useEffect } from "react";

const QuizView = ({ courseNameAsProps, questionBankAsProps, onQuizClosed }: { courseNameAsProps: string; questionBankAsProps: {} | null; onQuizClosed: () => void }) => {

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

  const marksReceived = 53;
  const totalMarks = 72;

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

        <div id="quiz-main-wrapper" className="content-view">
          <div className="grid-row--vertical col-height--inherit row-center row-middle">
            {JSON.stringify(questionBankAsProps)}
            <button className="border--smooth border--none bg-brand-light text-brand primary-quiz-button" onClick={()=>submitQuiz()}>End Quiz</button>
          </div>
        </div>
        
          <div id="quiz-summary-wrapper" className="content-view">
          <div className="grid-row--vertical col-height--inherit row-center row-middle">
            <h1 className="title">Your Quiz is submitted</h1>
            <p className="subtitle">Here's how you performed</p>
            <p className="text--regular">{marksReceived}/{totalMarks} or {(marksReceived/totalMarks)*100}%</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizView;
