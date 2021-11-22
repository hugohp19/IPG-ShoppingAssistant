const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const banner = './Banner-min.png';
const logo = './logoIPG-192x192.png'

sgMail.setApiKey(SENDGRID_API_KEY);

exports.sendForm = (userInfo) => {
  const {email, nombre, apellido, telefono, tienda, presupuesto, nota } = userInfo;
  sgMail.send({
    to: `${process.env.FROM_EMAIL}`,
    from: `${process.env.FROM_EMAIL}`,
    subject: `Formulario: ${email}`,
    template_id: 'd-9d2aa120ba3648ff9b831025e2a21a9d',
    html: `<h2>Datos del Usuario</h2><ul><li>Email: ${email}</li><li>Nombre: ${nombre}</li><li>Apellido: ${apellido}</li><li>Telefono: ${telefono}</li><li>Presupuesto: ${presupuesto}</li><li>Nota: ${nota}</li></ul>`
  });
};

exports.sendOrderToUser = (email, name, order) => {
  sgMail.send({
    to: email,
    cc: process.env.FROM_EMAIL,
    from: `${process.env.FROM_EMAIL}`,
    subject: `Orden Ingresada`,
    template_id: 'd-9d2aa120ba3648ff9b831025e2a21a9d',
    dynamicTemplateData: {
      name: name,
      order: order
    },
  });
};

exports.sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: `${process.env.FROM_EMAIL}`,
    subject: 'Thanks for signing up.',
    text: `Hi ${name}! Welcome to your task manager api.`
  });
};

exports.sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: `${process.env.FROM_EMAIL}`,
    subject: 'Sorry to see you go.',
    text: `Bye ${name}. Hope to see you soon.`
  });
};

exports.forgotPasswordEmail = (email, token, name) => {
  sgMail.send({
    to: email,
    from: process.env.FROM_EMAIL,
    subject: 'Password Reset',
    TemplateId: 'd-bba529307b974c1c9188b8fb491c9718',
    dynamicTemplateData: {
      name: name,
      resetLink: `${process.env.APP_URL}/api/password/${token}`
    },
  });
};
