// save html of all screens
const components = {}

components.register = `
    <section class="register-container">
        <form id="form-register" class="form-register">
            <div class="form-header">
                <h3>Messenger</h3>
            </div>
            <div class="form-content">
                <div class="name-wrapper">
                    <div class="input-wrapper">
                        <input type="text" name="firstname" placeholder="First name">
                        <div id="firstname-error" class="message-error"></div>
                    </div>
                    <div class="input-wrapper">
                        <input type="text" name="lastname" placeholder="Last name">
                        <div id="lastname-error" class="message-error"></div>
                    </div>
                </div>
                <div class="input-wrapper">
                    <input type="email" name="email" placeholder="Email">
                    <div id="email-error" class="message-error"></div>
                </div>
                <div class="input-wrapper">
                    <input type="password" name="password" placeholder="Password">
                    <div id="password-error" class="message-error"></div>
                </div>
                <div class="input-wrapper">
                    <input type="password" name="comfirmPassword" placeholder="Comfirm password">
                    <div id="comfirmpassword-error" class="message-error"></div>
                </div>
                <div id="register-error" class="message-error"></div>
                <div id="register-sucess" class="message-sucess"></div>
            </div>
            <div class="form-footer">
                <a id="register-link" href="#">Already have an account? Login</a>
                <button id="register-submit-btn" type="submit">Register</button>
            </div>
        </form>
    </section>
`

components.login = `
    <section class="login-container">
        <form id="form-login" class="form-login">
            <div class="form-header">
                <h3>Messenger</h3>
            </div>
            <div class="form-content">
                <div class="input-wrapper">
                    <input type="email" name="email" placeholder="Email">
                    <div id="email-error" class="message-error"></div>
                </div>
                <div class="input-wrapper">
                    <input type="password" name="password" placeholder="password">
                    <div id="password-error" class="message-error"></div>
                </div>
                <div id="login-error" class="message-error"></div>
            </div>
            <div class="form-footer">
                <a id="login-link" href="#">Not yet have an account? Register</a>
                <button id="login-submit-btn" type="submit">Login</button>
            </div>
        </form>
    </section>
`

components.chat = `
    <section class="chat-container">
        <!-- left -->
        <div class="current-conversation">
            <div id="list-messages" class="list-messages">
            </div>
            <form id="form-add-message" class="form-add-message">
                <div class="input-wrapper">
                    <input id="message-input" type="text" name="message" placeholder="Enter your message here">
                </div>
                <button id="add-message-btn" type="submit">Send</button>
            </form>
        </div>
        <!-- right -->
    </section>
`

components.nav = `
    <nav class="main-nav">
        <div class="user-profile">
            <span id="user-email" class="user-email"></span>
            <button id="sign-out-btn" class="btn-icon">
                <i class="fas fa-sign-out-alt"></i>
            </button>
        </div>
    </nav>
`