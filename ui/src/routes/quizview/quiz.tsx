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
            )
        }
    }

    const QuestionSelector = () => {
        if(questionBankAsPropsForQuiz){
            return(
                    <div className="col-width-15 col-height-6">
                        <h1 className="title">Q. {questionBankAsPropsForQuiz[questionSelected].description}</h1>
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
        <div id="quiz-main-wrapper" className="content-view">
          <div className="grid-row col-height--inherit row-center row-middle col-width-15">
            <QuestionNavigator />
            <QuestionSelector />
            <div className="col-width-15 col-height-1">
                <div className="grid-row row-center row-middle">
                   <button className="border--smooth border--none bg-error-light text-brand primary-quiz-button" onClick={()=>onQuizSubmitted(answersSelectedByUser)}>Submit and End Quiz</button>
                </div>
            </div>
          </div>
        </div>
    );
}

export default Quiz;