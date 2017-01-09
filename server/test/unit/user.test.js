/**
 * Created by skz on 2016/12/28 0028.
 */
var superagent = require('superagent');
var expect = require('expect.js');

describe('express rest user api', function(){
  var id;

  it('create User', function(done){
    superagent.post('http://localhost:3000/api/user/')
      .send({
        name: 'ad',
        password: '13'
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

  it('get user', function(done){
    superagent.get('http://localhost:3000/api/user/'+id)
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body.result).to.eql(true);
        expect(typeof res.body.message).to.eql('object');
        done()
      })
  });

  it('get all users', function(done){
    superagent.get('http://localhost:3000/api/user')
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(res.body.message.length).to.be.above(0);
        done()
      })
  });

  it('update user', function(done){
    superagent.put('http://localhost:3000/api/user/'+id)
      .send({
        name: 'admin',
        password: '12345'
      })
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body.result).to.eql(true);
        done()
      })
  });

  it('checks an updated user', function(done){
    superagent.get('http://localhost:3000/api/user/'+id)
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body.message._id).to.eql(id);
        expect(res.body.message.name).to.eql('admin');
        done()
      })
  });

  it('removes user', function(done){
    superagent.del('http://localhost:3000/api/user/'+id)
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(res.body.result).to.eql(true);
        done()
      })
  });

  it('auth User', function(done){
    superagent.post('http://localhost:3000/api/auth/')
      .send({
        name: 'gox',
        password: '123'
      })
      .end(function(e,res){
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body.result).to.eql(true);
        expect(typeof res.body.message).to.eql('object');
        done()
      })
  });
});
