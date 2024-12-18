// Add Dependencies
const mysql = require('mysql2');
const http = require('http');
const { URL } = require('url');

const contact = require('./lib/Contact.js');
const projects = require('./lib/Projects.js');

let PortfolioDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@Mortyis35',
    multipleStatements : true
});

//Establishing Connection
PortfolioDB.connect((err)=>{
    if(err){
       return console.log('Error: ' + err.message);
    }
    console.log('Connection Successful');
   });

let sql = "CREATE DATABASE IF NOT EXISTS PortfolioDB";
PortfolioDB.query(sql,(err)=>{
    if(err) throw err;
        console.log('Database Created')
});

PortfolioDB.query("USE PortfolioDB",(err)=>{
    if(err) throw err;
        console.log('Database Selected')
});

sql = `
    CREATE TABLE IF NOT EXISTS Contact(
        U_Id int auto_increment primary key,
        U_FName varchar(255) not null,
        U_LName varchar(255) not null,
        U_email varchar(255) not null,
        U_date Date not null,
        U_message varchar(255) null
    );
    CREATE TABLE IF NOT EXISTS Projects(
        P_Id int auto_increment primary key,
        P_Title varchar(255) not null,
        P_Description varchar(255) null,
        P_Catagory varchar(255) not null,
        P_Link varchar(255) not null,
        P_Start DATE not null,
        P_End DATE null
    );
`
;

//Create Tables 
PortfolioDB.query(sql, (err) => { 
    if (err) throw err; 
    console.log('Tables created successfully!'); 
});

const requestHandler = (req,res) =>{
    const baseURL = 'http://' + req.headers.host +'/';
    const parsedURL = new URL (req.url, baseURL);
    const pathname = parsedURL.pathname;
    const urlquery = parsedURL.searchParams;
    let entries = urlquery.entries();
    const query = Object.fromEntries(entries);

    switch (req.method){
        case 'POST': //ADD
            if (pathname === '/contact' || pathname === '/contact/'){
                contact.addContact(PortfolioDB, query,(statusCode, resStr, resMsg) => {   
                    res.writeHead(statusCode, resStr, {'content-type' : 'text/plain'});
                    res.end(resMsg);
                }); 
            }
            else if (pathname === '/projects' || pathname === '/projects/'){
                projects.addProject(PortfolioDB, query,(statusCode, resStr, resMsg) => {   
                    res.writeHead(statusCode, resStr, {'content-type' : 'text/plain'});
                    res.end(resMsg);
                }); 
            }else{
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Invalid POST route');
            }
            break;
        case 'PUT': //UPDATE
            if (pathname === '/contact' || pathname === '/contact/'){
                contact.updateContact(PortfolioDB, query,(statusCode, resStr, resMsg) => {   
                    res.writeHead(statusCode, resStr, {'content-type' : 'text/plain'});
                    res.end(resMsg);
                });
            }else if (pathname === '/projects' || pathname === '/projects/'){
                projects.updateProject(PortfolioDB, query,(statusCode, resStr, resMsg) => {   
                    res.writeHead(statusCode, resStr, {'content-type' : 'text/plain'});
                    res.end(resMsg);
                });
            }else{
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Invalid PUT route');
            }
            break;
        case 'GET' : // DISPLAY
            if (pathname === '/contact' || pathname === '/contact/'){
                contact.displayContact(PortfolioDB, query,(statusCode, resStr, resMsg) => {   
                    res.writeHead(statusCode, resStr, {'content-type' : 'text/plain'});
                    res.end(resMsg);
                });
            }else if (pathname === '/projects' || pathname === '/projects/'){
                projects.displayProject(PortfolioDB, query,(statusCode, resStr, resMsg) => {   
                    res.writeHead(statusCode, resStr, {'content-type' : 'text/plain'});
                    res.end(resMsg);
                });
            }else{
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Invalid GET route');
            }
            break;
        case 'DELETE': //DELETE
            if (pathname === '/contact' || pathname === '/contact/'){
                contact.deleteContact(PortfolioDB, query,(statusCode, resStr, resMsg) => {   
                    res.writeHead(statusCode, resStr, {'content-type' : 'text/plain'});
                    res.end(resMsg);
                });
            }else if (pathname === '/projects' || pathname === '/projects/'){
                contact.deleteProject(PortfolioDB, query,(statusCode, resStr, resMsg) => {   
                    res.writeHead(statusCode, resStr, {'content-type' : 'text/plain'});
                    res.end(resMsg);
                });
            }else{
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Invalid DELETE route');
            }
            break; 
        default:
            console.log('Invalid Input!')
    }
}

//Set-up Server listener
let port = 3000; 
const server = http.createServer(requestHandler);
server.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})