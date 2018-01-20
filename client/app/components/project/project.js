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

  $urlRouterProvider.otherwise('/login');

  $stateProvider
    .state('projects', {
      url: '/projects',
      component: 'project'
    });
})
.factory('Project', function($resource) {
  'ngInject';
  let API_URL = 'http://localhost:3000';
  return $resource(
    API_URL + '/api/v1/projects/:id', { id: '@id' }, {
      update: {
        method: 'PUT', params: {}
      }
    }
  )
})
.component('project', projectComponent)

.name;

export default projectModule;
