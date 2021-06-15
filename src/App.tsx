import * as React from 'react';
import Main from './Main';
import * as ReactDom from 'react-dom';
import { setGlobalUserDataPath } from './logic/utils';
// import 'bootstrap';


const ipcRenderer = require('electron').ipcRenderer;
ipcRenderer.on('userDataPath', (event: any, userDataPath: string) => {

    setGlobalUserDataPath(userDataPath);
    console.log("User data path:", userDataPath);

    ReactDom.render(<Main />, document.getElementById('root'));
});