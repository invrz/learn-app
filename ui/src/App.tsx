import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './routes/login/page';
import Landing from './routes/landing/page';
import Signup from './routes/signup/page';
import Home from './routes/home/page';
import UserDashboard from './routes/userdashboard/page';
import UserCourses from './routes/usercourses/page';
import CourseDetails from './routes/coursedetails/page';
import QuizDetails from './routes/quizdetails/page';

import "patterns-ui/styles/main.css";
import "./App.css";
import "./index.css";
import CourseView from './routes/courseview/layout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/usercourses" element={<UserCourses />} />
        <Route path="/coursedetails" element={<CourseDetails />} />
        <Route path="/quizdetails" element={<QuizDetails />} />
        <Route path="/courseview">
          <Route path=':courseid' element={<CourseView />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

/*

        <Route path="/quizview">
          <Route path=':quizname' element={<QuizView />} />
        </Route>

*/