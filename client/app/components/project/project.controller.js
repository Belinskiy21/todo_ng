class ProjectController {
  constructor($uibModal) {
    'ngInject';
    this.$uibModal = $uibModal;
    let model = this;

    model.projects = [
      { 'id': 1,
        'title': 'My first project',
        'tasks': [ {'title': 'first task'}, {'title': 'second task'}, {'title': 'one more task'} ]
      },
      { 'id': 2,
        'title': 'My second project',
        'tasks': [ {'title': '2 pr first task'} , {'title': '2 pr second task'}, {'title': '2 pr one more task'}]
      },
      { 'id': 3,
        'title': 'My another project',
        'tasks': [ {'title': '3 pr first task'}, {'title': '3 pr second task'}, {'title': '3 pr one more task'}]
      }]



    model.addProject = () => {
      if(!model.title || model.title === '') { return }
      model.projects.push({title: model.title})
      model.title = ''
    }
    model.removeContent = () => {
      model.title = ''
    }
    model.deleteProject = (project) => {
      if (confirm("sure to delete?"))
      model.projects.splice(model.projects.indexOf(project), 1 )
    }
    model.editProject = (project) => {
      model.showEdit = true
      model.editTitle = project.title
      model.helpEdit = project
    }


    model.Save = () => {
      model.newProject = { "id": model.helpEdit.id, "title": model.editTitle }
      model.editTitle = model.projects.splice( model.projects.indexOf(model.helpEdit), 1 )
      model.projects.push(model.newProject)
      model.editTitle=""
      model.showEdit = false
    }
    model.cancelEdit = () => {
      model.showEdit = false
    }

    model.showTasks = (project) => {
      model.visible = true
      model.p = project
      model.t = model.projects[model.projects.indexOf(project)].tasks
    }

    model.hideTasks = (project) => {
      model.visible = false
    }
  }
}

export default ProjectController;
