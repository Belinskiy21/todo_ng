class TaskController {
  constructor($uibModal) {
    'ngInject';
    this.$uibModal = $uibModal;

    this.name = 'task';

  }

  // $onInit() {
  //   console.log(this.tasks);
  // }
  addTask() {
    if(!this.taskTitle || this.taskTitle === '') { return }
    this.tasks.push({ id: this.tasks.length + 1, title: this.taskTitle })
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
}

export default TaskController;
