import angular from 'angular';
import uiRouter from 'angular-ui-router';
import taskComponent from './task.component';
import uiBootstrap from 'angular-ui-bootstrap';
import TaskFactory from './task.factory';


let taskModule = angular.module('task', [
  uiRouter,
  uiBootstrap
])

.component('task', taskComponent)
.factory('Task', TaskFactory)

.name;

export default taskModule;
