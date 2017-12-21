class ProjectController {
  constructor() {

    this.projects = [
      {
        'id': 1,
        'title': 'My first project',
        'tasks': [ {'id': 1, 'title': 'first task'}, {'id': 2, 'title': 'second task'},
{ 'id': 3, 'title': 'one more task'} ]
      },
      {
        'id': 2,
        'title': 'My second project',
        'tasks': [ { 'id': 1, 'title': '2 pr first task'} ,{ 'id': 2, 'title': '2 pr second task'},
{ 'id': 3, 'title': '2 pr one more task'} ]
      },
      {
        'id': 3,
        'title': 'My another project',
        'tasks': [ { 'id': 1, 'title': '3 pr first task'}, { 'id': 2, 'title': '3 pr second task'},
{'id': 3, 'title': '3 pr one more task'} ]
      }
    ]
  }
  addProject() {
    if(!this.title || this.title === '') { return }
    this.projects.push({title: this.title})
    this.title = ''
  }
  removeContent() {
    this.title = ''
  }
  deleteProject(project){
    if (confirm("sure to delete project?"))
    this.projects.splice(this.projects.indexOf(project), 1 )
  }
  editProject(project) {
    this.showEdit = true
    this.editTitle = project.title
    this.helpEdit = project
    this.projectTasks = project.tasks
  }
  Save() {
    this.newProject = { "id": this.helpEdit.id, "title": this.editTitle,
"tasks": this.projectTasks }
    this.editTitle = this.projects.splice( this.projects.indexOf(this.helpEdit), 1 )
    this.projects.push(this.newProject)
    this.editTitle=""
    this.showEdit = false
  }
  cancelEdit() {
    this.showEdit = false
  }

  showTasks(project) {
    this.visible = true
    this.project = project
    this.projectTasks = this.projects[this.projects.indexOf(project)].tasks
  }

  hideTasks(project) {
    this.visible = false
  }

}

export default ProjectController;
