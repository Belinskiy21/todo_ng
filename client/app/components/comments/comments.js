import angular from 'angular';
import uiRouter from 'angular-ui-router';
import commentsComponent from './comments.component';
import CommentsFactory from './comments.factory';

let commentsModule = angular.module('comments', [
  uiRouter
])

.component('comments', commentsComponent)
.factory('Comments', CommentsFactory)

.name;

export default commentsModule;
