import template from './task.html';
import controller from './task.controller';
import './task.scss';

let taskComponent = {
  bindings: {
    'tasks': '=',
    'projectid': '<',
    'opened': '=',
    onOpenDatepicker : '&'
  },
  template,
  controllerAs: 'vm',
  controller
};

export default taskComponent;
