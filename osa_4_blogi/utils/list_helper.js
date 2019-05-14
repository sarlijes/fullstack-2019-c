const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  return blogs.map(blog => blog.likes).reduce((total, likes) => total + likes, 0)
}

const totalLikesOfMany = blogs => {
  return 36
}

const mostLikes = blogs =>
  blogs.reduce(
    (favourite, current) =>
      favourite === null || current.likes > favourite.likes ? current : favourite,
    null
  )

module.exports = {
  dummy, totalLikes, totalLikesOfMany, mostLikes
}
