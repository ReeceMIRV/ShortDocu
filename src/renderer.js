const banner = document.getElementById("banner");
const bannerAlert = document.getElementById("alert");
const rightColumn = document.getElementById("right-column")

const snippetContainer = document.getElementById("snippet-container");
const snippets = snippetContainer.getElementsByTagName("li");


let timeoutTime = 1000; let autoSaveTime = 5000;
let response, snippetObj, selectedText, clickedItem;
let snippetName, snippetContent, htmlSnippetContent;
let newClickedItem;

getSnippetJSON() // load all the snippets on startup

async function getSnippetJSON() {
    response = await fetch("snippets.json");
    snippetObj = await response.json()

    try {
        // create a new elements list based off of the snippets json file
        for (const snippetName of Object.keys(snippetObj)) {
            // create a container for the objectKey (snippetName)
            const ulElement = document.createElement("ul");
            const liElement = document.createElement("li");
            const liAttribute = liElement.setAttribute("draggable", true)

            // container will look like this <div "snippet-container"><ul><li draggable="true">snippetName</li></ul></div>
            liElement.append(snippetName); 
            ulElement.append(liElement);
            snippetContainer.appendChild(ulElement);
        }

        // add event listeners to the newly added elements
        for (let i=0; i < snippets.length; i++) {
            snippets[i].addEventListener("click", overflow);
            snippets[i].addEventListener("dragstart", dragSnippets);
        }

    } catch(err) {
        console.log(err)
    }
}

function overflow(ev) {
    // if something else is already overflowing, then close it.
    if (snippetContainer.querySelectorAll(".overflow").length > 0) removeOverflow();
    if (ev.target !== ev.currentTarget) return;

    clickedItem = ev.target
    clickedItem.parentNode.classList.toggle("overflow");

    snippetName = clickedItem.innerHTML
    snippetContent = snippetObj[snippetName]

        // modify the syntax content to be html appropriate with line breaks
        htmlSnippetContent = `<pre><code>${snippetContent}</code></pre>`;
        clickedItem.innerHTML = htmlSnippetContent;

        // manipulate event listeners to have control of elements clicked
        clickedItem.removeEventListener("click", overflow)
        clickedItem.children[0].addEventListener("click", removeOverflow);

        // scroll the content into view
        clickedItem.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});

}

function removeOverflow(ev) {
    // remove the recently added html tags, and replace the snippet name, eventlistener
    clickedItem.removeChild(clickedItem.childNodes[0])
    clickedItem.append(snippetName)
    clickedItem.addEventListener("click", overflow)

    // toggle class back to no overflow
    clickedItem.parentNode.classList.toggle("overflow");
}

// add drag functionality to right column & run copyText() if put in left column
function dragSnippets(ev) {
    // if there is a child element that means there's overflow therefore we just need the snippetContent which is already in display
    if (ev.target.childElementCount > 0) {
        snippetContent = ev.target.children[0].innerText
    } else {
        snippetName = ev.target.innerHTML
        snippetContent = snippetContent = snippetObj[snippetName]
    }

    ev.dataTransfer.setData("text", snippetContent + "\n")
    window.getSelection(ev).empty(ev);
}


// copy innerHTML
function copyInnerHtml(ev) {
    selectedText = ev.target.innerHTML;
    copyText();
}

function copyText() {
    // copy text to clipboard
    // specify the contents, as a global variable, for the the alert bar
    // run the alert function which shows an alert on the top bar

    navigator.clipboard.writeText(selectedText);
    alertContent = "> Copied Element to Clipboard";
    toggleAlertBanner();
}

// displays the content inside the alert bar with the specified content
function toggleAlertBanner(ev) {
    bannerAlert.innerHTML = alertContent;
    bannerAlert.classList.add("active");

    setTimeout(function() {
        bannerAlert.classList.remove("active");
    }, timeoutTime)
}

function filter() { // filter through snippets & hide anything that doesn't match (search bar)
    var searchFilter = document.getElementById("searchFilter").value.toUpperCase();

    for (var i = 0; i < snippets.length; i++) {
        var theElement = snippets[i];
        var innerContent = theElement.textContent || theElement.innerText;

        if (innerContent.toUpperCase().indexOf(searchFilter) > -1) {
            theElement.parentElement.classList.remove("hide");

        } else {
            theElement.parentElement.classList.add("hide");
        }
    } 
}

// TODO ------------- HOPEFULLY IMPLIMENT THE THINGS DOWN BELOW ------------- */
    // TODO... continue working on the "createSnippet" actions

    // make picking an icon for the shortcut easy, add a section for that with icon images
    // check to see what all the dependencies are and if they can all be stored in every shortcut.
    // figure out a way to store all the values. or maybe webscrape? All the functionality commands to make a shortcut
    // make it so there is a file that is read from for each description/ input from commands in every shortcut when clicked to view
    // add an "if error" throw to this function if it does not create a shortcut explaining possiblilites why and the error itself
    // outline seperate commands in their own boxes in textarea
    // create custom snippets
    // create default snippets
    // create a context menu right click: copy, paste, create custom snippet, create default snippet, export snippet
    // set categories for documents, scripts, text, etc and then inner (use shortcuts ios app as reference)
    // create a custom view when dragging to either show it inline or look nice or just a line so it doesn't block view
    // add an option to also download the a shortcut to export shortcuts. either that or make it so there's a link that leads one automatically download these shortcuts.
    // make it so you can both save workspace text as a file AND also add an auto save feature so the content doesn't get lost on reload. *note* maybe add an option to set the extension when exporting the shortcut to .txt for example as the alternative to saving the content.
    // add a folder location where all the shortcuts are stored or data. also add the option to change its directory.
    // add aspect where if there's already text on the line then paste it one line under.

    // NOTE all of this is on CodeMirror
    // panels?
    // merge View?!!!!!
    // look into colorize runmode

    // custom banner color option
    // custom font size
    // tab out function

    // include hints

    // add themes in settings

    // add a file select menu
    // add a run js feature

    // exit menu view (hover) on click
    // add keybinds to all the submenu items

    /* Get Name of file
    if no name then
    create file and ask for its location */