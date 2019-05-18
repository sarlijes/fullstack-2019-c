const dummy = blogs => {
  return 1
}

const totalLikesOfMany = blogs => {
  return blogs.map(blog => blog.likes).reduce((total, likes) => total + likes, 0)
}

const mostFavourite = blogs =>
  blogs.reduce((favourite, current) =>
    favourite === null || current.likes > favourite.likes ? current : favourite, null
  )

module.exports = {
  dummy, totalLikesOfMany, mostFavourite
}