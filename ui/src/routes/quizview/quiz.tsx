import { useEffect, useState } from "react";

interface answerObjectInterface {
    answer: string;
    explanation: string;
}

interface answersSelectedByUserInterface {
    [key: string]: answerObjectInterface;
}

interface answerActiveInterace {
    [key: string]: string;
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

const Quiz = ({questionBankAsPropsForQuiz, onQuizSubmitted}: {questionBankAsPropsForQuiz: questionBankInterface[] | null, onQuizSubmitted(answersSelectedByUser: answersSelectedByUserInterface): void}) =>{

    const [questionSelected, setQuestionSelected] = useState(0);
    const [questionIdSelected, setQuestionIdSelected] = useState("");
    const [answerActive, setAnswerActive] = useState<answerActiveInterace>({});
    const [answersSelectedByUser, setAnswersSelectedByUser] = useState<answersSelectedByUserInterface>({});
    const [confirmQuizSubmissionState, setConfirmQuizSubmissionState] = useState(false);

    
    const confirmSubmissionUsingModal = () =>{
        const submissionConfirmModal = document.getElementById("confirm-submission-dialog");
        if(submissionConfirmModal){
          submissionConfirmModal.style.display = "block";
        }
    }

    const handleDialogBoxAction = (state: boolean) => {
        if(state){
          setConfirmQuizSubmissionState(true);
        }else{
          setConfirmQuizSubmissionState(false)
        }
        
        const submissionConfirmModal = document.getElementById("confirm-submission-dialog");
        if(submissionConfirmModal){
          submissionConfirmModal.style.display = "none";
        }
    
    }
    
    //Use effect to submit quiz when state of confirmQuizSubmissionState turns true
    useEffect(()=>{
    
        const submitQuizIfConfirmed = async () =>{
    
          if(confirmQuizSubmissionState === true){
    
            onQuizSubmitted(answersSelectedByUser)    
        
          }
      
        }
    
        submitQuizIfConfirmed();
    
    
    }, [confirmQuizSubmissionState])


    const handleAnswerMark = (questionId: string, optionSelected: string) => {
        let thisAnswer = { ...answersSelectedByUser };
        let thisAnswerActive = { ...answerActive };
        if(thisAnswer){
            thisAnswer[questionId] = {'answer' : optionSelected, 'explanation': 'selected'};
            setAnswersSelectedByUser(thisAnswer);
            thisAnswerActive[questionSelected] = optionSelected;
            setAnswerActive(thisAnswerActive);
        }
    }


    const QuestionNavigator = () => {
        if(questionBankAsPropsForQuiz && questionBankAsPropsForQuiz.length > 0){
            return(
                <div className="col-width-15 col-height-1">
                    <div className="grid-row row-center row-middle">
                        <div className="col-width-8 grid-row row-center">
                            {questionBankAsPropsForQuiz.map((question, index) => {
                                if(questionSelected === index){
                                    return (<button className="border--none border--smoother quiz-nav-button bg-accent-light text-accent" key={question.id}>{index + 1}</button>)
                                }
                                else{
                                    return (<button className="border--none border--smoother quiz-nav-button bg-brand-dark text-brand" onClick={()=>{setQuestionSelected(index); setQuestionIdSelected(question.id.toString())}} key={question.id}>{index + 1}</button>)
                                }
                            })}
                        </div>
                    </div>
                </div>
            )
        }
    }

    const rotateQuestion = (rotateBy: number) => {
        if(rotateBy === -1 && questionBankAsPropsForQuiz){
            //reduce index by 1 or set as 20 if 1st question is active
            if(questionSelected > 1){
                setQuestionIdSelected(questionBankAsPropsForQuiz[questionSelected-1].id.toString())
                setQuestionSelected(questionSelected-1);
            }
            else{
                setQuestionIdSelected(questionBankAsPropsForQuiz[19].id.toString())
                setQuestionSelected(19);
            }
        }
        else if(rotateBy === 1 && questionBankAsPropsForQuiz){
            //reduce index by 1 or set as 20 if 1st question is active
            if(questionSelected < 19){
                setQuestionIdSelected(questionBankAsPropsForQuiz[questionSelected+1].id.toString())
                setQuestionSelected(questionSelected+1);
            }
            else{
                setQuestionIdSelected(questionBankAsPropsForQuiz[0].id.toString())
                setQuestionSelected(0);
            }
        }        
    }

    const QuestionSelector = () => {
        if(questionBankAsPropsForQuiz){
            return(
                    <div className="col-width-15 col-height-6 row-top">
                        <h1 className="title"><span className="text--bold">Q{questionSelected+1}.</span> {questionBankAsPropsForQuiz[questionSelected].description}</h1>
                        {questionBankAsPropsForQuiz[questionSelected].options.map((option)=> {
                            if(answerActive[questionSelected] === option.label){
                                return(
                                    <button className="border--medium border--solid bg-success quiz-option-button" key={option.label} onClick={()=> handleAnswerMark(questionIdSelected, option.label)} >
                                        <span className="text--regular">{option.text}</span>
                                    </button>
                                )
                            }
                            else{
                                return(
                                    <button className="border--medium border--solid bg-muted quiz-option-button" key={option.label} onClick={()=> handleAnswerMark(questionIdSelected, option.label)} >
                                        <span className="text--regular">{option.text}</span>
                                    </button>
                                )
                            }
                        })}
                    </div>
                    
            )
        }
    }

    useEffect(()=>{

        setAnswerActive({});
        setAnswersSelectedByUser({});
        setQuestionSelected(0);
        if(questionBankAsPropsForQuiz){
            setQuestionIdSelected(questionBankAsPropsForQuiz[0].id.toString());
        }

    }, [onQuizSubmitted])

    return(
        <>
            <div id="quiz-main-wrapper" className="content-view">
            <div className="grid-row col-height--inherit row-center row-middle col-width-15">
                <QuestionSelector />
                <QuestionNavigator />
                <div className="col-width-15 col-height-1">
                    <div className="grid-row row-center row-middle">
                        <button className="border--smooth border--none bg-brand-light text-brand primary-quiz-button" onClick={()=>rotateQuestion(-1)}>Previous Question</button>&nbsp;&nbsp;
                        <button className="border--smooth border--none bg-error-light text-brand primary-quiz-button" onClick={()=>confirmSubmissionUsingModal()}>Submit and End Quiz</button>&nbsp;&nbsp;
                        <button className="border--smooth border--none bg-brand-light text-brand primary-quiz-button" onClick={()=>rotateQuestion(1)}>Next Question</button>
                    </div>
                </div>
            </div>
            </div>

            <div className="modal-box border--thin" id="confirm-submission-dialog">
                <div className="modal-title bg-accent-dark">
                    <p className="modal-title-text">Confirm Quiz Submission</p>
                </div>
                <div className="modal-message bg-accent">
                    <h2 className="text--large">
                        Are you sure you want to submit your quiz ?
                    </h2>
                </div>
                <div className="modal-action bg-accent-dark">
                    <button className="modal-ation-button border--smooth border--none bg-error-light text-brand primary-quiz-button" onClick={()=>handleDialogBoxAction(true)}>Yes</button>
                    <button className="modal-ation-button border--smooth border--none bg-brand-light text-brand primary-quiz-button" onClick={()=>handleDialogBoxAction(false)}>No, let me continue</button>
                </div>
            </div>
          

        </>
        
    );
}

export default Quiz;