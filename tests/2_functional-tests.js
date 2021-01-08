/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    
    suite('GET /api/stock-prices => stockData object', function() {
      
      test('1 stock', function(done) {
       chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog'})
        .end(function(err, res){
          
          //complete this one too//
          assert.equal(res.status, 200);
          assert.property(res.body.stockData[0],'stock');
          assert.property(res.body.stockData[0],'price');
          assert.property(res.body.stockData[0],'likes');;
          assert.equal(res.body.stockData[0].stock, 'GOOG');
          done();


        });
      });
      var likes;
      test('1 stock with like', function(done) {
            chai.request(server)
            .get('/api/stock-prices')
            .query({stock: 'rbs',like:true})
            .end(function(err, res){
            
            assert.equal(res.status, 200);
             assert.property(res.body.stockData[0],'stock');
            assert.property(res.body.stockData[0],'price');
            assert.property(res.body.stockData[0],'likes');;
            assert.equal(res.body.stockData[0].stock, 'RBS');
            console.log("likes dw", res.body.stockData[0].likes)
            
            likes = res.body.stockData[0].likes;
               assert.equal(likes, 1);
          
            done();


            });

        
      });
     
      test('1 stock with like again (ensure likes arent double counted)', function(done) {
             chai.request(server)
            .get('/api/stock-prices')
            .query({stock: 'rbs',like:true})
            .end(function(err, res){
            //////
            // assert.equal(res.status, 200);
            assert.equal(res.body.stockData[0],'stock');
            assert.equal(res.body.stockData[0],'price');
            assert.equal(res.body.stockData[0],'likes');
            assert.equal(res.body.stockData[0].stock, 'RBS');

            // likes = res.body.stockData[0].likes;
               assert.equal(likes, 1);;
            done();
//

            });
      });
      
      var rel_likes;

      test('2 stocks', function(done) {

           chai.request(server)
          .get('/api/stock-prices')
          .query({stock: ['hsbc', 'bbc']})
          .end(function(err, res){
          
          //complete this one too//
           assert.equal(res.status, 200);
          assert.property(res.body.stockData[0],'stock');
          assert.property(res.body.stockData[0],'price');
          assert.property(res.body.stockData[0],'rel_likes');;
          assert.property(res.body.stockData[1],'stock');
          assert.property(res.body.stockData[1],'price');
          assert.property(res.body.stockData[1],'rel_likes');;
          assert.oneOf(res.body.stockData[0].stock, ['HSBC','BBC']);
          assert.oneOf(res.body.stockData[1].stock, ['HSBC','BBC']);
          assert.equal(res.body.stockData[0].rel_likes + res.body.stockData[1].rel_likes, 0);
          rel_likes = Math.abs(res.body.stockData[0].rel_likes);
          done();

          });
        
      });
      
      test('2 stocks with like', function(done) {
           chai.request(server)
          .get('/api/stock-prices')
          .query({stock: ['hsbc', 'bbc'], likes:true})
          .end(function(err, res){
          
          //complete this one too
           assert.equal(res.status, 200);
              assert.property(res.body.stockData[0],'stock');
          assert.property(res.body.stockData[0],'price');
          assert.property(res.body.stockData[0],'rel_likes');;
          assert.property(res.body.stockData[1],'stock');
          assert.property(res.body.stockData[1],'price');
          assert.property(res.body.stockData[1],'rel_likes');;
          assert.oneOf(res.body.stockData[0].stock, ['HSBC','BBC']);
          assert.oneOf(res.body.stockData[1].stock, ['HSBC','BBC']);
          assert.equal(res.body.stockData[0].rel_likes + res.body.stockData[1].rel_likes, 0);
          assert.equal(Math.abs(res.body.stockData[0].rel_likes),rel_likes);
          done();

        
      });
      
    });
   });
});
