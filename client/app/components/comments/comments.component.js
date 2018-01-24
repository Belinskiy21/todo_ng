import template from './comments.html';
import controller from './comments.controller';
import './comments.scss';

let commentsComponent = {
  bindings: {
    'comments': '=',
    'projectid': '=',
    'taskid': '='
  },
  template,
  controller
};

export default commentsComponent;
