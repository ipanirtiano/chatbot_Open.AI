
const inputChat = document.querySelector('.chat-input textarea');
const chatBox = document.querySelector('.chatbox');
const tombolKirim = document.querySelector('.chat-input span');
const API_KEY = "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";
let userChat;


const createChatLi = (chat, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `
    <p></p>` : `<span class="material-symbols-outlined">
    Face</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = chat;
    return chatLi;
}


const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}` 
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", content: userChat}]
        })
    }

    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) => {
        messageElement.textContent = "Oopss!.. Something went wrong, please try again.";
    }).finally(() => chatBox.scrollTo(0, chatBox.scrollHeight));
}


const prosesChat = () =>{
    userChat = inputChat.value.trim();
    if(!userChat) return;
    
    chatBox.appendChild(createChatLi(userChat, "outgoing"));
    chatBox.scrollTo(0, chatBox.scrollHeight);

    setTimeout(() =>{
        const incomingChatLi = createChatLi("typing...", "incoming")
        chatBox.appendChild(incomingChatLi);
        chatBox.scrollTo(0, chatBox.scrollHeight);

        generateResponse(incomingChatLi);
    }, 600);
    
    inputChat.value = '';
} 

tombolKirim.addEventListener("click", prosesChat);


