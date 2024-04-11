const leftColumn = document.getElementById("left-column"); // you can omit this. codeMirror will still processes the parameter properly

var editor = CodeMirror.fromTextArea(leftColumn, {
    mode: "javascript",
    theme: "darcula-modified", // make sure to import the theme used
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    highlightSelectionMatches: true,
    styleActiveLine: true,
    lineWrapping: false, // default is false
    showCursorWhenSelecting: false, // default is false
    allowDropFileTypes: true,

    scrollbarStyle: "overlay",
    extraKeys: {
        "Ctrl-P": "autocomplete", // predict syntax or show hint
        "Ctrl-F": "findPersistent", // don't close "find" after first word this is overriding it's usual behavior
        "Ctrl-R": "replace", //default replace shortcut which is ctrl-shift-f
        "Shift-Ctrl-F": "find", // this was originally ctrl-f but only finds once

        "Ctrl-Alt-C": "toggleComment",
        "Ctrl-Tab": "goWordRight",

        "Ctrl-U": "goLineUp",
        "Ctrl-D": "goLineDown",

        "Ctrl-[": "indentLess",
        "Ctrl-]": "indentMore",
        
        // sublime keymap
        "Alt-Down": "swapLineDown",
        "Alt-Up": "swapLineUp",
        "Shift-Alt-Down": "duplicateLine", // use the one I made, this one is iffy
        "Ctrl-L": "selectLine", // i kind of like this one better but the one I made works too.

        // custom keymap
        "Ctrl-S": () => saveWorkspace(),
        "Shift-Ctrl-S": () => saveAs(),

        "F11": () => toggleFullScreen(),
        "Esc": () => {
          if(banner.classList.contains("hide") && saveBlock.classList.contains("hide") && compileBlock.classList.contains("hide")) {
            toggleFullScreen();
          }
        }
    },
});

editor.setSize("100%", "calc(100% - 3px)");

// set font size
function setFontSize() {
  var editorStyle = document.querySelector(".CodeMirror")
  editorStyle.style.fontSize="20px"
}
// change theme
function setTheme() {
  var link; var theme = "darcula";

  // create a <link> tag which appends to the document head to import the specified css theme from the "themes folder"
  link = document.createElement("link");
  link.id = "themeStyle";
  link.rel = "stylesheet";
  link.href = `codemirror-5.62.2/theme/${theme}.css`
  document.head.appendChild(link)

  // set the new editor theme
  editor.setOption("theme", theme);
}

// mark text usage
// editor.markText({line:0,ch:1},{line:3,ch:1}, {css: "font-size:20pt"});