controller.register = async function(registerInfo) {
    // 1. create user with email + password
    // 2. update user's displayName = firstname + " " + lastname
    // 3. send user an email varification
    let email = registerInfo.email
    let password = registerInfo.password
    let displayName = registerInfo.firstname + ' ' + registerInfo.lastname
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
        view.enable('login-submit-btn')
    }
}