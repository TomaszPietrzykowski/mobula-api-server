const todos = [
  {
    reqName: "Get all TODO's",
    reqUrl: '{{URL}}/todos',
    reqMethod: 'GET',
    reqHeaders: {},
    reqQueries: {},
    proxy: true,
    reqBody: {},
  },
  {
    reqName: 'Get TODO by ID',
    reqUrl: '{{URL}}/todos/{{ID}}',
    reqMethod: 'GET',
    reqHeaders: {},
    reqQueries: {},
    proxy: true,
    reqBody: {},
  },
  {
    reqName: 'Create new TODO',
    reqUrl: 'https://jsonplaceholder.typicode.com/todos',
    reqMethod: 'POST',
    reqHeaders: {
      'Content-Type': 'application/json',
    },
    reqQueries: {},
    proxy: true,
    reqBody: {
      userId: 1,
      title: 'Walk the dog',
      completed: false,
    },
  },
]

const posts = [
  {
    reqName: 'Get all posts',
    reqUrl: 'https://jsonplaceholder.typicode.com/posts',
    reqMethod: 'GET',
    reqHeaders: {},
    reqQueries: {},
    proxy: true,
    reqBody: {},
  },
  {
    reqName: 'Get post by ID',
    reqUrl: 'https://jsonplaceholder.typicode.com/posts/7',
    reqMethod: 'GET',
    reqHeaders: {},
    reqQueries: {},
    proxy: true,
    reqBody: {},
  },
  {
    reqName: 'Create new TODO',
    reqUrl: 'https://jsonplaceholder.typicode.com/post/7',
    reqMethod: 'DELETE',
    reqHeaders: {},
    reqQueries: {},
    proxy: false,
    reqBody: {},
  },
]

const defaults = { todos, posts }

module.exports = defaults
