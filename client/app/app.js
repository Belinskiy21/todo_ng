import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import uiBootstrap from 'angular-ui-bootstrap';
import ngMaterial from 'angular-material';
import ngFileUpload from 'ng-file-upload';
import ngResource from 'angular-resource';
import 'angular-material/angular-material.css';
// import 'normalize.css';

angular.module('app', [
    uiRouter,
    uiBootstrap,
    ngMaterial,
    ngFileUpload,
    ngResource,
    Common,
    Components
  ])
  .factory('authInterceptor', function($location, $q) {
    'ngInject';

    return {
      request: function(config) {
        config.headers = config.headers || {};
        if(localStorage.authToken) {
          config.headers['Authorization'] = 'Bearer ' + localStorage.authToken;
        }
        return config;
      },
      responseError: function (response) {
        if(response.status === 401){
          $location.path('/login');
        }
        return $q.reject(response);
      }
    }

  })
  .config(($locationProvider,$httpProvider) => {
    "ngInject";
    $httpProvider.interceptors.push('authInterceptor');
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');
  })

  .component('app', AppComponent);
