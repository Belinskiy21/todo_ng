class ProjectController {
  constructor() {
    this.date = new Date()
    this.projects = [
//       {
//         'id': 1,
//         'title': 'My first project',
//         'tasks': [ {'id': 1, 'title': 'first task', 'deadline': {}, 'done': false,
// 'comments': [{ 'id': 1, 'text': 'first comment for first task', 'file': '', 'create_at': '27.12.2017'},
// { 'id': 2, 'text': 'second comment for first task', 'file': '', 'create_at': '27.12.2017'},
// { 'id': 3, 'text': 'third comment for first task', 'file': '', 'create_at': '27.12.2017'}] },
// {'id': 2, 'title': 'second task', 'deadline': {}, 'done': false,
// 'comments': [{ 'id': 1, 'text': 'first comment for 2 task', 'file': '', 'create_at': '27.12.2017'},
// { 'id': 2, 'text': 'second comment for 2 task', 'file': '', 'create_at': '27.12.2017'}] },
// { 'id': 3, 'title': 'one more task', 'deadline': {}, 'done': false,
// 'comments': [{ 'id': 1, 'text': 'one comment for one more task', 'file': '', 'create_at': '27.12.2017'}] } ]
//       },
//       {
//         'id': 2,
//         'title': 'My second project',
//         'tasks': [ { 'id': 1, 'title': '2 pr first task', 'deadline': {}, 'done': false,
// 'comments': [{ 'id': 1, 'text': '', 'file': ''}] },
// { 'id': 2, 'title': '2 pr second task', 'deadline': {}, 'done': false,
// 'comments': [{ 'id': 1, 'text': '', 'file': ''}] },
// { 'id': 3, 'title': '2 pr one more task', 'deadline': {}, 'done': false,
// 'comments': [{ 'id': 1, 'text': '', 'file': ''}] } ]
//       },
//       {
//         'id': 3,
//         'title': 'My another project',
//         'tasks': [ { 'id': 1, 'title': '3 pr first task', 'deadline': {}, 'done': false,
// 'comments': [{ 'id': 1, 'text': '', 'file': ''}] },
// { 'id': 2, 'title': '3 pr second task', 'deadline': {}, 'done': false,
// 'comments': [{ 'id': 1, 'text': '', 'file': ''}] },
// {'id': 3, 'title': '3 pr one more task', 'deadline': {}, 'done': false,
// 'comments': [{ 'id': 1, 'text': '', 'file': ''}] } ]
//       }
    ]
  }
  addProject() {
    if(!this.title || this.title === '') { return }
    this.projects.push({id: this.projects.length + 1, title: this.title, tasks: []})
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
