class SignupController {
  constructor($http,$location) {
    'ngInject';

    this.$http = $http;
    this.$location = $location;
    this.API_URL = 'http://rocky-cove-79647.herokuapp.com';
  }

  signup() {
    var self = this;

    if (this.password === this.confirmPassword) {
      this.promise = this.$http.post(
        this.API_URL + '/signup',
        { email: this.email, password: this.password, password_confirmation: this.confirmPassword }
      ).then(
        (response) => {
          localStorage.setItem('authToken', response.data.auth_token)
          self.getProjects()
        },
        (response) => {
          this.message = response.data.message
        }
      )
    } else {
      alert('Not correct password confirmation!')
    }
  }

  getProjects() {
    this.$http.get(this.API_URL + '/api/v1/projects')
    this.$location.path('/projects')
  }
}

export default SignupController;
