class ProjectController {
  constructor($http, $location, API_URL, Project, Task, $timeout) {
    'ngInject';
    this.$timeout = $timeout;
    this.API_URL = API_URL;
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
    this.project.$save(function(response){
      self.projects = [...self.projects, response]
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
    this.task = task
    this.isOpen = status
    if(this.deadline && status === false ) {
      task.deadline = this.deadline.toDateString()
      this.$http.put(this.API_URL + `/api/v1/projects/${this.project_id}/tasks/${task.id}`,
        { deadline: task.deadline } )
    }
    else {
      task.deadline = null
    }
  }

  saveDate() {
    this.isOpen = false
    this.task.deadline = this.deadline.toDateString()
    this.$http.put(this.API_URL + `/api/v1/projects/${this.project_id}/tasks/${this.task.id}`,
      { deadline: this.task.deadline } )
  }

  hideDatepicker() {
    this.isOpen = false
    this.deadline = null
    this.$http.put(this.API_URL + `/api/v1/projects/${this.project_id}/tasks/${this.task.id}`,
      { deadline: this.deadline } )
  }

  showMessage(message){
    this.message = message
    this.hideMessage()
  }

  hideMessage() {
    let self = this;
      this.$timeout(() => {
        self.message = null;
      },
      5000
    )
  }
}

export default ProjectController;
