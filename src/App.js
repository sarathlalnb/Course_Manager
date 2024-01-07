import { Routes, Route } from "react-router-dom";
import LoginForm from "./Components/LoginForm/LoginForm";
import Dashboard from "./Components/Assets/Dashboard/Dashboard";
import CoursesOnBoardingForm from "./Components/Assets/Courses/CoursesOnBoardingForm";
import CoursesCreateForm from "./Components/Assets/Courses/CoursesCreateForm"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/coursesEdit" element={<CoursesOnBoardingForm />}></Route>
        <Route path="/courseCreate" element={<CoursesCreateForm />}></Route>
      </Routes>
    </>
  );
}

export default App;
