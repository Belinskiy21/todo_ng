import angular from 'angular';
import Project from './project/project';
import Task from './task/task';
import Comments from './comments/comments';
import Login from './login/login';
import Signup from './signup/signup';



let componentModule = angular.module('app.components', [
  Project,
  Task,
  Comments,
  Login,
  Signup
])

.name;

export default componentModule;
