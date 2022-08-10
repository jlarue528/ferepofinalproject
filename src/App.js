import './App.css';
import { Component } from 'react';
import { 
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import Header from './components/Header';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import Error from './components/Error';

import withContext from './Context';
import PrivateRoute from './PrivateRoute';

const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const HeaderWithContext = withContext(Header);
const CourseDetailWithContext = withContext(CourseDetail);

export default class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
          <HeaderWithContext />

          <Switch>
            <Route exact path="/" component={Courses}/>
            <PrivateRoute path="/courses/create" component={CreateCourseWithContext} /> 
            <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
            <Route path="/courses/:id" component={CourseDetailWithContext} />
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signup" component={UserSignUpWithContext} />
            <Route path="/signout" component={UserSignOutWithContext} />
            <Route path="/error" component={Error}/>
         </Switch>
      </BrowserRouter>
    );
  };
};


