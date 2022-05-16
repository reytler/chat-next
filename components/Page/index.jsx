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
    const [cor, setCor] = useState('white')
    const [users,setUsers] = useState([])
    const [user,setUser] = useState(null)

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

        socket.on('newUser',(users)=>{
            setUsers(users)
        })
    }

    function handleSetName(event){
        event.preventDefault();
        setNomeInformado(true);
        setUser({nick:nome, cor:cor})
    }

    useEffect(() =>{
        if(user != null){
            socket.emit('setUser',user)
        }
    }, [user])

    function handleSendMessage(event){
        event.preventDefault();
        const msg = {
            message: message,
            nome: nome
        }
        socket.emit('sendMessage', msg)
        setMessage('')
    }

    function handleSetMessage(event){
        if(event.nativeEvent.inputType ==='insertLineBreak'){
            handleSendMessage(event)
        }else{
            setMessage(event.target.value)
        }
    }

    return(
        <>
            <h1 className={Style.title}>Chat do Reyt</h1>
            <div className={Style.body}>
                {!nomeInformado?(
                    <form onSubmit={event=>{handleSetName(event)}} className={Style.form}>
                        <label htmlFor="nome" className={Style.labelnome}>Nick Name:</label>
                        <div className={Style.inputcolor}>
                            <input type="color" onChange={event=>setCor(event.target.value)}/>
                        </div>
                        <input 
                            type="text" 
                            value={nome} 
                            onChange={event=>setNome(event.target.value)} 
                            className={Style.nome}
                            placeholder="Informe seu nome"
                        />
                    </form>
                ):(
                    <span className={Style.nick}>
                        <div>
                            <span className={Style.titlenick}>NickName:</span> <b style={{color:`${cor?cor:'white'}`}}>{nome}</b>
                        </div>
                    </span>
                )}

                <div className={Style.areamessages}>
                    {messages.length > 0?
                        
                            messages.map((message,index)=>(
                                <div
                                    key={index}
                                >
                                    <Message
                                        nick={message.nome}
                                        message={message.message}
                                        users={users}
                                    />
                                </div>
                            ))
                    :('')}
                </div>
                {nomeInformado?(
                    <>
                        <form onSubmit={event=>{handleSendMessage(event)}} className={Style.areatexto}>
                            <textarea 
                                type="text" 
                                value={message} 
                                onChange={event=>handleSetMessage(event)}
                                placeholder='Digite sua mensagem'
                                className={Style.inputmsg}
                            />
                        </form>
                    </>
                ):('')}
            </div>
        </>
    )
}

export default Page;