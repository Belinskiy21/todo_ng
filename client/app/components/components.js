import angular from 'angular';
import Project from './project/project';
import Task from './task/task';


let componentModule = angular.module('app.components', [
  Project,
  Task
])

.name;

export default componentModule;
