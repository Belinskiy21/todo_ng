let TaskFactory = function ($resource, API_URL) {
  'ngInject';
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
