/*
*
*
*       Complete the API routing below
*
*
*/
//////

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');

// const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});
const fetch = require('node-fetch')

require('dotenv').config();
const connection = require('../config/database.js')
const StockHandler = require('../controllers/stockHandler.js')
const Stock = connection.models.Stock
////
module.exports = function (app) {
////
let sp = new StockHandler()

///////
 


  app.route('/api/stock-prices')
  // app.route('/a')
    .get(async function (req, res){

      let noStock = false;  // start with all stocks are valid

      // const {getPrice, findUpdateDB }  = require('../controllers.js')
      
      let ip =  'dw111'  // req.ip  // 'dw111'   

      let resObj = {}           
      var twoStocks = false         
      let stockErr = false 

      let countOfStocks = Array.isArray(req.query.stock)
      
      
      
        // single item are not an array. compare =array      
      let checkBox = req.query.like;   // is like ticked ?     
      let stockName;      //
      var stockData = [];  //stck price
      var stockData1 = [];  //likes//

//
      function sync(finished, data) {

              if(twoStocks){

            
                    if (finished == 'Notfinished') {
                      stockData.push(data)              
                      } 

                    
                    if (finished == 'test') {
                      stockData1.push(data)
                      // stockData.push(data)  // get price
                    } 

                    if(stockData.length == 2 && stockData1.length == 2){

//
                      // console.log(stockData, stockData1)
                      // console.log(stockData[0].stock)

                       stockData[0].rel_likes = stockData1[0].likes - stockData1[1].likes;
                       stockData[1].rel_likes = stockData1[1].likes - stockData1[0].likes;
                      
                      console.log(stockData, stockData1)
                      console.log( stockData[0].rel_likes)
                      console.log( stockData[1].rel_likes)

                      res.json({stockData})
                    }

//////////////////
              }


               else {   ///<<<< 1 stock//



                  if (finished == 'Notfinished') {
                                // console.log("heheheeh", data)
                          stockData.push(data) 

                  } else if (finished == 'test') {

                    stockData[0].likes  = data.likes
                         stockData1.push(data)

                                 //console.log("hereA ... ",  stockData )
                                 /////////////
                  
                  }                  
                  

                  if(stockData.stock == "invalid stock" && stockData1.length ==1 ){
                        
                        // console.log("stockErr1", stockErr)
                      return   res.json({stock: "Invalid stock, please try again"})
                       
                  } else if (stockData1.length ==1){
                                  
                                  // console.log("stockErr2", stockErr)
                                  
                                 
                                  // console.log("dw --- herenow",stockData)

                      return res.json({stockData})
                      
                  } else{
                         
                    console.log("dw --- hmmm!")

                  }
                              
                

        }


      }  // <<<<<end of sync//
      
      if (countOfStocks === false){  //<=== 1 stock
                      
        stockName = req.query.stock;            
                

        sp.getPrice(stockName, sync)
        sp.findUpdateDB(stockName, ip,checkBox,sync)  
      
        
      }  //<=== 1 stock////
       
      if (countOfStocks === true){  //<=== 2 stock

        twoStocks = true  

        stockName = req.query.stock[0];          
        sp.getPrice(req.query.stock[0], sync)
        sp.findUpdateDB(req.query.stock[0], ip,checkBox,sync) 


        stockName = req.query.stock[1];          
        sp.getPrice(req.query.stock[1], sync)
        sp.findUpdateDB(req.query.stock[1], ip,checkBox,sync) 
         

      
        
      }  //<=== 2 stock
     
    
     
        
       

      
      
    });   // end of get function


    

    
};   /// <<<< end of exports function


//  {"stockData":{"stock":"MSFT","price":210.08,"likes":2}}

//  {"stockData":[{"stock":"MSFT","price":210.08,"rel_likes":-1},{"stock":"GOOG","price":1590.45,"rel_likes":1}]}

 