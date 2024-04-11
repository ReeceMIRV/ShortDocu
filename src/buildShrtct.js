let directoryStr;

var dependenciesStr = `
const fs = require("fs");

const {
    actionOutput,
    buildShortcut,
    withVariables,
    } = require('@joshfarrant/shortcuts-js'); //imports necessities to build a shortcut
    const {
    calculate,
    comment,
    number,
    showResult
    } = require('@joshfarrant/shortcuts-js/actions'); //imports the specified actions

// We'll use this later to reference the output of a calculation
const calcVar = actionOutput();

actions = [ \n`

var buildShortcutStr = `]; \n
directoryStr = document.getElementById("directory").value;
shortcutName = "/" + document.getElementById("shortcut-name").value + ".shortcut";

// generate the shortcut content (data)
const shortcutData = buildShortcut(actions);  // buffer has been deprecated (read the console err) find an alternative.

// alert the directory on the alert box (top banner).
    if (directoryStr == "") {
        const element = document.createElement("a");
        const file = new Blob([shortcutData], {type: "text/plain"});
        element.href = URL.createObjectURL(file);
        element.download = "shortcutName.shortcut";
        element.click();
    } else {
        shortcutFile = directoryStr + shortcutName;
        bannerData();
    }

    function bannerData() {
        alertContent = shortcutFile;
        timeoutTime = 3000;
        toggleAlertBanner()
    }
            
// writes the file shortcut
fs.writeFile(shortcutFile, shortcutData, (err) => {
    setTimeout(function () {
        timeoutTime = 1000;
        if (err) {
            alert(err);
            return;
        } else {
                // specify the contents, as a global variable, for the the alert bar
                alertContent = "> Shortcut was successfully compiled and saved";
                    
                // run the alert function which shows an alert on the top alert bar
                toggleAlertBanner();
        }
    }, timeoutTime + 1000);
});`

// run the workspace input as javascript code alongside its dependencies
function createShortcut() {
    workspaceText = editor.doc.getValue(); // this gets the workspace textarea value

    // inside the workspace text inbetween all the code that's commented above
    var necessities = dependenciesStr + workspaceText + "\n" + buildShortcutStr;
    new Function(necessities)(); // run the combined text as a function
}

// * ------------------------ NOTE! From here on out there will be NodeJs code that won't be commented out ------------------------ */
fs = require("fs")

// // autosave workspace area function 
// setInterval(function () {
//     workspaceText = editor.doc.getValue();
//     var saveLocation = "workspace.txt"
//     saveFile();

// }, autoSaveTime);

var chosenFile; // recover the specified workspace using global variable chosenFile
function findFile() {
    // uses Electron path property to get the file path
    chosenFile = document.getElementById("file-upload-btn").files[0].path;
    getWorkspace();
}

// recover the last used workspace
function lastWorkspace() {
    chosenFile = "workspace.txt";
    getWorkspace();
}

// save text function
function saveFile(ev) {
    fs.writeFile(saveLocation, workspaceText, (err) => {
        if (err) {
            alertContent = err;
            toggleAlertBanner();
        } else {
            return
        }
    });
}

// get text function
function getWorkspace(ev) {
    fs.readFile(chosenFile, "utf8", (err, data) => {
        if (err) {
            alertContent = err;
            toggleAlertBanner();
        } else {
            editor.doc.setValue(data)
        }
    });
}