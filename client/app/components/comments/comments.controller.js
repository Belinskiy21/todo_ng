class CommentsController {
  constructor(Upload) {
    'ngInject';
    this.Upload = Upload;
    this.name = 'comments';
    this.date = new Date();

  }

  saveComment(comment){
    if(!this.comment || this.comment === '') { return }
    this.comments.push({ id: this.comments.length + 1, text: this.comment , create_at: this.date.toLocaleDateString(), file: ''})
    this.comment = ''
  }

  cancelComment() {
    this.comment = ''
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
