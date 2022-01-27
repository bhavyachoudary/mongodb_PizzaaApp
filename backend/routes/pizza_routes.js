const express = require('express');
const fs = require('fs');
const router = express.Router();
const nodemailer = require('nodemailer');

const jwt = require('jsonwebtoken')
const jwtSecret = "ddsfftyy677yttfff";

function autenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
    if (token == null) {
        res.json({ "err": 1, "msg": "Token not match" })
    }
    else {
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                res.json({ "err": 1, "msg": "Token incorrect" })
            }
            else {
                console.log("Token Matched")
                next();
            }
        })
    }
}

const userData = require('../db/userSchema');

router.post("/register", (req, res) => {

    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let address = req.body.address;
    let ins = new userData({ name: name, email: email, password: password, address: address, });
    ins.save((err) => {
        if (err) {
            res.json({ "err": "Please fill the form" })
        };
        res.json({ "msg": "Registered successfully" })
    })
})

router.post("/login", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    userData.findOne({ email: email, password: password }, (err, data) => {
        if (err) {
            res.json({ "err": err })
        }
        if (data === null) {
            res.json({ "err": "Email or password wrong" })
        }
        else {
            let payload = {
                uid: email
            }
            const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 })
            res.json({ "msg": "Login successfull", "token": token })
        }
    })
})

const productData = require('../db/productSchema');

router.get("/products", autenticateToken, (req, res) => {
    productData.find({}, (err, products) => {
        if (err) {
            res.json({ "err": err })
        }
        else {
            res.json({ "products": products });
        }
    })
})

const orderData = require('../db/orderSchema');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "bhavyamullapudi3@gmail.com",
        pass: "Bhavya@03"
    }

})



router.get("/cart/:item/:price/:email", (req, res) => {

    let item = req.params.item;
    let email = req.params.email;
    let price = req.params.price;
    
    orderData.find({ pname: item, email: email, checkout: false }, (err, data) => {
        if (err) { res.json({ "err": err }) }
        if (data.length === 0) {
            let ins_order = new orderData({ pname: item, email: email, price: price, quantity: 1, checkout: false });
            ins_order.save((err) => {
                if (err) { res.json({ "err": err }) };
                res.json({ "msg": "Product ordered successfully" })
            })
        }
        else {
            orderData.updateOne({ pname: item }, { $inc: { quantity: +1 } }, (err) => {
                if (err) throw err;
                res.json({ "msg": "Product incremented successfully" })
            })
        }
    })



})

router.get("/orders/:email", (req, res) => {

    let email = req.params.email;
    orderData.find({ email: email, checkout: false }, (err, data) => {
        if (err) { res.json({ "err": err }) }
        if (data.length === 0) {
            res.json({ "msg": "Orders are not placed" })
        }
        else {
            res.json({ "orders": data });
        }
    });
})

router.delete("/deleteorder/:id", (req, res) => {
    let id = req.params.id;
    orderData.deleteOne({ _id: id }, (err) => {
        if (err) throw err;
        res.json({ msg: "Do you want to delete" })
    })
})

router.get("/checkout/:email", (req, res) => {

    let email = req.params.email;

    let mailOptions = {
        from: "bhavyamullapudi3@gmail.com",
        to: "bhavyamullapudi3@gmail.com",
        subject: 'Order Information',
        text: ''
    };
    orderData.find({ email: email, checkout: false }, (err, data) => {
        if (err) {
            res.json({ "err": err })
        }
        else {
            let total = data.reduce((prev, cur) => { prev + (cur.price * cur.quantity) }, 0);
           
            data.map((items) => {
                mailOptions.text += ` ${items.pname}\t ${items.quantity}\t ${items.price}\n`
            });
            // mailOptions.text += `Total amount: Total:- ${items.price * items.quantity}`;
            transporter.sendMail(mailOptions, function (err, data) {
                if (err) {
                    console.log("Error " + err);
                } else {
                    console.log("Email sent successfully");
                }
            })

        }
    })

   

    orderData.updateMany({ email: email, checkout: false }, { $set: { checkout: true } }, (err) => {
        if (err) throw err;
        res.json({ "msg": "Do you want to place the order" })
    })
})

router.get("/allorders/:email", (req, res) => {
    let email = req.params.email;
    orderData.find({ email: email }, (err, data) => {
        if (err) { res.json({ "err": err }) }
        if (data.length === 0) {
            res.json({ "msg": "Orders are not placed" })
        }
        else {
            res.json({ "orders": data });
        }
    });
})

router.get("/profile/:email", (req, res) => {
    let email = req.params.email;
    userData.findOne({ email: email }, (err, data) => {
        if (err) res.json({ err: err })
        res.json({ user: data });
    })
})

router.put('/updprofile/:id', (req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    let email = req.body.email;

    let address = req.body.address;
    let password = req.body.password;
    userData.updateOne({ _id: id }, { $set: { name: name, email: email, address: address, password: password } }, (err) => {
        if (err) res.json({ err: err });
        res.json({ msg: "Profile updated successfully" });
    })
})
module.exports = router;