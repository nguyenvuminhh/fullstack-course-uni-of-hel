const { Blog } = require("./models");

const main = async () => {
    const blogs = await Blog.findAll()
    for (let i = 0; i < blogs.length; i++) {
        const blog = blogs[i]
        console.log(`${blog.author}: \'${blog.title}\', ${blog.likes} likes`)
    }
}

main()