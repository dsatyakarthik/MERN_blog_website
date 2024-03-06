import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react'
import { Link, redirect, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';

const PostPage = () => {
    const [postInfo,setPostInfo] = useState(null);
    const {userInfo} = useContext(UserContext);
    const [redirect,setRedirect] = useState(false);
    const {id} = useParams();
    const navigate=useNavigate()
    

    useEffect(()=>{
        fetch(`http://localhost:4000/post/${id}`)
        .then(response =>{
            response.json().then(postInfo => {
                setPostInfo(postInfo);
            });
        });
    },[]);

    if (!postInfo) return '';
    
    const deletePost=()=>{
      fetch(`http://localhost:4000/post/${id}`,{
        method:'DELETE'
      }).then(
        navigate("/")
      )
        
      }
    
    

  return (
    <div className='post-page'>
        <h1>{postInfo.title}</h1>
        <time>{format(new Date(postInfo.createdAt),'MMM d,yyyy HH:mm')}</time>
        <div className='author'>by @{postInfo.author.username}</div>
        
        
                  {userInfo.id === postInfo.author._id && (
            <div className='edit-del'>
              <div className='edit-row'>

                <Link className='edit-btn' to={`/edit/${postInfo._id}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>

                 Edit this post
                </Link>  
               
             </div>


               <div className='delete-row' >
                <button className='delete-btn ' onClick={deletePost}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                   <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                   <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                  </svg>
                </button>
              
               </div>
            </div>
          
           
        )}
            
        
        
        <div className='image'>
        <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
        </div>
      
      <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}} />
    </div>
  )
}

export default PostPage

