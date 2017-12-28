class TaskController {
  constructor($uibModal, Comments) {
    'ngInject';
    this.$uibModal = $uibModal;
    this.Comments = Comments;

    this.myDate = new Date();
    this.open = true;
    this.close = false;

  }

  // $onInit() {
  //   console.log(this.tasks);
  // }
  addTask() {
    if(!this.taskTitle || this.taskTitle === '') { return }
    this.tasks.push({ id: this.tasks.length + 1, title: this.taskTitle , deadline: {}, done: false, comments: [] })
    this.taskTitle = ''
  }
  removeContent() {
    this.taskTitle = ''
  }

  deleteTask(task){
    if (confirm("sure to delete task?"))
    this.tasks.splice(this.tasks.indexOf(task), 1 )
  }
  editTask(task) {
    this.showField = true
    this.tTitle = task.title
    this.helpTask = task
  }
  cancelEdit() {
    this.showField = false
  }
  Save() {
    this.newTask = { "id": this.helpTask.id, "title": this.tTitle}
    this.tasks.splice(this.tasks.indexOf(this.helpTask), 1)
    this.tasks.push(this.newTask)
    this.showField = false
  }

  Up(task) {
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

  Down(task) {
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

  openModal(task) {
    this.Comments.comments = task.comments
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
