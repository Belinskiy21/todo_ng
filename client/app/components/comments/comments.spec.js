import CommentsModule from './comments';
import CommentsController from './comments.controller';
import CommentsComponent from './comments.component';
import CommentsTemplate from './comments.html';

describe('Comments', () => {
  let $rootScope, makeController;

  beforeEach(window.module(CommentsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new CommentsController();
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
      expect(CommentsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = CommentsComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(CommentsTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(CommentsController);
    });
  });
});
