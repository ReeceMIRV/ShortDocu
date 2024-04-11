const { ipcRenderer } = require("electron"); const ipc = ipcRenderer;
const { read } = require("original-fs");

const mainCntxMenu = document.getElementById("main-context-menu");
const subCntxMenu = document.getElementById("sub-context-menu");
const userInput = document.getElementById("user-input");
const inputEnter = document.getElementById("input-enter");


let currentMenu, inputTask, givenInput;

// add different context menus depending on if clicking on the editor vs snippets
workspaceContainer.addEventListener("contextmenu", currContextMenu)

function currContextMenu(ev) {

    if (document.querySelectorAll(".display").length > 0) {
        currentMenu.classList.remove("display")
    }

    if (ev.target.hasAttribute("draggable")) {
        subCntxMenu.classList.add("display");
        currentMenu = subCntxMenu;
    } else {
        mainCntxMenu.classList.add("display");
        currentMenu = mainCntxMenu;
    }

    openContextMenu(ev)
}

function openContextMenu(ev) {
    let menuPositionY = ev.clientY - 16
    let menuPositionX = ev.clientX

    let menuHeight = currentMenu.offsetHeight
    let menuWidth = currentMenu.offsetWidth

    if (menuPositionY + menuHeight > window.innerHeight) {
        menuPositionY = window.innerHeight - 16 - menuHeight
    }
    if (menuPositionX + menuWidth > window.innerWidth) {
        menuPositionX = window.innerWidth - menuWidth
    }

    currentMenu.style.top = menuPositionY + "px";
    currentMenu.style.left = menuPositionX + "px";
}

window.addEventListener("click", () => {
    mainCntxMenu.classList.remove("display");
    subCntxMenu.classList.remove("display");
});

// switch focus to editor (text area) if there is any activity on the editor (ex. menu bar executions that switch focus to menu the but alter text area would then switch the focus back to the editor)
editor.on("cursorActivity", () => {editor.focus()});

// add "noHover" class whenever a submenu item is clicked so that the hover effect dissapears and the submenu closes
const menu = document.getElementById("menu");

document.querySelectorAll(".submenu").forEach(submenu => {
    submenu.addEventListener("click", () => {
        menu.classList.add("noHover");
        setTimeout(function() {
            menu.classList.remove("noHover")
        }, 1); 
    });
});

// * file
// open file
function openFile () {
    var fileUploadBtn = document.getElementById("file-upload-btn")
    fileUploadBtn.click()
}

// save workspace
function saveWorkspace() {
    leftColumnText = editor.doc.getValue();
    saveLocation = "workspace.txt";
    saveFile();
}

// save as
function saveAs() {
    const fs = require("fs")
    leftColumnText = editor.doc.getValue(); // this gets the workspace textarea value

    const element = document.createElement("a");
    const file = new Blob([leftColumnText], {type: "text/plain"});
    element.href = URL.createObjectURL(file);
    element.download = "workspace.js";
    element.click();
}

// exit application
function closeApp() {
    ipc.send("closeApp");
}

// * edit
undo = () => editor.execCommand("undo"); //undo
redo = () => editor.execCommand("redo"); //redo


function cut() { // cut
    copy();
    editor.replaceSelection('');
    editor.execCommand("killLine");
}

function copy() { // copy
    selectedText = window.getSelection().toString();
    copyText();
}

function paste() { // paste
    navigator.clipboard.readText()
    
    .then(text => {
        editor.replaceSelection(text)
    });
}


function find() { // find
    editor.execCommand("findPersistent")
}

// * share
//

// * tools
toggleDevTools = () => ipc.send("toggleDevTools") // toggle dev tools
refreshApp = () => ipc.send("refreshApp") // refresh webpage

// * help
//

// * +

toggleComment = () => editor.execCommand("toggleComment"); // comment
moveLineUp = () => editor.execCommand("swapLineUp"); // move line up
moveLineDown = () => editor.execCommand("swapLineDown"); // move line down
indentLess = () => editor.execCommand("indentLess"); // indent less
indentMore = () => editor.execCommand("indentMore"); // indent more
selectLine = () => editor.execCommand("selectLine"); // select line

// delete line
function deleteLine() {
    editor.execCommand("deleteLine");
    editor.execCommand("goLineEnd");
}

// copy line down // all the executions are necessary or else duplicate line becomes iffy
function copyLineDown() {
    editor.execCommand("splitSelectionByLine");
    editor.execCommand("selectLine");
    editor.execCommand("duplicateLine");
}

// context menu options
function createSnippet() {
    // &nbsp creates a space (necessary because the content is formatted in html)
    inputTask = "&nbsp Input Snippet Name: &nbsp";
    selectedText = window.getSelection().toString();
    if (selectedText = " ") selectedText = editor.doc.getValue();

    showInput();
}

function showInput() {
    bannerAlert.innerHTML = inputTask;
    bannerAlert.classList.add("active");

    userInput.classList.add("active");
    userInput.focus();

    inputEnter.classList.add("active");
}

function hideInput() {
    givenInput = userInput.innerText;

    if (inputTask = "&nbsp Input Snippet Name: &nbsp") {
        // TODO this needs to save the shortcut name as blah blah blah
        console.log(selectedText)
    }

    bannerAlert.innerHTML = "";
    userInput.innerHTML = "";

    bannerAlert.classList.remove("active");
    userInput.classList.remove("active");
    inputEnter.classList.remove("active");
}