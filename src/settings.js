const saveBlock = document.getElementById("save-block");
const compileBlock = document.getElementById("compile-block");
const workspaceContainer = document.getElementById("workspace-container");


// TODO make sure to add a setting that toggles all of these

// hide banner element
// hide the lower bottom element
// hide the lower bottom element

toggleBanner = () => banner.classList.toggle("hide");
toggleSaveBlock = () => saveBlock.classList.toggle("hide");
toggleCompileBlock = () => compileBlock.classList.toggle("hide");


// hide the right column
function toggleRightColumn() {
    rightColumn.classList.toggle("hide")
    editor.setSize("calc(100vw - 19px)", null);
}

// full screen size editor
function toggleFullScreen() {
    toggleBanner();
    toggleSaveBlock();
    toggleCompileBlock();
    toggleRightColumn();
}

// * --------------------------------------------- Keyboard Shortcuts -------------------------------------------- */

// TODO fix
// // prevent refresh when using keybinds
// window.addEventListener("keydown", function(ev) {
//     if (ev.key == ("CtrlorCmd", "r") || ("CtrlorCmd", "R")) {
//         ev.preventDefault();
//     } else {
//         return
//     }
// });