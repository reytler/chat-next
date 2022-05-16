import React,{useEffect} from 'react'
import Style from './index.module.css'

const Message = ({nick,message,users})=>{
    useEffect(()=>{
        if(user != {}){
            console.log('User aqui: ',user)
        }
    },[user])

    let user = {}
    user = users.filter((user)=>{return user.nick === nick})
    return(
        <span>
            <b style={{color:`${user[0] != {} && user[0]?.nick == nick ?user[0].cor:'white'}`}}>{nick}:</b> {message}
        </span>
    )
}

export default Message;