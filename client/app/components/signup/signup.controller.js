class SignupController {
  constructor($http,$location) {
    'ngInject';
    this.$http = $http;
    this.$location = $location;
    this.API_URL = 'http://localhost:3000';
  }
  signup() {
    if(this.password === this.confirmPassword )
    this.$http.post( this.API_URL + '/signup',
{ email: this.email, password: this.password, password_confirmation: this.confirmPassword}
).then(
        response => localStorage.setItem('auth_token', response.data.auth_token),
        this.getProjects()
      )
    else
    alert('Not correct password confirmation!')
  }

  getProjects() {
    // this.$http.get(this.API_URL + 'api/v1/projects')
    this.$location.path('/projects')
  }
}

export default SignupController;
