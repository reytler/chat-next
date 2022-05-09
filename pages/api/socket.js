import { Server } from 'Socket.IO'

let messages = []

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket está rodando agora')
  } else {
    console.log('Socket inicializado')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connect', socket => {
      socket.emit('previousMessages', messages);
      socket.on('sendMessage', msg => {
        messages.push(msg)
        socket.broadcast.emit('newMessage', messages)
      })
    })
  }
  res.end()
}

export default SocketHandler