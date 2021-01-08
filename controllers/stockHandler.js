
var fetch      = require('node-fetch');
require('dotenv').config();
const connection = require('../config/database.js')

const Stock = connection.models.Stock

function StockHandler(){


// get price
    this.getPrice =      async function (stock,callback){
        // let url = "https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/msft/quote"
            let url = "https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/"
            let resObj;
       
          let response   = await fetch(url + stock + "/quote" )
          let data = await response.json()

          if(data.stock =="undefined"){  //invalid stock
              // console.log("4")
              // console.log("4d", data.stock) 
            // return callback('error', {stock: "Invalid stock, please try again"});         
                   resObj = { stock: "invalid stock", price: "invalid stock" }

          } else if(!data){  //invalid stock
              // console.log("1")
              // console.log("1d", data.stock) 
            // return callback('error', {stock: "Invalid stock, please try again"});         
                   resObj = { stock: "invalid stock", price: "invalid stock" }

          

          } else if(data == "Invalid symbol"){  //invalid stock
              
              console.log("2d invalid symbol", data.stock) 
            // return callback('error', {stock: "Invalid stock, please try again"});         
                   resObj = { stock: "invalid stock", price: "invalid stock" }

          } else {
            
                // console.log("3")
                //  console.log("3d", data.stock) 
                  resObj = { stock: data.symbol, price: data.latestPrice }

          }

          // console.log("FETCH RESULT", resObj) 

          callback('Notfinished', resObj);
      
     }  //<end of getprice func 



   this.findUpdateDB =   async function (stock, ip,checkBox,callback){
        
            let ipExists = false;  ////////

////
                //
            const find =  await Stock.findOne({stock: stock}, (error, data) => {
                   /// console.log("dw.DATA",data)
           
                                
            if (error) {return console.log(err.message)};

                  /// has been liked before by iD?
                
             if(!error && data && data.ip && data.ip.includes(ip)){
                    // console.log("dw ip exists")
                  ipExists = true
                
             } 
    ///////
                //  updated Doc criteria

              if(checkBox && ipExists == true){
                    // already updated, so exit
                    resObj = 'Error: Only 1 Like per IP Allowed'
                       return callback('test', resObj);
                              

                }  else if (checkBox){
                        // not liked before, so update
                    updateDoc = {$inc: {likes: 1}, $push: {ip: ip}}   // update like and IP
                    // console.log("dw..updteDocYEP")
                    //
                  

                } else{
                  // no likes
                    updateDoc = {}   // nothing to update  //
                    // console.log("dw..updteDocNOPE")
                  
                }   

                
                  // update DB//////
                  
                  Stock.findOneAndUpdate({stock: stock}, updateDoc, {new: true, upsert: true}, (error, data1) => {
                        // console.log("data1",data1)
                    if (error) {return console.log("dw1",err.message)};

                    if(!error){
                          console.log("dw here1..")
                        resObj = {likes: data1.likes }
                          callback('test', resObj); 

                    } else{
                              console.log("dw ERR here..")

                    }

                     

                    })  


           
           })

    };    





  
}


//





module.exports = StockHandler;

// module.exports = {getPrice, findUpdateDB };