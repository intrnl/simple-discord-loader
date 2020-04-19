let { ipcRenderer } = require('electron');

let originalPreload = ipcRenderer.sendSync('loader_get-original-preload');
if (originalPreload) {
  console.debug('Running original preload');
  require(originalPreload);
}


let head = document.createElement('loader-head');


let onReady = () => {
  document.body.prepend(head);
};

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', () => {
    onReady();
  })
} else {
  onReady();
}


let fs = require('fs');
let path = require('path');

let dataDirectory = path.resolve(__dirname, '../data/');
let config = require('../data/config.json');

let fsp = fs.promises;


function debounce (fn, ms) {
  let timeout;

  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, arguments), ms);
  }
}


config.css.forEach(async (filePath, i) => {
  filePath = path.resolve(dataDirectory, filePath);

  let styleElem = document.createElement('style');
  styleElem.id = i;
  
  console.debug(`Loading: ${filePath}`);
  
  let css = await fsp.readFile(filePath, 'utf8');
  styleElem.textContent = css;

  head.append(styleElem);

  fs.watch(filePath, debounce(async () => {
    console.debug(`Reloading: ${filePath}`);
    let css = await fsp.readFile(filePath, 'utf8');
    styleElem.textContent = css;
  }, 250));
});
