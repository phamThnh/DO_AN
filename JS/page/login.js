storage.initData();

const login_event = document.getElementById("btnLogin");

login_event.addEventListener("click", () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  auth.login(username, password);
});

