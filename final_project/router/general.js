const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const axios = require('axios').default;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!isValid(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4));
//  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn])
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
 
   let j=1;
   for(let i=1; i<= 10; i++){
      if(books[i].author === author )
         j=i;
   }
   
    res.send(books[j])
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
 
   let j=1;
   for(let i=1; i<= 10; i++){
      if(books[i].title === title )
         j=i;
   }
    res.send(books[j])
 // return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let review = books[isbn].review;
  res.send(review);
  //return res.status(300).json({message: "Yet to be implemented"});
});
const getBooks = new Promise((resolve,reject) => {
  
     resolve (books);
    
    });
const getBookByISBN = (isbn) =>{
    const req = axios.get(isbn);
    console.log(isbn);
    req.then(resp =>{
        console.log(books[isbn]);
    })
    .catch(err=>{
        console.log("reejected");
    });
}
const getBookByAutor = (autor) =>{
    const req = axios.get(autor);
    console.log(author);
    req.then(resp =>{
     
        for(let i=1; i<= 10; i++){
           if(books[i].author === author )
              console.log(books[i]);
    }})
    .catch(err=>{
        console.log("reejected");
    });
}
const getBookByTitle = (title) =>{
    const req = axios.get(title);
    console.log(author);
    req.then(resp =>{
     
        for(let i=1; i<= 10; i++){
           if(books[i].title === title )
              console.log(books[i]);
    }})
    .catch(err=>{
        console.log("reejected");
    });
}
console.log(getBooks);
module.exports.general = public_users;
