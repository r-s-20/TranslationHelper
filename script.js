let translations = [];
let en = {};
let de = {};

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
  let html = "";
  translations.forEach((translation, i) => {
    html += `
        <div class="translationLine" >
            <div class="outputLine">
                <span>${translation.key}</span>
                <span>|</span>
                <span>${translation.english}</span>
                <span>|</span>
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
        '${translation.key}': '${translation[lang]}'
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