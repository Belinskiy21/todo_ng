class TaskController {
  constructor($uibModal, $http, Comments, Task) {
    'ngInject';

    this.$uibModal = $uibModal;
    this.$http = $http;
    this.Comments = Comments;
    this.Task = Task;
    this.API_URL = 'http://localhost:3000';
    this.task = new this.Task()
    this.myDate = new Date();
    this.open = true;
    this.close = false;

  }

  addTask() {
    let self = this;
    if(!this.task.title || this.task.title === '') { return }
    this.task.$load({ project_id: this.projectid }, function() {
      self.tasks = self.Task.query({ project_id: self.projectid })
      self.task = new self.Task()
      self.removeContent()
    })
  }

  removeContent() {
    this.task.title = ''
  }

  deleteTask(task){
    let self = this;
    if (confirm("sure to delete task?"))
    task.$delete({ project_id: this.projectid , id: task.id }, function(){
        self.tasks = self.Task.query({ project_id: self.projectid })
    })
  }
  editTask(task) {
    this.showField = true
    this.task.title = task.title
    this.helpTask = task
  }
  cancelEdit() {
    this.showField = false
    this.removeContent()
  }
  Save() {
    let self = this;
    if(!this.task.title || this.task.title === '') { return }
    this.task.$update({ project_id: this.projectid, id: this.helpTask.id },function(){
      self.tasks = self.Task.query({ project_id: self.projectid })
      self.removeContent()
      self.showField = false
    })
  }

  Move(task, direction) {
    let self = this;
    let params = { move : direction }
    this.$http.put(this.API_URL + `/api/v1/projects/${this.projectid}/tasks/${task.id}`,
      params ).then(
        (response) => { this.tasks = self.Task.query({ project_id: self.projectid}) },
        (response)  => { console.log(response.data) }
      )
    }

  openComments(task) {
    let self = this;
    this.$http.get(this.API_URL + `/api/v1/projects/${this.projectid}/tasks/${task.id}/comments`).then(
      (response) => {
        self.comments = response.data
        self.openModal()
      }
    )
  }

  openModal() {
    this.Comments.comments = this.comments
    this.$uibModal.open({
      templateUrl: 'modal.html',
      controller: ['$uibModalInstance','$scope', 'Comments', Controller]
    })
    function Controller(uibModalInstance, scope, Comments) {
      scope.close = () => {
        uibModalInstance.close();
      }
      scope.comments = Comments.comments;

      scope.deleteComment = (comment) => {
        scope.comments.splice(scope.comments.indexOf(comment), 1);
      }
    }
  }

}

export default TaskController;
