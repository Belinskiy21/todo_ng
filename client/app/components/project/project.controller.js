class ProjectController {
  constructor($http, $location, Project, Task) {
    'ngInject';
    this.API_URL = 'http://rocky-cove-79647.herokuapp.com';
    this.$http = $http;
    this.$location = $location;
    this.Project = Project;
    this.Task = Task;
    this.deadline = new Date()
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
    var self = this;
    this.isOpen = status
    if(this.deadline && status === false ) {
      task.deadline = this.deadline.toDateString()
      this.$http.put(this.API_URL + `/api/v1/projects/${this.project_id}/tasks/${task.id}`,
        { deadline: task.deadline } ).then(
          (response) => {
          self.projectTasks = self.Task.query({ project_id: self.project_id})
          },
          (response) => { self.message = response.data.message }
        )
    }
    else {
      task.deadline = null
    }
  }
}

export default ProjectController;
