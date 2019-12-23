# restful-api-blog
A simple RestFul Api blog with express and semantic ui MEN-Stack

## CRUD Application

| Name   |      Path      |  HTTP Verb | Purpose |  Mongoose Method |
|--------|:--------------:|-----------:|--------:|-----------------:|
| Index  |  /blogs        | GET        | List all blog post | Blog.find()
| New  |  /blogs/new       | GET        | Show a form to create a new post | N/A
| Create  |  /blogs        | POST        | Create a new blog post | Blog.create()
| Show  |  /blogs/:id/show       | GET        | Show info about a spicific post | Blog.findById()
| Edit  |  /blogs/:id/edit       | GET        | Show edit form for a post | Blog.findById()
| Update  |  /blogs/:id        | PUT        | Update a particular blog, then redirect to blogs | Blog.findByIdAndUpdate()
| Destroy  |  /blogs/:id       | DELETE        | Delete a particular post, then redirect to blogs | Blog.findByIdAndRemove()


### Screenshot
![app image](https://i.ibb.co/tLcjTfG/Screenshot-from-2019-12-23-11-32-28.png)
