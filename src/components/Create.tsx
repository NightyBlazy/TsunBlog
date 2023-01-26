import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const Create = () => {

  const [title , setTitle] = useState('');
    const [body, setBody] =useState('');
    const [author, setAuthor] =useState('');

    const handlePost = (e : React.FormEvent) => {
        e.preventDefault();

        const formdata = {title: title, body: body, author: author};

        console.log(formdata)

        const url = "http://localhost:4300/blogadd"

        axios.post(url, JSON.stringify(formdata),{
            headers: {'Content-Type': 'application/json'}
        }).then(() => {
            console.log("Post Successfull!")
        })
    }




  return (
    <div>Create</div>
  )
}

export default Create