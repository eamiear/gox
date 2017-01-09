/**
 * app bean
 * Created by skz on 2016/12/21 0021.
 */
class Boot{
  constructor(id,name,port,status,statusName,path,pid,hasModifyPort,autostart,logpath,color){
    this.id = id;
    this.name = name || 'gox';
    this.port = port || 8081;
    this.status =  status || 0;
    this.statusName = statusName || '';
    this.path = path || '';
    this.pid = pid || 0;
    this.hasModifyPort = hasModifyPort || 0;
    this.autostart = autostart || 0;
    this.logpath = logpath || '';
    this.color = color || 'green';
  }

  setId(id){
    this.id = id;
  }
  getId(){
    return this.id;
  }
  setName(name){
    this.name = name;
  }
  getName(){
    return this.name;
  }
  setPort(port){
    this.port = port;
  }
  getPort(){
    return this.port;
  }
  setStatus(status){
    this.status = status;
  }
  getStatus(){
    return this.status;
  }
  setPath(path){
    this.path = path;
  }
  getPath(){
    return this.path;
  }
  setPid(pid){
    this.pid = pid;
  }
  getPid(){
    return this.pid;
  }
  setHasModifyPort(mod){
    this.hasModifyPort = mod;
  }
  getHasModifyPort(){
    return this.hasModifyPort;
  }
  setAautostart(autostart){
    this.autostart = autostart;
  }
  getAutostart(){
    return this.autostart;
  }
  setLogpath(logpath){
    this.logpath = logpath;
  }
  getLogpath(){
    return this.logpath;
  }
  setColor(color){
    this.color = color;
  }
  getColor(){
    return this.color;
  }
  getDbRow(){
    return {
      name : this.name,
      port : this.port,
      status :  this.status,
      statusName : this.statusName,
      path : this.path,
      pid : this.pid,
      hasModifyPort : this.hasModifyPort,
      autostart : this.autostart,
      logpath : this.logpath,
      color: this.color
    }
  }
}

export { Boot };
