var express = require('express')
var mysql = require('mysql')
var app = express()

var pool = mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'123456',
	database:'cococ',
	port:3306
})
//获取
app.get('/get',(req,res)=>{
	pool.getConnection((err,connection)=>{
		if(err){
			console.log(err)
			return
		}
		var sql = 'select * from text'
		connection.query(sql,(err,data)=>{
			if(err){
			console.log(err)
			return
		     }
			res.send(data)
			connection.end()
		})
	})
	
})
//录入
app.get('/lu',(req,res)=>{
	var text = req.query.text
	var textname=req.query.textname
	var name =req.query.name
	pool.getConnection((err,connection)=>{
		if(err){
			console.log(err)
			return
		}
		var sql = 'insert into text(text,name,textname) values(?,?,?)'
		connection.query(sql,[text,textname,name],(err,data)=>{
			if(err){
			console.log(err)
			return
		     }
			console.log(data)
			res.send('ok')
			connection.end()
		})
	})
	
})




app.use(express.static('./html'))
app.listen(8000,()=>{
	console.log('ok')
})

