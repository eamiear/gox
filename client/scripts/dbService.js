/**
 * Api of database operation
 * Created by skz on 2016/12/22 0022.
 */
const dbApi = {

  // update app item
  update (app){
    "use strict";
    const row = appTable.createRow(app);
    bootDb.insertOrReplace().into(appTable).values([row]).exec();
  },

  // add an app
  create (app,callback){
    const row = appTable.createRow(app);
    bootDb.insertOrReplace().into(appTable).values([row]).exec().then((row) => {
      callback && callback(row[0]);
    });
  },

  // remove app
  remove (app){
    bootDb.delete().from(appTable).where(appTable.id.eq(app.id)).exec();
  }
};

export { dbApi }
