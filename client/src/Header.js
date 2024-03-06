import { useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

export default function Header(){
  const {setUserInfo,userInfo} = useContext(UserContext);
  const navigate= useNavigate()
  useEffect(()=>{
    fetch('http://localhost:4000/profile',{
      credentials: 'include',
    }).then(response =>{
      response.json().then(userInfo =>{
        setUserInfo(userInfo);
      })
    })
  },[]);

  const logout=()=>{
    fetch('http://localhost:4000/logout',{
      credentials: 'include',
      method:'POST',
    })
    .then(
      navigate("/")
    )
    .then(setUserInfo(null))}

  const username = userInfo?.username;
  

    return(
    <header>
    <Link to="/"  className="logo">Home</Link>
    <nav>
      {username &&(
        <>
        <Link to='/create'>Create new Blog</Link>
        <a onClick={logout}>Logout</a>
        </>
      )}
      {!username &&(
        <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        </>
      )}
       
    </nav>
  </header>
    );

}