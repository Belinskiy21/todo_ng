import angular from 'angular';
import uiRouter from 'angular-ui-router';
import taskComponent from './task.component';

let taskModule = angular.module('task', [
  uiRouter
])

.component('task', taskComponent)

.name;

export default taskModule;
