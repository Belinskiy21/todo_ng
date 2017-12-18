import template from './task.html';
import controller from './task.controller';
import './task.scss';

let taskComponent = {
  bindings: {},
  template,
  controllerAs: 'vm',
  controller,
  inputs: ['tasks']
};

export default taskComponent;
