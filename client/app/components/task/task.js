import angular from 'angular';
import uiRouter from 'angular-ui-router';
import taskComponent from './task.component';
import uiBootstrap from 'angular-ui-bootstrap';
import Project from '../project/project';


let taskModule = angular.module('task', [
  uiRouter,
  uiBootstrap,
  Project
])

.component('task', taskComponent)

.name;

export default taskModule;
