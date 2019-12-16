// save all business logic
const controller = {}

controller.register = async function(registerInfo) {
    // 1. create user with email + password
    // 2. update user's displayName = firstname + " " + lastname
    // 3. send user an email varification
    let email = registerInfo.email
    let password = registerInfo.password
    let displayName = registerInfo.firstname + registerInfo.lastname
    view.setText('register-error', '')
    view.setText('register-sucess', '')
    view.disable('register-submit-btn')
    try{
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        await firebase.auth().currentUser.updateProfile({
            displayName: displayName
        })
        await firebase.auth().currentUser.sendEmailVerification()
        view.setText('register-sucess', 'An email verification has been sened to your email address')
    } catch(err){
        view.setText('register-error', err.message)
    }
    view.enable('register-submit-btn')
}

controller.login = async function(loginInfo) {
    // firebase.auth().signInWithEmailAndPassword()
    let email = loginInfo.email;
    let password = loginInfo.password;
    view.setText('login-error', '');
    view.disable('login-submit-btn');
    try{
        let result = await firebase.auth().signInWithEmailAndPassword(email, password);
        // if(result.user && result.user.emailVerified){
        //     view.showComponents('chat');
        // } else{
        //     throw new Error('You must verify your email');
        // }
        if(!result.user || !result.user.emailVerified){
            throw new Error('You must verify your email');
        }
    } catch(err){
        view.setText('login-error', err.message)
        view.enable('login-error')
    }
}

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
        })

        view.enable('add-message-btn')
        document.getElementById('message-input').value = ''
    }
    
    // await firebase
    //     .firestore()
    //     .collection('conversations')
    //     .doc(id)
    //     .onSnapshot(function(doc) {
    //         var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
    //         console.log(source, " data: ", doc.data());
    //     })
}

async function demoQueryDatabase(){
    // common format: firebase.firestore().collection('name'){ ... }.command()
    // 1. read .get()

    // getMany
    // let result = await firebase
    //     .firestore()
    //     .collection('conversations')
    //     // where('users')
    //     .where('title', '==', "First conversation")
    //     .get()
    // console.log("result get many", tranformDocs(result.docs))

    // // getOne
    // let id = 'vP0jmMzLVvqNAcxxzAJQ'
    // let result2 = await firebase
    //     .firestore()
    //     .collection('conversations')
    //     .doc(id)
    //     .get()
    // console.log("result get one", tranformDoc(result2)) 

    // 2. create .add()
    // let data = {
    //     users: ["email1", "email2"],
    //     message: [],
    //     title: "Demo conversation",
    //     createAt: new Date().toISOString()
    // }
    // let result3 = await firebase
    //     .firestore()
    //     .collection('conversations')
    //     .add(data)
    // console.log("result add", result3.id)

    // 3. update .update()
    let id2 = 'qnSBHmf3ZnIsNieHQ7OC'
    await firebase
        .firestore()
        .collection('conversations')
        .doc(id2)
        .update({
            // title: 'Update title',
            // test: 123456789
            message: firebase.firestore.FieldValue.arrayUnion('user3')
        })
    console.log("result update")

    // 4. delete .remove()
//     let id3 = '5myOYtVs81otlJrvGtCu'
    
//     await firebase
//         .firestore()
//         .collection('conversations')
//         .doc(id3)
//         .delete()
//     console.log("result delete")
}

function tranformDocs(docs){
    let datas = [];
    for(let doc of docs){
        let data = doc.data();
        data.id = doc.id;
        datas.push(data);
    }
    return datas;
}

function tranformDoc(doc){
    let data = doc.data()
    data.id = doc.id
    return data
}