import angular from 'angular';
import Project from './project/project';


let componentModule = angular.module('app.components', [
  Project
])

.name;

export default componentModule;
