class TaskController {
  constructor($uibModal, $http, Comments, Task) {
    'ngInject';

    this.$uibModal = $uibModal;
    this.$http = $http;
    this.Comments = Comments;
    this.Task = Task;
    this.API_URL = 'http://rocky-cove-79647.herokuapp.com';
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
        (response) => { self.tasks = self.Task.query({ project_id: self.projectid}) },
        (response)  => { console.log(response.data) }
      )
    }

  openComments(task) {
    let self = this;
    this.$http.get(this.API_URL + `/api/v1/projects/${this.projectid}/tasks/${task.id}/comments`).then(
      (response) => {
        this.comments = response.data
        this.openModal(task)
      }
    )
  }

  openModal(task) {
    this.Comments.comments = this.comments
    this.Comments.projectid = this.projectid
    this.Comments.taskid = task.id
    this.$uibModal.open({
      templateUrl: 'modal.html',
      controller: ['$uibModalInstance','$scope', 'Comments', 'CommService', Controller]
    })
    function Controller(uibModalInstance, scope, Comments, CommService) {
      scope.close = () => {
        uibModalInstance.close();
      }
      scope.comments = Comments.comments;
      scope.projectid = Comments.projectid;
      scope.taskid = Comments.taskid;
      scope.comment = new CommService();

      scope.deleteComment = (comment) => {
        var self = scope;
        scope.comment.$delete({ project_id: scope.projectid , task_id: scope.taskid, id: comment.id }, function() {
          self.comments = CommService.query({ project_id: self.projectid, task_id: self.taskid })
        })
      }
    }
  }

  changeStatus(task) {
    let self = this;
    this.$http.put(this.API_URL + `/api/v1/projects/${this.projectid}/tasks/${task.id}`,
      task ).then(
        (response) => { self.tasks = self.Task.query({ project_id: self.projectid}) },
        (response)  => { console.log(response.data) }
      )
  }

}

export default TaskController;
