import { useParams } from "react-router-dom";
import CourseViewSideNav from "./menu";
import CourseViewContent from "./content";
import { useEffect, useState } from "react";
import QuizView from "../quizview/page";

interface courseFilesInterface {
  filename: string,
  fileurl: string
}

interface CourseDetailsInterface {
  courseid: number;       // The ID of the course
  coursename: string;     // Name of the course
  coursetitle: string;    // Title of the course
  coursedesc: string;     // Description of the course
  coursefiles: courseFilesInterface[];  // List of file URLs (should be an array of strings)
  coursequizbank: string; // URL of the quiz bank
  coursecodebase: string; // URL of the course code base
}

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

const CourseView = () => {

  const {courseid} = useParams();
  const [courseDetails, setCourseDetails] = useState<CourseDetailsInterface | null>(null);
  const [courseFiles, setCourseFiles] = useState<courseFilesInterface[]>([]);
  const [questionBank, setQuestionBank] = useState<questionBankInterface[] | null>(null);
  // const [answersById, setAnswersById] = useState<answersSelectedByUserInterface>({});
  const [selectedCourseFile, setSelectedCourseFile] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");

  const handleCourseFileSelection = (fileurl: string) =>{
    setSelectedCourseFile(fileurl);
  }

  const handleQuizSelected = () =>{
    if(questionBank === null){
      getQuizQuestions();
    }

    const quizWindow = document.getElementById("quiz-window");
    if(quizWindow){
      if(quizWindow.style.display != "block"){
        quizWindow.style.display = "block";
        quizWindow.style.height = "100vh";
      }
      else if(quizWindow.style.display === "block"){
        quizWindow.style.display = "none";
      }
    }
  }

  const getCourseDetails = async () => {
    try{
      const req = await fetch(`http://localhost:3000/courses/getcourse/${courseid}`);
      const res = await req.json();
      setCourseDetails(res[0]);
      setCourseFiles(JSON.parse(res[0].coursefiles));
      const filesList = JSON.parse(res[0].coursefiles);
      setSelectedCourseFile(filesList[0].fileurl);
      setCourseName(res[0].coursename);
      setCourseId(res[0].courseid)

    }catch(err){
      console.log(err);
    }
  }
  
  const getQuizQuestions = async() => {
    
    const reqBody = {
      courseId: courseId
    }

    const req = await fetch(`http://localhost:3000/courses/getcoursequizquestions`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody)
    });

    const res = await req.json();

    setQuestionBank(res.questions);
    // setAnswersById(res.answers);

  }


  useEffect(() => {

    getCourseDetails();

  }, []);
  
  if (!courseDetails) {
    return <div>Loading...</div>; // Show a loading message while waiting for course details
  }

  return (
    <div className='page-view bg-body'>
      <div className='grid-row col-height-10 row-center row-top'>
        
        <div className="col-width-3-ld col-width-4-sq col-width-0-sm padding--small">
          <CourseViewSideNav courseNameAsProps={courseName} courseFilesAsProps={courseFiles} onFileSelected={handleCourseFileSelection} onQuizSelected={handleQuizSelected} />
        </div>

        <div className="col-width-12-ld col-width-12-sq col-width-14-sm padding--small list-view-vertical">
          <CourseViewContent courseFileSelectedAsProps={selectedCourseFile} />
        </div>

      </div>

      <QuizView courseNameAsProps={courseName} questionBankAsProps={questionBank} courseIdAsProps={courseId} onQuizClosed={handleQuizSelected} />
    </div>
  )
}

export default CourseView;
