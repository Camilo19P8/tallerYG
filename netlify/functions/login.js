const { authenticator } = require("otplib");
// const { createClient } = require('@supabase/supabase-js'); // Opcional si usas Supabase

// Exemplo para Supabase
// const supabase = createClient('https://your-supabase-url.supabase.co', 'your-public-anon-key');

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { email, codigoUsuario } = JSON.parse(event.body);

  // Obtener clave secreta del usuario desde la base de datos
  // Ejemplo con Supabase
  // const { data, error } = await supabase.from('usuarios').select('clave_secreta').eq('email', email).single();

  // if (error || !data) {
  //   return { statusCode: 404, body: JSON.stringify({ message: 'Usuario no encontrado' }) };
  // }

  const claveSecreta = data.clave_secreta;

  // Verificar el código TOTP
  const isValid = authenticator.check(codigoUsuario, claveSecreta);

  return {
    statusCode: isValid ? 200 : 401,
    body: JSON.stringify({
      message: isValid ? "Autenticación exitosa" : "Código incorrecto",
    }),
  };
};
