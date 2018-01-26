class CommentsController {
  constructor(Upload, CommService, $http) {
    'ngInject';
    this.$http = $http;
    this.Upload = Upload;
    this.CommService = CommService;
    this.API_URL = 'http://localhost:3000';
    this.name = 'comments';
    this.date = new Date();
    this.comment = {};
    this.comment = new this.CommService()
    this.message_file = 'Comment is require, before save file!'

  }

  saveComment(comment){
    let self = this;
    if (this.comment.file) {
      this.Upload.upload({
        data: { file: this.comment.file, text: this.comment.text },
        url: this.API_URL + `/api/v1/projects/${this.projectid}/tasks/${this.taskid}/comments`
      }).then(
        result => { console.Log('success') }
      )
    }
    else {
      this.comment.$load({ project_id: this.projectid, task_id: this.taskid }, function(){
        self.comments = self.CommService.query({ project_id: self.projectid, task_id: self.taskid })
        self.comment = new self.CommService()
        self.cancelComment()
      })
    }
  }

  cancelComment() {
    this.comment.text = ''
    this.comment.file = null
  }

}

export default CommentsController;
