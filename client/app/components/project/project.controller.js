class ProjectController {
  constructor() {
    let model = this;

    model.projects = [{'title': 'My first project'},
    {'title': 'My second project'},
    {'title': 'My another project'}];


    model.addProject = () => {
      if(!model.title || model.title === '') { return; }
      model.projects.push({title: model.title});
      model.title = '';
    };
    model.removeContent = () => {
      model.title = '';
    };
  }
}

export default ProjectController;
