
//Module
var ejs = require('ejs');
var redis = require('redis');
var faye = require('faye'), fayeRedis = require('faye-redis');
var http = require('http');
var express = require('express');

//Modul Referenzen
var app = 
var server = http.createServer(app);
var client = faye.Client('localhost:3000/faye');




























// Server
server.listen(3001, function(){
  console.log("Der ServiceAgent wurde Erfolgreich gestartet :3");
});
