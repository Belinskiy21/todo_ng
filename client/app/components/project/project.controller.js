class ProjectController {
  constructor($http, $location, Project, Task) {
    'ngInject';
    this.$location = $location;
    this.Project = Project;
    this.Task = Task;
    this.date = new Date()
    this.projects = this.Project.query()
    this.project = new this.Project()
  }
  addProject() {
    var self = this;
    if(!this.project.title || this.project.title === '') { return }
    this.project.$save(function(){
      self.projects = self.Project.query()
      self.project = new self.Project()
      self.removeContent()
    })
  }
  removeContent() {
    this.project.title = ''
  }
  deleteProject(project){
    var self = this;
    if (confirm("sure to delete project?"))
      project.$delete({ id: project.id },function(){
        self.projects = self.Project.query()
      })
  }
  editProject(project) {
    this.showEdit = true
    this.project.title = project.title
    this.current_id = project.id
    // this.projectTasks = project.tasks
  }
  Save() {
    var self = this;
    if(!this.project.title || this.project.title === '') { return }
    this.project.$update({ id: this.current_id },function(){
      self.projects = self.Project.query()
      self.removeContent()
      self.showEdit = false
    })
  }
  cancelEdit() {
    this.showEdit = false
    this.removeContent()
  }

  showTasks(project) {
    this.project_id = project.id
    this.visible = true
    this.current_project = project
    this.projectTasks = this.Task.query({ project_id: project.id })
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
