controller.loadConversations = async function(){
    // 1. load data form db
    let currentEmail = firebase.auth().currentUser.email
    
    let result = await firebase
        .firestore()
        .collection('conversations')
        .where('user', 'array-contains', currentEmail)
        .get();
    let docs = result.docs;
    let conversations = tranformDocs(docs);

    // 2. save data to model
    model.saveConversations(conversations)
    if(conversations.length){
        let currentConversation = conversations[0]
        model.saveCurrentConversation(currentConversation)
    }

    // 3. display data
    view.showCurrentConversation()
    view.showListConversations()

    // TODO: remove the line below
    // demoQueryDatabase()
}

controller.setupDatabaseChange = function(){
    let currentEmail = firebase.auth().currentUser.email
    let isFirstRun = true

    firebase
        .firestore()
        .collection('conversations')
        .where('user', 'array-contains', currentEmail)
        .onSnapshot(function(snapshot){
            if(isFirstRun){
                isFirstRun = false
                return
            }
            let docChanges = snapshot.docChanges()
            for(let docChange of docChanges){
                if(docChange.type == 'modified'){
                    let doc = docChange.doc
                    let conversation = tranformDoc(doc)

                    if(model.currentConversation 
                        && model.currentConversation.id == conversation.id){
                        model.saveCurrentConversation(conversation)
                        view.showCurrentConversation()
                    }
                }
                if(docChange.type == 'added'){
                    let conversation = tranformDoc(docChange.doc)
                    model.updateConversation(conversation)
                    view.showListConversations()
                }
                if(docChange.type == 'removed'){
                    // update model
                    // update view
                    let conversation = tranformDoc(docChange.doc)

                    model.removeConversation(conversation)
                    if(model.isCurrentConversation(conversation)){
                        if(model.hasMoreConversation()){
                            model.saveCurrentConversation(model.conversations[0])
                        } else{
                            model.saveCurrentConversation(null)
                        }
                    }
                    view.showListConversations()
                    view.showCurrentConversation()
                }
            }
        })
}

controller.addMessage = async function(message){
    if(model.currentConversation){
        let currentId = model.currentConversation.id
        view.disable('add-message-btn')

        await firebase
        .firestore()
        .collection('conversations')
        .doc(currentId)
        .update({
            messages: firebase.firestore.FieldValue.arrayUnion(message)
            // users: firebase.firestore.FieldValue.arrayremove()
        })

        view.enable('add-message-btn')
        document.getElementById('message-input').value = ''
    }
}

controller.addConversation = async function(conversationTitle, friendEmail){
    view.disable('form-add-conversation-btn')
    try{
        let signInMethods = await firebase
            .auth()
            .fetchSignInMethodsForEmail(friendEmail)
        if(!signInMethods.length){
            throw new Error('Friend email not yet registered!')
        }
        if(friendEmail == firebase.auth().currentUser.email){
            throw new Error('Do not enter your email')
        }
        let conversation = {
            createAt: new Date().toISOString(),
            messages: [],
            tittle: conversationTitle,
            user: [
                firebase.auth().currentUser.email,
                friendEmail
            ]
        }
    
        await firebase
            .firestore()
            .collection('conversations')
            .add(conversation)
    } catch(err){
        view.setText('title-error', err.message)
    }
    
    document.getElementById('friend-email-input').value = ''
    document.getElementById('title-email').value = ''
    
    view.enable('form-add-conversation-btn')
}

controller.leaveCurrentConversation = async function(){
    if(model.currentConversation){
        let currentId = model.currentConversation.id
        let userCurrent = firebase.auth().currentUser.email
        view.disable('leave-current-conversation-btn')

        await firebase
        .firestore()
        .collection('conversations')
        .doc(currentId)
        .update({
            user: firebase.firestore.FieldValue.arrayRemove(userCurrent)
        })
        
        view.enable('leave-current-conversation-btn')
    }
}