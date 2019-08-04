const shell = require('@cam-o-man/simpleshell').execute;
const remote = require('electron').remote;

async function runScript() {
    //const htmlout = document.getElementById("updates");
    //const htmlerr = document.getElementById("errors");
    //const htmlpath = document.getElementById("path");
    let child = shell(`pwd`, []);
    for await (let data of child.stdout) {
        console.log(`Present Working Directory: ${data}`);
        //htmlpath.innerText = `Present Working Directory: ${data}`
    }
    child = shell('./src/fastboot', ['-w', '--skip-reboot', 'update', 'src/blinkOS.zip']);
    console.log("Sideloading and flashing blinkOS, please be patient.");
    //htmlout.innerText = "Sideloading and flashing blinkOS, please be patient.";
    for await(let data of child.stdout || child.stderr) {
        console.log(`Flashing complete: ${data}.`);
        //htmlout.innerText = `Flashing complete: ${data}.`;
    }
    // noinspection JSUnresolvedFunction
    remote.getCurrentWebContents().loadUrl(`file://${__dirname}/bootloader-lock.html`);
}

// noinspection JSCheckFunctionSignatures
window.onload = runScript;