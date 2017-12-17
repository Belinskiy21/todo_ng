import TaskModule from './task';
import TaskController from './task.controller';
import TaskComponent from './task.component';
import TaskTemplate from './task.html';

describe('Task', () => {
  let $rootScope, makeController;

  beforeEach(window.module(TaskModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new TaskController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(TaskTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = TaskComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(TaskTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(TaskController);
    });
  });
});
