import angular from 'angular';
import uiRouter from 'angular-ui-router';
import projectComponent from './project.component';


let projectModule = angular.module('project', [
  uiRouter
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
