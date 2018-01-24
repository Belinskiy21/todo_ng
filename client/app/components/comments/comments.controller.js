class CommentsController {
  constructor(Upload, CommService) {
    'ngInject';
    this.Upload = Upload;
    this.CommService = CommService;
    this.name = 'comments';
    this.date = new Date();
    this.comment = new this.CommService()

  }

  saveComment(comment){
    let self = this;
    if(!this.comment.text || this.comment.text === '') { return }
    this.comment.$load({ project_id: this.projectid, task_id: this.taskid }, function(){
      self.comments = self.CommService.query({ project_id: self.projectid, task_id: self.taskid })
      self.comment = new self.CommService()
      self.cancelComment()
    })
  }

  cancelComment() {
    this.comment.text = ''
  }

  upload(file, comment) {
        this.Upload.upload({
            url: './img',
            data: {file: file}
        })
        this.comment.file = file
    }


}

export default CommentsController;
