/*
 * @Author: PLayWithSanLei
 * @Date: 2022-02-07 22:36:07
 * @LastEditors: PlayWithSanLei
 * @LastEditTime: 2022-02-07 22:46:08
 * @FilePath: \Graduation-Project\cloud-doc\main.js
 */
const {app, BrowserWindow} = require('electron')
const isDev = require('electron-is-dev')
const path = require("path");
let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    minHeight: 600,
    minWidth: 960,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  const urlLocation = isDev ? 'http://localhost:3000' : 'dummyurl'
  mainWindow.loadURL(urlLocation)
})
