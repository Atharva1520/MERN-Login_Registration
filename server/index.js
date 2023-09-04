const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./model/Employee"); // Assuming the EmployeeModel.js is in the same directory as index.js

const app = express();
app.use(express.json()); // Fixed the missing parentheses
app.use(cors());

mongoose.connect("", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
});

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error:"));
// db.once("open", () => {
//   console.log("Connected to MongoDB");
// });

app.post('/register', (req, res) => {
  EmployeeModel.create(req.body)
    .then(employee => res.json(employee))
    .catch(err => res.status(500).json(err));
});

app.post("/login",(req,res) => {
    const {email,password} = req.body;
    EmployeeModel.findOne({email:email})
    .then(user => {
        if(user) {
            if(user.password === password){
                res.json("Success");
            }else{
                res.json("the password is incorrect");
            }
        }else{
            res.json("no record existed")
        }
    })
})

const PORT =  3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
