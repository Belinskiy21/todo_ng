import angular from 'angular';
import Project from './project/project';
import About from './about/about';

let componentModule = angular.module('app.components', [
  Project,
  About
])

.name;

export default componentModule;
