import React,{useEffect, useState} from 'react'
import io from 'Socket.IO-client'
import Style from './style.module.css'
import Message from '../Message'

let socket = ()=>{}

const Page = ()=>{

    const [nome,setNome] = useState('')
    const [message,setMessage] = useState('')
    const [messages,setMessages] = useState('')
    const [nomeInformado,setNomeInformado] = useState(false)

    useEffect(() =>{socketInitializer()}, [])

    const socketInitializer = async () => {
        await fetch('/api/socket')
        socket = io()
    
        socket.on('connect', () => {
          console.log('connected')
        })

        socket.on('newMessage',(messages)=>{
            setMessages(messages)
        })

        socket.on('previousMessages',(messages)=>{
            setMessages(messages)
        })
    }

    function handleSetName(event){
        event.preventDefault();
        setNomeInformado(true)
    }

    function handleSendMessage(event){
        event.preventDefault();
        const msg = {
            message: message,
            nome: nome
        }
        socket.emit('sendMessage', msg)
        setMessage('')
    }

    return(
        <>
            <h1>Chat</h1>
            <div className={Style.body}>
                {!nomeInformado?(
                    <form onSubmit={event=>{handleSetName(event)}}>
                        <label htmlFor="nome">Informe Seu nome:</label>
                        <input type="text" value={nome} onChange={event=>setNome(event.target.value)}/>
                    </form>
                ):(
                    <span>
                        NickName: <b>{nome}</b>
                    </span>
                )}

                {messages.length > 0?(
                    <div className={Style.areamessages}>
                        {messages.map((message,index)=>(
                            <div
                                key={index}
                            >
                                <Message
                                    nick={message.nome}
                                    message={message.message}
                                />
                            </div>
                        ))}
                    </div>
                ):('')}

                {nomeInformado?(
                    <>
                        <form onSubmit={event=>{handleSendMessage(event)}}>
                            <label htmlFor="msg">Digite a mensagem:</label>
                            <input type="text" value={message} onChange={event=>setMessage(event.target.value)}/>
                        </form>
                    </>
                ):('')}
            </div>
        </>
    )
}

export default Page;