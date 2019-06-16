const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

// Express é o que permite lidar com rotas, parâmetros e repostas
const app = express();

// Dividindo o sevidor entre protocolo http e o websocket
const server = require('http').Server(app);
// socket.io é o que permite fazer a comunicação
const io = require('socket.io')(server);

// conexão com banco
mongoose.connect('mongodb+srv://admin:admin@cluster0-m8rin.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
})

// Repassando a informação do Io para todas as rotas
// Para ter acesso ao req.io em todos os controllers
app.use((req,res,next)=>{
    req.io = io;
    next();
})

// O cors serve para que qualquer ip possa acessar esse back-end
app.use(cors());


// Aqui estamos fazendo com que as imagens da nossa aplicação possam ser acessadas através da url
app.use('/files', express.static(path.resolve(__dirname,'..','uploads','resized')));

// Declaração das rotas da aplicação
app.use(require('./routes'));

server.listen(3333)

