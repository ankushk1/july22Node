const express = require("express");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const app = express();
const port = 8000;
const mongoose = require("./config/mongoose");
const userRoutes = require('./routes/userRoutes')
const categoryRoutes = require('./routes/categoryRoutes')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user', userRoutes)
app.use('/category', categoryRoutes)
app.set("secret", "july22ProSecret")


// const langArr = ["Java", "C++", "JS", "Python"];

// let langArr = [
//   {
//     id: Math.floor(Math.random() * 1000),
//     name: "Java"
//   },
//   {
//     id: Math.floor(Math.random() * 1000),
//     name: "C++"
//   },
//   {
//     id: Math.floor(Math.random() * 1000),
//     name: "JS"
//   },
//   {
//     id: Math.floor(Math.random() * 1000),
//     name: "Python"
//   }
// ];

// // app.get("/home", (req, res) => {
// //   res.send("<h1>Node JS server running on 8000</h1>");
// // });

// // app.get("/getInfo", (req, res) => {
// //   console.log(req.headers.key1);
// //   res.json(req.query);
// // });

// app.get("/getLanguages", (req, res) => {
//   res.json({ languages: langArr });
// });

// app.post("/addLang", (req, res) => {
//   const { langName } = req.body;
//   langArr.push(langName);
//   res.json({ message: "Language added to the array" });
// });

// app.delete("/deleteLang/:id", (req, res) => {
//   const { id } = req.params;
//   //splice
//   // const langIndex = langArr.findIndex((elem) => elem.id == id);
//   // console.log(langIndex);
//   // langArr.splice(langIndex, 1);

//   // if(langIndex == -1) {
//   //   return res.json({message: "Elem not found"})
//   // }

//   //Filter
//   const filterArr = langArr.filter((elem) => elem.id != id);
//   langArr = filterArr;
//   res.json({ message: "Lang removed" });
// });

// app.put("/updateLang/:id", (req, res) => {
//   const { id } = req.params;
//   const { lang } = req.body;
//   //splice
//   const langIndex = langArr.findIndex((elem) => elem.id == id);
//   langArr.splice(langIndex, 1, {
//     id: Math.floor(Math.random() * 1000),
//     name: lang
//   });

//   res.json({ message: "Lang updated" });
// });

// app.get("/getLang/:id", (req, res) => {
//   // To find the element in langArr having the id passed by params
//   // Return the element in response
//   const { id } = req.params;
//   const lang = langArr.find((elem) => elem.id == id);
//   res.json({ language: lang });
// });

app.listen(port, () => {
  console.log("Server running on port: " + port);
});
