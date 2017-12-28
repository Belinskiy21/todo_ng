class CommentsController {
  constructor() {
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
}

export default CommentsController;
