import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import '../css/Create.css'

const Create = () => {

    const [title , setTitle] = useState('');
    const [body, setBody] =useState('');
    const [author, setAuthor] =useState('');
    const navigate = useNavigate();
    const queryClient = useQueryClient()


    function createPost(){
      const formdata = {title: title, body: body, author: author}
      return axios.post("http://localhost:4300/blogadd",formdata ,{
      headers: {'Content-Type': 'application/json'}}).then((res) => res.data)
    }


    const createMutation = useMutation(createPost,{
      onSuccess: (data) =>{
        console.log("Post success!");
        queryClient.setQueryData(['all-blogs'],data);
      }
    })

  return (
    <main className='main__form'>
      <h2>Create a Blog Post!</h2>
      <form className='form' onSubmit={(e) => {
        e.preventDefault();
        createMutation.mutate()
        navigate("/");
      }}>
        <div className="form__group">
          <label className='form__label'>Title:</label>
          <input required className='form__input' type="text" 
          placeholder='Enter your title here' 
          value={title}
          onChange={(e) => {setTitle(e.target.value)}}
          />
        </div>
        <div className="form__group">
          <label className='form__label'>Body:</label>
          <textarea required className='form__textarea'
          placeholder='Enter your blog post here' 
          value={body}
          onChange={(e) => {setBody(e.target.value)}}
          />
        </div>
        <div className="form__group">
          <label className='form__label'>Author:</label>
          <input required className='form__input' type="text" 
          placeholder='Which name are you gonna use on your post?'
          value={author}
          onChange={(e) => {setAuthor(e.target.value)}}
          />
        </div>
        <button className='form__button' type='submit'
        disabled={title==="" && body==="" && author===""}>
        Submit
        </button>
      </form>
    </main>
  )
}

export default Create