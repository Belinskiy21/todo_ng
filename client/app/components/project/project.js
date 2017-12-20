import angular from 'angular';
import uiRouter from 'angular-ui-router';
import projectComponent from './project.component';
import uiBootstrap from 'angular-ui-bootstrap';
import ngAnimate from 'angular-animate';




let projectModule = angular.module('project', [
  uiRouter,
  uiBootstrap,
  ngAnimate
])
.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('projects', {
      url: '/projects',
      component: 'project'
    });
})
.component('project', projectComponent)

.name;

export default projectModule;
