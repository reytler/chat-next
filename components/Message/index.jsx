import React,{} from 'react'
import Style from './index.module.css'

const Message = ({nick,message})=>{
    return(
        <span>
            <b>{nick}:</b> {message}
        </span>
    )
}

export default Message;