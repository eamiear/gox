/**
 * Created by skz on 2016/12/13 0013.
 */
const {Menu,Tray,remote} = require('electron');
const path = require('path');

class TrayClass{
  constructor(win){
    this.win = win;
    this.tray = null;
    this.isHide = false;
    this.appExit = false;
    this.createTray ()
  }

  createTray (){
    this.tray = new Tray(path.join(__dirname, '../assets/app.png'));
    // On Windows, left click opens the app, right click opens the context menu.
    // On Linux, any click (left or right) opens the context menu.
    this.tray.on('click', () => {
      this.toggleWin(false)
    });
    this.setToolTip();
    this.updateMenu()
  }

  updateMenu(){
    if (!this.tray) return;
    // Show the tray context menu, and keep the available commands up to date
    var contextMenu = Menu.buildFromTemplate(this.getMenuTemplate());
    this.tray.setContextMenu(contextMenu)
  }

  getMenuTemplate () {
    return [
      this.getToggleItem(),
      {
        label: '退出',
        accelerator: 'Command+Q',
        click: () => {
          this.appExit = true;
          this.win.close()
        }
      }
    ]
  }

  getToggleItem () {
    if (!this.isHide) {
      return {
        label: '最小化至托盘',
        accelerator: 'Command+M',
        click: () => {
          this.toggleWin(true)
        }
      }
    } else {
      return {
        label: '打开窗口',
        accelerator: 'Command+O',
        click: () => {
          this.toggleWin(false)
        }
      }
    }
  }

  toggleWin(hide){
    this.isHide = hide;
    this.isHide ? this.win.hide() : this.win.show();
    this.updateMenu();
  }

  setToolTip(tip){
    if(!this.tray) return;
    this.tray.setToolTip(tip || '微服监控')
  }

  isAppExit(){
    return this.appExit
  }
}

module.exports = TrayClass;
