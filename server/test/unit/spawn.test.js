/**
 * Created by skz on 2017/1/6 0006.
 */

var superagent = require('superagent');
var expect = require('expect.js');

describe('Server', function(){
  /*it('start Tomcat', function(done){


    superagent.get('http://localhost:3000/api/start/')
      .send({
        type: 'java'
      })
      .end(function(e,res){
        //expect(typeof Spawns).to.eql('object');
        //
        // console.log(res);
        //console.log(e);
        done()
      })
  });*/

  it('start PHP', function(done){


    superagent.post('http://localhost:3000/api/start/')
      .send({
        type: 'php',
        action: 1
      })
      .end(function(e,res){
        done()
      })
  });
});
