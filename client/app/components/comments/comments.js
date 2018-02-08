import angular from 'angular';
import uiRouter from 'angular-ui-router';
import commentsComponent from './comments.component';
import CommentsFactory from './comments.factory';

let commentsModule = angular.module('comments', [
  uiRouter
])

.component('comments', commentsComponent)
.factory('Comments', CommentsFactory)
.factory('CommService', function($resource, Comments) {
  'ngInject';
  let API_URL = Comments.comm.url;
  return $resource(
    API_URL + '/api/v1/projects/:project_id/tasks/:task_id/comments/:id', { project_id: '@project_id', task_id: '@task_id', id: '@id' }, {
      update: {
        method: 'PUT', params: {}
      },
      load: {
        method: 'POST', params: {}
      }
    }
  )
})

.name;

export default commentsModule;
