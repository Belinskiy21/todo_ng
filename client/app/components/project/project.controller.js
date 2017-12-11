class ProjectController {
  constructor() {
    let model = this;

    model.projects = [{'id': 1,'title': 'My first project'},
    {'id': 2, 'title': 'My second project'},
    {'id': 3, 'title': 'My another project'}]



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


    model.Save = function ()
    {
      model.newProject = { "id": model.helpEdit.id, "title": model.editTitle }
      model.editTitle = model.projects.splice( model.projects.indexOf(model.helpEdit), 1 )
      model.projects.push(model.newProject)
      model.editTitle=""
      model.showEdit = false
      console.log(model.editTitle)
    }

  }
}

export default ProjectController;
