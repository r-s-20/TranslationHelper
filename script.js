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
  //   cleanInputFields();
  document.getElementById("inputKey").focus();
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
  let html = `
    <div class="translationLine" >
        <div class="outputLine">
            <span><strong>Key</strong></span>
            <span><strong>English</strong></span>
            <span><strong>German</strong></span>
        </div> 
        <div class=buttonContainer></div>
    </div>
        `;

  translations.forEach((translation, i) => {
    html += `
        <div class="translationLine" >
            <div class="outputLine">
                <span>${translation.key}</span>
                <span>${translation.english}</span>
                <span>${translation.german}</span>
            </div>  
            <div class=buttonContainer>
                <button onclick=editLine(${i})>edit</button>
                <button onclick=deleteLine(${i})>del</button>
            </div>
        </div>
        `;
  });
  renderContainer.innerHTML = html;
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
  console.log("saving", de);
}

function exportJson() {
  const enBlob = new Blob([JSON.stringify(en)], {
    type: "application/json",
  });
  console.log(enBlob.text());
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
