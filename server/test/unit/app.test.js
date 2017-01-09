/**
 * Created by skz on 2016/12/28 0028.
 */
var superagent = require('superagent');
var expect = require('expect.js');

describe('express rest app api', function(){
  var id;

  it('create App', function(done){
    superagent.post('http://localhost:3000/api/app/')
      .send({
        name: 'Jserver0',
        path: 'gox/Jserver/',
        type: 1,
        icon: 'gox/Jserver/Jserver.ico',
        desc: 'Mock Api for front end',
        url: 'http://localhost:8080/Jserver'
      })
      .end(function(e,res){
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body.result).to.eql(true);
        expect(typeof res.body.message).to.eql('object');
        id = res.body.message._id;
        done()
      })
  });

  it('get app', function(done){
    superagent.get('http://localhost:3000/api/app/'+id)
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body.result).to.eql(true);
        expect(typeof res.body.message).to.eql('object');
        done()
      })
  });

  it('get all apps', function(done){
    superagent.get('http://localhost:3000/api/app')
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(res.body.message.length).to.be.above(0);
        done()
      })
  });

  it('update app', function(done){
    superagent.put('http://localhost:3000/api/app/'+id)
      .send({
        name: 'Jserver1',
        type: 2
      })
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body.result).to.eql(true);
        done()
      })
  });

  it('checks an updated app', function(done){
    superagent.get('http://localhost:3000/api/app/'+id)
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body.message._id).to.eql(id);
        expect(res.body.message.name).to.eql('Jserver1');
        expect(res.body.message.type).to.eql(2);
        done()
      })
  });

  it('removes app', function(done){
    superagent.del('http://localhost:3000/api/app/'+id)
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(res.body.result).to.eql(true);
        done()
      })
  });
});
