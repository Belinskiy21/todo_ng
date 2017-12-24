import angular from 'angular';
import uiRouter from 'angular-ui-router';
import taskComponent from './task.component';
import uiBootstrap from 'angular-ui-bootstrap';


let taskModule = angular.module('task', [
  uiRouter,
  uiBootstrap
])

.component('task', taskComponent)

.name;

export default taskModule;
