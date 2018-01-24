let TaskFactory = function ($resource) {
  'ngInject';
  let API_URL = 'http://localhost:3000';
  return $resource(
    API_URL + '/api/v1/projects/:project_id/tasks/:id', { project_id: '@project_id', id: '@id' }, {
      update: {
        method: 'PUT', params: {}
      },
      load: {
        method: 'POST', params: {}
      }
    }
  )
};
export default TaskFactory;
