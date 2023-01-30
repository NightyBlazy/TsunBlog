import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Blogs = () => {
  
   async function blogFetch() {
    return (await axios.get("http://localhost:4300/getblogs")
    .then((res) => res.data)
    .catch((err) => {
      console.log(err)
    }))
  }

  const blogQuery = useQuery({
    queryKey: ['all-blogs'],
    queryFn: blogFetch
  })

  if (blogQuery.status === "loading") return <h1>Loading...</h1>
  if (blogQuery.status === "error") {
    return <h1>{JSON.stringify(blogQuery.error)}</h1>
  }

  
  
  return (
    <div>
      <h1>Tsun Blogs</h1>
      <div className="wrapper">
        {blogQuery.data.map((post:any) => (
          <Link to={`/blog/${post._id}`} key={post._id}>
          <div className="card">
            <h3 className='card__h3'>{post.title}</h3>
            <p className='card__p'>{post.preview}</p>
            <div className="card__footer">
              <small className='card__auth'>By: {post.author}</small>
              <small className='card__date'>Date: <span className='nowrap'>{post.date}</span></small>
            </div>
          </div>
          </Link>
        ))}
        </div>
    </div>
  )
}



export default Blogs