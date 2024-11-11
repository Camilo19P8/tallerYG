document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  // Función para generar contraseña aleatoria
  function generateRandomPassword(length) {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  }

  // Manejo de registro de usuario
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const randomPassword = generateRandomPassword(12);

    const token = { password: randomPassword };

    const blob = new Blob([JSON.stringify(token)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "token.json";
    link.click();

    document.getElementById("registerMessage").textContent =
      "Usuario registrado. Archivo de token generado.";
  });

  // Manejo de autenticación
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const fileInput = document.getElementById("tokenFile");
    const file = fileInput.files[0];

    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const token = JSON.parse(e.target.result);
        console.log("Token cargado:", token);

        // Simulación de autenticación exitosa y redirección
        if (token.password) {
          window.location.href = "/profesor.html"; // Redirige a la página de estudiantes
        } else {
          document.getElementById("loginMessage").textContent =
            "Token inválido. Intenta de nuevo.";
        }
      };
      reader.readAsText(file);
    } else {
      document.getElementById("loginMessage").textContent =
        "Por favor, selecciona un archivo .json válido.";
    }
  });
});
