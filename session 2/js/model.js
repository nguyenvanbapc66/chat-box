// save all datas
const model = {
    conversations: null, // tất cả cuộc hội thoại người dùng tham gia
    currentConversation: null // cuộc hội thoại người dùng đang chọn
}

model.saveConversations = function(conversations){
    model.conversations = conversations
}

model.saveCurrentConversation = function(conversation){
    model.currentConversation = conversation
}

model.updateConversation = function(conversation){
    // 1. if conversation not yet exits in model.conversations >> add to model
    // 2. if conversation already exits in model.conversations >> replace old by new
    let exitedIndex = model.conversations.findIndex(function(c){
        return c.id == conversation.id
    })
    if(exitedIndex >= 0){
        model.conversations[exitedIndex] = conversation;
    } else{
        model.conversations.unshift(conversation)
    }
}