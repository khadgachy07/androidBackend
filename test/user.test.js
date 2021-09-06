const Registration = require('../models/accountModel');
const Product = require('../models/productModel')
const Booking = require('../models/bookingModel')
const mongoose = require('mongoose');


const url = 'mongodb://localhost:27017/electronic_gadgets';

beforeAll(async()=>{
    await mongoose.connect(url,
        {
            useNewUrlParser:true,
            useCreateIndex:true
        }
    )
})

afterAll(async()=>{
    await mongoose.connection.close();
})

describe("User Testing",()=>{
    //testing for user registration
    it("User Registration Testing",()=>{
        const user = {
            accFN: "Test1234",
            accUN: "TestUnit",
            accEmail: "test@gmail.com",
            accPhone: "9803609251",
            accPwd: "123456",
            userType: "Admin"
        }

        return Registration.create(user)
        .then((reg_ret)=>{
            expect(reg_ret.accFN).toEqual("Test1234")
        })
    })

    //testing for Product addition
    it("Product Addition Testing",()=>{
        const product = {
           
            pName: "Mobile",
            pDesc: "New",
            pPrice: 100000,
            pImage: "No-img.jpg",
            pRating: 3


        }

        return Product.create(product)
        .then((product_ret)=>{
            expect(product_ret.pName).toEqual("Mobile")
        })
    })


    //testing for poduct update
    it("Testing Product update",async ()=>{
       const status = await Product.updateOne({_id:Object("607c99334e6a1f0d4c2d09b3")},{
            $set:{
                "pName":"Samsung"
            }
        })
     
        expect(status.ok).toBe(1)
    })

    //testing for product delete
    it("Testing for Product Delete",async ()=>{
        const status = await Product.deleteOne({
            "_id":Object("607c99334e6a1f0d4c2d09b3")
        })
     expect(status.ok).toBe(1);
        
    })

    //testing for product booking
    it("Testing for product booking",()=>{
            const booking = {
                "user_id": "60794235c660853608043b34",
                "product_id": "607c599c3e3e5d0ffc8e0822",
                "quantity": 4,
                "price": 1500,
                "booked_At": "2021-04-12"
            
            }

            return Booking.create(booking)
            .then((booking_ret)=>{
                expect(booking_ret.quantity).toEqual(4)
            })
    })

    //testing for booking delete
    it("Testing for Booking Delete",async ()=>{
        const status = await Booking.deleteOne({
            "_id": Object("607c9c624e6a1f0d4c2d09b6")
        })
        expect(status.ok).toBe(1);
    })

    //testing for booking update
    it("Testing Booking update",async ()=>{
       const status = await Booking.updateOne({_id:Object("607c9c604e6a1f0d4c2d09b5")},{
            $set:{
                "quantity":2
            }
        })
     
        expect(status.ok).toBe(1)
    })


   //testing for user details update
    it("Testing user details update",async ()=>{
        const status = await Registration.updateOne({
            "_id":Object("60794235c660853608043b34")
        },
        {
            $set:{
                "accFN":"Test",
                "accUN":"RijenShahi"
            }
        })

        expect(status.ok).toBe(1)
        
    })
})