let translations = [];
let en = {};
let de = {};
let oLastUrl = null;

function saveLine() {
  let key = readTextInput("inputKey");
  let english = readTextInput("inputEnglish");
  let german = readTextInput("inputGerman");
  addTranslation(key, english, german);
  renderTranslations();
  renderJsons();
  saveJsons();
  cleanInputFields();
  document.getElementById("inputKey").focus();
}

function showPreview() {
  let preview = document.getElementById("previewJson");
  let curtain = document.getElementById("curtain");
  preview.classList.remove("d-none");
  curtain.classList.remove("d-none");
}

function hidePreview() {
  let preview = document.getElementById("previewJson");
  let curtain = document.getElementById("curtain");
  preview.classList.add("d-none");
  curtain.classList.add("d-none");
}

function openMenu() {
  let menu = document.getElementById("menu");
  let curtain = document.getElementById("curtain");
  menu.classList.remove("d-none");
  curtain.classList.remove("d-none");
}

function closeMenu() {
  let menu = document.getElementById("menu");
  let curtain = document.getElementById("curtain");
  menu.classList.add("d-none");
  curtain.classList.add("d-none");
}

function readTextInput(id) {
  let container = document.getElementById(id);
  return container.value;
}

function cleanInputFields() {
  cleanInputField("inputKey");
  cleanInputField("inputEnglish");
  cleanInputField("inputGerman");
}

function cleanInputField(id) {
  document.getElementById(id).value = "";
}

function setInput(id, value) {
  document.getElementById(id).value = value;
}

function addTranslation(key, english, german) {
  translations.push({
    "key": key,
    "english": english,
    "german": german,
  });
}

function renderTranslations() {
  let renderContainer = document.getElementById("renderOutput");
  let html = "";

  translations.forEach((translation, i) => {
    html += `
        <div class="translationLine" >
            <div class="outputLine">
                <span>${translation.key}</span>
                <span>${translation.english}</span>
                <span>${translation.german}</span>
            </div>  
            <div class=buttonContainer>
                <button onclick=editLine(${i}) name="edit" title="edit line" ><img src="./img/edit.svg" alt="">
                </button>
                <button title="delete Line" onclick=deleteLine(${i})>X</button>
            </div>
        </div>
        `;
  });
  renderContainer.innerHTML = html;
}

function resetAll() {
  if (confirm("This will delete the whole list. Are you sure?")) {
    translations = [];
    renderTranslations();
    renderJsons();
  }
}

function editLine(i) {
  setInput("inputKey", translations[i].key);
  setInput("inputEnglish", translations[i].english);
  setInput("inputGerman", translations[i].german);
  deleteLine(i);
}

function deleteLine(i) {
  translations.splice(i, 1);
  renderTranslations();
  renderJsons();
}

function renderJsons() {
  container = document.getElementById("enJson");
  container.innerHTML = generateJson("english");
  container = document.getElementById("deJson");
  container.innerHTML = generateJson("german");
}

function generateJson(lang) {
  let jsonText = "{<br>";
  translations.forEach((translation, i) => {
    jsonText += `
        "${translation.key}": "${translation[lang]}"
    `;
    if (i < translations.length - 1) jsonText += ",<br>";
  });
  jsonText += "<br>}";
  return jsonText;
}

function saveJsons() {
  de = document.getElementById("deJson").innerText;
  en = document.getElementById("enJson").innerText;
}

function exportJson() {
  const enBlob = new Blob([JSON.stringify(en)], {
    type: "application/json",
  });
}

function downloadFile(file, name) {
  let oBlob, elLink;

  // Letzte Objekt-URL löschen (falls vorhanden)
  if (oLastUrl == null) {
    window.URL.revokeObjectURL(oLastUrl);
    oLastUrl = null;
  }

  // Blob-Objekt erzeugen
  oBlob = new Blob([file], { type: "application/json" });

  // Download-Element laden
  elLink = document.getElementById("downloadLink");

  // URL erzeugen und merken
  oLastUrl = window.URL.createObjectURL(oBlob);

  // URL dem HTML-Element zuweisen
  elLink.href = oLastUrl;

  elLink.download = name;

  // Klick auslösen
  elLink.click();
}

document.getElementById("inputKey").addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    document.getElementById("inputEnglish").focus();
  }
});

document.getElementById("inputEnglish").addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    document.getElementById("inputGerman").focus();
  }
});

document.getElementById("inputGerman").addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    saveLine();
  }
});
