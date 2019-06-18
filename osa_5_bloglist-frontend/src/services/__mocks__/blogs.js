const blogs = [
  {
    _id: '5cff9a5ce6647707d8e7aafb',
    title: 'kesäloma',
    author: 'olli',
    url: 'www://kesä/',
    likes: 0,
    __v: 0,
    user: {
      id: '5ce67f8f16a32a300ce68d15',
      username: 'owner',
      name: 'owner'
    }
  },
  {
    _id: '5d00afb17d66e209f162d151',
    title: 'lomalla',
    author: 'simo',
    url: 'www ',
    likes: 0,
    __v: 0,
    user: {
      id: '5ce663984a93f01ea59fb796',
      username: 'owner',
      name: 'owner'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }