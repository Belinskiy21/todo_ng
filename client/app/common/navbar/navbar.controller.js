class NavbarController {
  constructor($location) {
    'ngInject';
    this.$location = $location;
    this.name = 'navbar';
  }
  isSignedIn() {
    return (localStorage.getItem('authToken')) ? true : false;
  }
  
  logout() {
    localStorage.removeItem('authToken')
    this.$location.path('/login')
  }
}

export default NavbarController;
