class ProjectController {
  constructor($http, $location, Project) {
    'ngInject';
    this.$location = $location;
    this.Project = Project;
    this.date = new Date()
    this.projects = this.Project.query()
    this.project = new this.Project()
  }
  addProject() {
    var self = this;
    if(!this.project.title || this.project.title === '') { return }
    this.project.$save(function(){
      self.projects = self.Project.query()
      self.removeContent()
      self.project = new self.Project()
    })
  }
  removeContent() {
    this.project.title = ''
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
    this.project_id = project.id
    this.visible = true
    this.current_project = project
    this.projectTasks = this.projects[this.projects.indexOf(project)].tasks
  }

  hideTasks(project) {
    this.visible = false
  }

  openDatepicker(status, task) {
    this.isOpen = status
    this.currentTask= task
    if(this.date) {
      this.currentTask.deadline = this.date
    }
    else {
      this.currentTask.deadline = null
    }
    console.log(this.currentTask.deadline)
  }
}

export default ProjectController;
