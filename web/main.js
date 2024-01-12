const LAMBDA_URL = "<lambda url here>";

const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

const BOT_IMG = "joe_img.png";
const PERSON_IMG = "user_img.png";
const BOT_NAME = "JoeGPT";
const PERSON_NAME = "";

const CONVO = [];

msgerForm.addEventListener("submit", event => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) return;

  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = "";

  build_convo("user", msgText);
  botResponse(CONVO);
});

function build_convo(role, message){
  if (CONVO.length > 5) {
    CONVO.shift();
    CONVO.shift();
  }

  CONVO.push( { "role": role, "content": message });
}

function appendMessage(name, img, side, text) {
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate()}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function botResponse(inText) {
    getChat(inText).then(function(msgText){ 
      appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
    });
}

async function getChat(inText) {
  console.log(JSON.stringify(inText))
  
  const response = await fetch(LAMBDA_URL, 
  {
    method: "POST",
    body: JSON.stringify(inText),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  }
  );
  const jsonData = await response.json();
  console.log(jsonData);
  const text = jsonData['content']
  build_convo("assistant", text);
  console.log(CONVO);
  return text
}

function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate() {
  const d = new Date().toLocaleString().replace(',','')
  return d
}
