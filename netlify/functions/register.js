const otplib = require("otplib");
const qrcode = require("qrcode");

exports.handler = async (event) => {
  const { email, name, password, phone } = JSON.parse(event.body);

  if (!email || !name || !password || !phone) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Faltan datos de registro." }),
    };
  }

  const secret = otplib.authenticator.generateSecret();
  const otpauth = otplib.authenticator.keyuri(email, "MiApp", secret);

  try {
    const qrImageUrl = await qrcode.toDataURL(otpauth);
    const users = {}; // Simulación de base de datos

    users[email] = { name, password, phone, secret };

    return {
      statusCode: 201,
      body: JSON.stringify({ qrImageUrl }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al generar QR." }),
    };
  }
};
