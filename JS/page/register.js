const event_register = document.getElementById("register");
event_register.addEventListener("click", ()=>{ //sự kiện đăng ký
    auth.register({
        email: document.getElementById("email").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        check: document.getElementById("checkbox").checked,
        repassword: document.getElementById("repassword").value
    });
})