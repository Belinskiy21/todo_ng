class LoginController {
  constructor($http, $location, URL) {
    'ngInject';
    this.$http = $http;
    this.$location = $location;
    this.URL = URL;
    this.API_URL = this.URL;
  }

  login() {
    var self = this;
    this.promise = this.$http.post(
      this.API_URL + '/auth/login',
      { email: this.email, password: this.password }
    ).then(
      (response) => {
        localStorage.setItem('authToken', response.data.auth_token)
        self.getProjects()
      },
      (response) => {
        this.message = response.data.message
      }
    )
  }

  getProjects() {
    this.$http.get(this.API_URL + '/api/v1/projects')
    this.$location.path('/projects')
  }
}

export default LoginController;
