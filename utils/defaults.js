const todos = [
  {
    reqName: "Fetch all to-do's",
    reqUrl: '{{URL}}/todos',
    reqMethod: 'GET',
    reqHeaders: {},
    reqQueries: {},
    proxy: true,
    reqBody: {},
  },
  {
    reqName: 'Fetch to-do by id',
    reqUrl: '{{URL}}/todos/{{ID}}',
    reqMethod: 'GET',
    reqHeaders: {},
    reqQueries: {},
    proxy: true,
    reqBody: {},
  },
  {
    reqName: 'Create new to-do',
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
    reqName: 'Fetch all comments for the post',
    reqUrl: '{{URL}}/posts/{{ID}}/comments',
    reqMethod: 'GET',
    reqHeaders: {},
    reqQueries: {},
    proxy: true,
    reqBody: {},
  },
  {
    reqName: 'Fetch post by id',
    reqUrl: 'https://jsonplaceholder.typicode.com/posts/7',
    reqMethod: 'GET',
    reqHeaders: {},
    reqQueries: {},
    proxy: true,
    reqBody: {},
  },
  {
    reqName: 'Delete post',
    reqUrl: 'https://jsonplaceholder.typicode.com/post/7',
    reqMethod: 'DELETE',
    reqHeaders: {},
    reqQueries: {},
    proxy: true,
    reqBody: {},
  },
]

const defaults = { todos, posts }

module.exports = defaults
