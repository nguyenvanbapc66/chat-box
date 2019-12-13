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