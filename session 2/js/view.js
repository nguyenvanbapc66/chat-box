// save all UI logic
const view = {
    currentComponent: null
}

view.showComponents = function(name) {
    view.currentComponent = name;
    switch (name) {
        case 'register':
            {
                let app = document.getElementById('app');
                app.innerHTML = components.register;

                let link = document.getElementById("register-link")
                link.onclick = registerLinkClickHandler

                let form = document.getElementById("form-register")
                form.onsubmit = formRegisterSubmitHandler

                function registerLinkClickHandler() {
                    view.showComponents('login')
                }

                function formRegisterSubmitHandler(event) {
                    event.preventDefault() // chan su kien mac dinh >> khong gui thong tin 

                    //1. get info
                    let registerInfo = {
                            firstname: form.firstname.value,
                            lastname: form.lastname.value,
                            email: form.email.value,
                            password: form.password.value,
                            comfirmpassword: form.comfirmPassword.value
                        }
                        //2. validate info
                    let validateResult = [
                        view.validate(registerInfo.firstname, 'firstname-error', 'Invalid firstname!'),
                        view.validate(registerInfo.lastname, 'lastname-error', 'Invalid lastname!'),
                        view.validate(registerInfo.email.includes('@'), 'email-error', 'Invalid email!'),
                        view.validate(registerInfo.password.length >= 6, 'password-error', 'Password must be at least 8 characters'),
                        view.validate(registerInfo.comfirmpassword.length >= 6 && registerInfo.comfirmpassword == registerInfo.password, 'comfirmpassword-error', 'Invalid comfirmpassword!')
                    ]

                    if (allPassed(validateResult)) {
                        // 3. submit info (next session)
                        controller.register(registerInfo)
                    }
                }
                break;
            }
        case 'login':
            {
                let app = document.getElementById('app');
                app.innerHTML = components.login;

                let link = document.getElementById("login-link")
                link.onclick = loginLinkClickHandler

                let form = document.getElementById('form-login')
                form.onsubmit = formLoginSubmitHandler

                function loginLinkClickHandler() {
                    view.showComponents('register')
                }

                function formLoginSubmitHandler(event) {
                    event.preventDefault() // chan su kien mac dinh >> khong gui thong tin

                    //1. get info
                    let loginInfo = {
                        email: form.email.value,
                        password: form.password.value
                    }
                    //2. validate info
                    let validateResult = [
                        view.validate(
                            loginInfo.email && loginInfo.email.includes('@'),
                            'email-error',
                            'Please correct the email address'
                        ),
                        view.validate(
                            loginInfo.password && loginInfo.password.length >= 6,
                            'password-error',
                            'Oops! Wrong username or password'
                        )
                    ]
                    // 3. submit info
                    if (allPassed(validateResult)) {
                        controller.login(loginInfo)
                    }

                }
                break;
            }
        case 'chat':{
            let app = document.getElementById('app');
            app.innerHTML = components.nav + components.chat;

            controller.loadConversations();
            controller.setupDatabaseChange() // new message coming > update message to screen

            let btnSignOut = document.getElementById('sign-out-btn');
            btnSignOut.onclick = signOutClickHandler;

            function signOutClickHandler(){
                firebase.auth().signOut();
                view.showComponents('login');
            }

            view.setText('user-email', firebase.auth().currentUser.email);

            let formAddMessage = document.getElementById('form-add-message')
            formAddMessage.onsubmit = formAddMessageSubmitHandler

            function formAddMessageSubmitHandler(event){
                event.preventDefault()

                let content = formAddMessage.message.value.trim();
                if(!content){
                    return
                }

                let message = {
                    content: content,
                    owner: firebase.auth().currentUser.email,
                    createAt: new Date().toISOString()
                }
                
                
                controller.addMessage(message)
            }
        }
    }
}

view.showCurrentConversation = function(){
    if(model.currentConversation){
        let messages = model.currentConversation.messages
        let listMessages = document.getElementById('list-messages')
        listMessages.innerHTML = ""

        for(let message of messages){

            let contentMessage = message.content
            let ownerUser = message.owner
            let currentUserEmail = firebase.auth().currentUser.email
            let className = ""

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

        listMessages.scrollTop = listMessages.scrollHeight
    }
}

view.setText = function(id, text) {
    document.getElementById(id).innerText = text;
}

view.validate = function(condition, idErrorTag, messageError) {
    if (condition) {
        view.setText(idErrorTag, '')
        return true
    } else {
        view.setText(idErrorTag, messageError)
        return false
    }
}

view.disable = function(id){
    document.getElementById(id).setAttribute('disabled', true)
}

view.enable = function(id){
    document.getElementById(id).removeAttribute('disabled')
}

function allPassed(validateResult) {
    for (let result of validateResult) {
        if (!result) {
            return false
        }
    }
    return true
}

// function validatePassword(password){
//     for(let i = 0; i < password.length; i++){
//         let charAt = password.charAt(i)
//         //validate each character
//     }
// }