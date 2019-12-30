view.showCurrentConversation = function(){
    if(model.currentConversation){
        let messages = model.currentConversation.messages
        let listMessages = document.getElementById('list-messages')
        listMessages.innerHTML = ""

        for(let message of messages){
            let contentMessage = message.content // nếu contentMessage mình nhập vào rỗng thì ko addMessage 
            let ownerUser = message.owner
            let currentUserEmail = firebase.auth().currentUser.email
            let className = ""

            if(contentMessage){
                if(ownerUser == currentUserEmail){
                    className = "message your"
                } else{
                    className = "message"
                }
    
                let html = `
                    <div class="${className}">
                        <span>${contentMessage}</span>
                    </div>
                `
                
                listMessages.innerHTML += html;
            }
        }

        listMessages.scrollTop = listMessages.scrollHeight

        // show data of aside right
        let userEmails = model.currentConversation.user
        let detailCurrentConversation = document.getElementById('detail-current-conversation')
        detailCurrentConversation.innerHTML = ""

        for(let userEmail of userEmails){
            let html = `
                <div class="user-email">${userEmail}</div>
            `

            detailCurrentConversation.innerHTML += html
        }

        let createAt = model.currentConversation.createAt
        detailCurrentConversation.innerHTML += `
            <div class="create-at">${createAt}</div>
        `

        // leave conversation click handler
        let leaveCurrentConversationBtn = document.getElementById('leave-current-conversation-btn')
        leaveCurrentConversationBtn.onclick = leaveCurrentConversation

        function leaveCurrentConversation(){
            controller.leaveCurrentConversation()
        }
    } else{
        let listMessages = document.getElementById('list-messages')
        let detailCurrentConversation = document.getElementById('detail-current-conversation')
        listMessages.innerHTML = ''
        detailCurrentConversation.innerHTML = ''
    }
}

// show all of list conversations
view.showListConversations = function(){
    if(model.conversations){
        let conversations = model.conversations
        let listConversations = document.getElementById('list-conversations')
        listConversations.innerHTML = ""

        // show list
        for(let conversation of conversations){
            let tittle = conversation.tittle
            let  id = conversation.id
            let members = conversation.user.length > 1
                ? `${conversation.user.length} members`
                : "1 member"
            let className = (model.currentConversation && model.currentConversation.id == id)
                ? "conversation current"
                : "conversation"

            let html = `
                <div id="${id}" class="${className}">
                    <div class="conversation-title">
                        <span>${tittle}</span>
                    </div>
                    <div class="conversation-members">
                        <span>${members}</span>
                    </div>
                </div>
            `
            
            listConversations.innerHTML += html;
        }

        // add event click conversation
        for(let conversation of conversations){
            let id = conversation.id
            let conversationDiv = document.getElementById(id)
            
            conversationDiv.onclick = conversationClickHandler

            function conversationClickHandler(){
                model.saveCurrentConversation(conversation)
                view.showCurrentConversation()
                view.showListConversations()
            }
        }
    }
}