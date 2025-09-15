document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("teamForm");
  const msg = document.getElementById("msg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const role = document.getElementById("role").value.trim();

    if (!name || !email || !role) {
      msg.textContent = "Please fill out all fields (name, email, role).";
      msg.className = "msg error";
      return;
    }

    msg.textContent = "Registration submitted successfully!";
    msg.className = "msg success";
  });
});
