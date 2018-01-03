class SignupController {
  constructor() {
    this.name = 'signup';
  }
  signup() {
    if(this.password === this.confirmPassword )
    console.log('send request to server...  ')
    else
    alert('Not correct password confirmation!')
  }
}

export default SignupController;
