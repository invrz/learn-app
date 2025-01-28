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

const CourseView = () => {

  const {courseid} = useParams();
  const [courseDetails, setCourseDetails] = useState<CourseDetailsInterface | null>(null);
  const [courseFiles, setCourseFiles] = useState<courseFilesInterface[]>([]);
  const [questionBank, setQuestionBank] = useState<{} | null>(null);
  const [selectedCourseFile, setSelectedCourseFile] = useState("");
  const [questionBankUrl, setQuestionBankUrl] = useState("");
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
      setQuestionBankUrl(res[0].coursequizbank)

    }catch(err){
      console.log(err);
    }
  }
  
  const getQuizQuestions = async() => {
    
    const reqBody = JSON.stringify({
      questionbankurl: questionBankUrl
    })

    const req = await fetch(`http://localhost:3000/courses/getcoursequizquestions`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: reqBody
    });

    const res = await req.json();

    console.log(res)
    setQuestionBank(res);

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

      <QuizView courseNameAsProps={courseName} questionBankAsProps={questionBank} onQuizClosed={handleQuizSelected} />
    </div>
  )
}

export default CourseView;

//Write Window View For Patterns UI