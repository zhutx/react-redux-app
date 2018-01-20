const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const User = model.getModel('user')

import React from 'react'

const Chat = model.getModel('chat')
const path = require('path')

const app = new express()

const server = require('http').Server(app)

const io = require('socket.io')(server)

function App() {
    return <h2>server render</h2>
}
console.log(App())

io.on('connection', function(socket) {
    console.log('socket.io connection')
    socket.on('sendmsg', function(data) {
        const { from, to, msg } = data
        const chatid = [from, to].sort().join('_')
        Chat.create({chatid, from, to, content: msg}, function(err, doc) {
            io.emit('recvmsg', Object.assign({}, doc._doc))
        })
        //console.log(data)
        //io.emit('recvmsg', data)
    })
})

const userRouter = require('./user')


app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)
// 1. 购买域名
// 2. DNS解析到你服务器的IP
// 3. 安装Nginx
// 4. 使用 pm2 管理node进程
app.use(function(req, res, next) {
    if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
        return next()
    }
    return res.sendFile(path.resolve('build/index.html'))
})
app.use('/', express.static(path.resolve('build')))

server.listen(9093, function() {
    console.log('Node app start at port 9093')
})