class TaskController {
  constructor($uibModal, $http, Comments, Task, API_URL) {
    'ngInject';

    this.$uibModal = $uibModal;
    this.$http = $http;
    this.Comments = Comments;
    this.Task = Task;
    this.API_URL = API_URL;
    this.task = new this.Task()
    this.myDate = new Date();
    this.open = true;
    this.close = false;
    this.today = this.myDate.setHours(0, 0, 0, 0);

  }

  addTask() {
    let self = this;
    if(!this.task.title || this.task.title === '') { return }
    this.task.$load({ project_id: this.projectid }, function(response) {
      console.log(response)
      self.tasks = [...self.tasks, response]
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
    task.$delete({ project_id: this.projectid , id: task.id }, function(response){
        console.log(response)
        self.tasks.splice(self.tasks.indexOf(task), 1 )
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
        () => {
          this.up_task = this.tasks[this.tasks.indexOf(task) - 1]
          this.down_task = this.tasks[this.tasks.indexOf(task) + 1]
          this.helper = 0
          if(task.position > 1 && direction == 'move_higher') {
            this.helper = task.position
            task.position = this.up_task.position
            this.up_task.position = this.helper
            this.UpIndex(task)
          }
          else if (task.position < this.tasks.length && direction == 'move_lower') {
            this.helper = task.position
            task.position = this.down_task.position
            this.down_task.position = this.helper
            this.DownIndex(task)
          }
          else {
            return this.tasks
          }
        }
      )
    }

  UpIndex(task) {
    this.oldIndex = this.tasks.indexOf(task)
    if (this.oldIndex > 0){
      this.newIndex = this.oldIndex - 1
      this.tasksClone = this.tasks.slice()
      this.removedTask = this.tasksClone.splice(this.oldIndex, 1)
      this.tasksClone.splice(this.newIndex, 0, this.removedTask[0])
      this.tasks = this.tasksClone
      return this.tasks
    }
    return this.tasks
  }

  DownIndex(task) {
    this.oldIndex = this.tasks.indexOf(task)
    if (this.oldIndex < this.tasks.length){
      this.newIndex = this.oldIndex + 1
      this.tasksClone = this.tasks.slice()
      this.removedTask = this.tasksClone.splice(this.oldIndex, 1)
      this.tasksClone.splice(this.newIndex, 0, this.removedTask[0])
      this.tasks = this.tasksClone
      return this.tasks
    }
    return this.tasks
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
        setTimeout(() => {
          self.checkComplete()
          },
        500
      )
    )
  }

  checkComplete(){
    let self = this;
    this.Task.query({ project_id: this.projectid }, function(data) {
      console.log(data)
      if((data.length > 0) && !(data.map(task => task.done).includes(false))){
          self.onShowMessage({message: 'Well Done! You’re successfully completed all tasks' })
        }
      }
    )
  }

}

export default TaskController;
