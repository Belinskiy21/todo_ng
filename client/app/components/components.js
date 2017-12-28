import angular from 'angular';
import Project from './project/project';
import Task from './task/task';
import Comments from './comments/comments';



let componentModule = angular.module('app.components', [
  Project,
  Task,
  Comments
])

.name;

export default componentModule;
