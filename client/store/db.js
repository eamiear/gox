/**
 * database
 * Created by skz on 2016/12/19 0019.
 */

require('../assets/js/lovefield.min.js');

window.bootDb = null;
window.appTable = null;

if(!window.schemaBuilder){
  window.schemaBuilder = lf.schema.create('gosuncn_boot_db', 2);

  window.schemaBuilder.createTable('boot_apps').
  addColumn('id', lf.Type.INTEGER).
  addColumn('name', lf.Type.STRING).
  addColumn('path', lf.Type.STRING).
  addColumn('port', lf.Type.INTEGER).
  addColumn('autostart',lf.Type.INTEGER).
  addColumn('status',lf.Type.INTEGER).
  addColumn('hasModifyPort',lf.Type.INTEGER).
  addColumn('logpath',lf.Type.STRING).
  addColumn('pid',lf.Type.INTEGER).
  addColumn('color',lf.Type.STRING).
  addPrimaryKey(['id'], true);
}
const schemaBuilder = window.schemaBuilder;

export {schemaBuilder}
