import{generateBotAnswer} from 'backend/chatbot';
import{sendChatMessage} from 'backend/wix-chat';
$w.onReady(function () {
    let messages = [];

    const logMessage = (role,content)=>{
        const message = {
            role,
            content,
        }
        messages.push(message);
    }

    $w("#wixChat").onMessageSent( async (message)=>{
        const channelId = message.channelId;
        const messageText = message.payload.text;
        logMessage("user",messageText);
        const answer = await generateBotAnswer(messages);
        logMessage(answer.role, answer.content);
        sendChatMessage(answer.content, channelId);
    })
});