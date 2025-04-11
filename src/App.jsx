import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/common/Navbar";
import Error from "./pages/ERROR";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import OpenRoute from "./components/core/Auth/openRoute";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Myprofile from "./components/core/Dashboard/Myprofile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Settings from "./components/core/Dashboard/Settings/index";
import { ACCOUNT_TYPE } from "./utils/constants";
import Cart from "./components/core/Dashboard/cart/index";
import { useDispatch, useSelector } from "react-redux";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import AddCourses from "./components/core/Dashboard/AddCourse/index"
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse/index"
import Catalog from "./pages/Catalog";

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user} = useSelector((state) => state.profile)

  return (
    <div className="w-screen min-h-screen bg-[#000814] flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<div></div>} />
        <Route path="/catalog/:catalogName" element={<Catalog />} />
        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<Myprofile />} />
          <Route path="dashboard/Settings" element={<Settings />} />
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
              <Route path="dashboard/cart" element={<Cart />}/>
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />}/>
              </>
            )
          }
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
              <Route path="dashboard/instructor"element={<Instructor />} />
              <Route path="dashboard/add-course"element={<AddCourses />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
              </>
            )
          }
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
