import React,{lazy, Suspense,Component} from "react";
// import {Route, Switch} from "react-router";
// import LoginForm from "./components/loginForm";
// import RegistrationForm from "./components/RegistrationForm";
// import Header from "./components/header/header";
// import AllAvailableLessons from "./components/allTeachers/AllAvailableLessons";
// import TeacherHomePage from "./components/TeacherHomePage";
// import ProfileForm from "./components/profileForm";
// import AvailableTimeRangeForm from "./components/calendar/AvailableTimeRangeForm";
// import MainStudentsPage from "./components/allTeachers/MainStudentsPage";
import {BrowserRouter, Route,Routes} from "react-router-dom";

const Header = lazy(() => import('./components/header/header'));
const Login = lazy(() => import('./components/loginForm'));
const Registration = lazy(() => import('./components/RegistrationForm'));
const MainStudentsPage = lazy(() => import('./components/allTeachers/MainStudentsPage'));
const Profile = lazy(() => import('./components/profileForm'));
const AllAvailableLessons = lazy(() => import('./components/allTeachers/AllAvailableLessons'));
const TeacherHomePage = lazy(() => import('./components/TeacherHomePage'));

class Routers extends Component {

    render() {
        return (
            <BrowserRouter >
                <Suspense fallback={<div>Loading...</div>}>
                <Header />

                <Routes>
                    <Route path="/"  element={<Login/>} />
                {/*</Routes>*/}
                    <Route path="/registration"  element={<Registration/>} />
                    <Route path="/all-teachers"  element={<MainStudentsPage/>} />
                    <Route path="/profile"   element={<Profile/>} />
                    <Route path="/home-page"   element={<AllAvailableLessons/>} />
                    <Route path="/teacher-home-page"   element={<TeacherHomePage/>} />
                    <Route
                        path="*"
                        element={
                            <main style={{ padding: "1rem" }}>
                                <p>There's nothing here!</p>
                            </main>
                        }
                    />
                {/*</Route>*/}
                </Routes>
                </Suspense>
            </BrowserRouter>
        );
    }
}

export default Routers;