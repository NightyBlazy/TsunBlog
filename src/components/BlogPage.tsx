import React from 'react'
import axios from 'axios'
import { useParams, useNavigate} from 'react-router-dom'
import { useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import TrashCan from '../assets/trash-bin.svg'
import '../css/BlogPage.css'

const BlogPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient()


    async function oneFetch() {
        return (await axios.get(`http://localhost:4300/getblog/${id}`)
        .then((res) => res.data)
        .catch((err) => {
          console.log(err)
        }))
      }
    
    async function oneDelete() {
      return (await axios.delete(`http://localhost:4300/blogdelete/${id}`)
      .then((res) => res.data)
      .catch((err) => {
        console.log(err)
      })
      )
    }

    const oneQuery = useQuery({
      queryKey: ['one-blogs'],
      queryFn: oneFetch
    })

    const deleteMutation = useMutation({
      mutationFn: oneDelete,
      onSuccess: data => {
        console.log("Post Deletion Success!")
        queryClient.setQueryData(['all-blogs'],data)
      }
    })

    if (oneQuery.status === "loading") return <h1>Loading...</h1>
    if (oneQuery.status === "error") {
    return <h1>{JSON.stringify(oneQuery.error)}</h1>
  }


  return (
    <main className='main__blogpage'>
      <section className="blogpage__header">
        <h2 className='blogpage__h2'>{oneQuery.data.title}</h2>
        <small className='blogpage__author'>{oneQuery.data.author}</small>
        <small className='blogpage__date'>{oneQuery.data.date}</small>
        <button className='blogpage__delete' onClick={() => {
          deleteMutation.mutate();
          navigate("/");
        }}>
        <img className='blogpage__delete' src={TrashCan} alt="Delete" />
        </button>
      </section>
      <section className='blogpage__body'>
      <p className='blogpage__p'>{oneQuery.data.body}</p>
      </section> 
    </main>
  )
}

export default BlogPage