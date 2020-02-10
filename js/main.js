window.onload = init;

function init() {
    firebase.auth().onAuthStateChanged(function(user){
        if(view.currentComponent == 'register'){
            return 
        }
        if(user && user.emailVerified){
            console.log(user)
            view.showComponents('chat');
        } else{
            view.showComponents('login');
        }
    });
}