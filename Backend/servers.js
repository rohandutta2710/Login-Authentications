const express = require('express');
const bodyParser = require("body-parser")   //most important middlware for  sending data from client to server side
const fs = require('fs');
const path = require("path")
const app = express();
const ports=process.env.PORT || 6000;
const fileName = "./LoginApis.json";
const viewPath = path.join(__dirname, "./views");
let jsonData = fs.readFileSync(fileName, "utf-8");
jsonData = JSON.parse(jsonData);

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// template engine
app.set("view engine", "hbs")

let clientData;
//post request because user couldn't enter id to check all the data
app.post("/", (req, res) => {
    clientData = req.body;
    let data = jsonData.find((val) => {
        return (val.id.toLowerCase() === clientData.id.toLowerCase() && val.password[val.password.length - 1] === clientData.password);
    })
    data.fname === undefined ? res.send(`<h1>Hello ${data.id}</h1>`) : res.send(`<h1>Hello ${data.fname} ${data.lname}</h1>`)
})

app.get("/login/:id", (req, res) => {
    let data = jsonData.find((val) => {
        return val.id === req.params.id;
    })
    data !== undefined ? res.send(data) : res.status(404).send("Error 404");
})

app.get("/login", (req, res) => {
    if (req.query.apikey==="rdxlogin9811") {
        res.json(jsonData);
    }
    else {
        let data = jsonData.find((val) => {
            return val.id === req.query.id;
        })
        data !== undefined ? res.send(data) : res.status(404).send("Error 404");
    }
})

app.post("/newuser", (req, res) => {
    clientData = req.body;
    if (clientData.id !== undefined && clientData.password !== undefined && clientData.id.length > 10 && clientData.password.length >= 5 && clientData.id.toLowerCase().endsWith("@gmail.com") && clientData.id.indexOf("@") === clientData.id.lastIndexOf("@")) {
        let data = jsonData.find((val) => {
            return (val.id.toLowerCase() === clientData.id.toLowerCase() || val.phoneno === clientData.phoneno);
        });
        // pass the complete clientData object instead of creating the newone again
        if (data === undefined) {
            data = {
                "fname": clientData.firstName,
                "lname": clientData.lastName,
                "phoneno": clientData.phoneno,
                "gender": clientData.gender,
                "DOB": clientData.DOB,
                "id": clientData.id,
                "password": [clientData.password],
                "auth": jsonData[jsonData.length - 1].auth + 1
            }
            jsonData.push(data)
            fs.writeFileSync(fileName, JSON.stringify(jsonData))
            res.render(path.join(viewPath, "./index.hbs"), { serverStatus: "User is added Succesfully." })
        }
        else {
            res.status(400).render(path.join(viewPath, "./index.hbs"), { serverStatus: "User Already exists." })
        }
    }
    else {
        res.status(500).render(path.join(viewPath, "./index.hbs"), { serverStatus: "Invalid credential." });
    }
});

// to update the password "put request", html does not support put and delete request
// therefore using post we will perform these actions
app.post("/updatedetails", (req, res) => {
    clientData = req.body;
    for (let i of jsonData) {
        //password is an array all the previous password while update will be checked in React
        if (i.id.toLowerCase() === clientData.id.toLowerCase() && i.phoneno === clientData.phoneno) {
            i.password.push(clientData.newpassword);
            fs.writeFileSync(fileName, JSON.stringify(jsonData));
            res.render(path.join(viewPath, "./index.hbs"), { serverStatus: "Password is updated." });
            break;
        }
    }
})

// deleting the account of the user
app.post("/deleteuser", (req, res) => {
    clientData = req.body;
    for (let i in jsonData) {
        if (jsonData[i].id.toLowerCase() === clientData.id.toLowerCase() && jsonData[i].phoneno === clientData.phoneno && jsonData[i].password[jsonData[i].password.length - 1] === clientData.password) {
            // delete jsonData[i]; //this will add null to your data
            jsonData.splice(i, 1)
            fs.writeFileSync(fileName, JSON.stringify(jsonData));
            res.render(path.join(viewPath, "./index.hbs"), { serverStatus: "Account is deleted succesfully." });
            break;
        }
    }
    res.status(404).render(path.join(viewPath, "./index.hbs"), { serverStatus: "User doesn't exists." });
})



app.listen(ports, () => {
    console.log("Server is running.")
})