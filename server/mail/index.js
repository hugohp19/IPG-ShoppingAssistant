const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const banner = './Banner-min.png';
const logo = './logoIPG-192x192.png'

sgMail.setApiKey(SENDGRID_API_KEY);

exports.sendOrder = (email, name, order) => {
  //order = [{_id, quantity, product: {_id, name, price, store}}]

  const msg = {
    to: email,
    from: `${process.env.FROM_EMAIL}`,
    subject: 'IPG Orden',
    template_id: ' d-9d2aa120ba3648ff9b831025e2a21a9d',
    // text: `Hi ${name}! Welcome to your task manager api.`,
    // dynamic_template_data: {
    //   order: order,
    //   cuenta: 'jode'
    // },
  };

  sgMail.send(msg, (error, result) => {
    if (error) {
        console.log(error);
    } else {
        console.log("That's wassup!");
    }
  });
};

//   html: `
  //   <div>
  //     <h2 style='color: red'}}>IPG - Asistente de Compras</h2>
  //     <h4>¡Hacemos de tus compras un proceso cómodo y fácil!</h4>
  //     <div>
  //       <p>Gracias ${name}, por elegirnos!</p>
  //     </div>
  //     <table>
  //       <tr>
  //         <th>Producto</th>
  //         <th>Cantidad</th>
  //         <th>Precio</th>
  //         <th>Total</th>
  //       </tr>
  //       ${order.forEach(element => {
  //         return `
  //         <tr>
  //           <td>${element.product.name}</td>
  //           <td>${element.quantity}</td>
  //           <td>${element.product.price}</td>
  //           <td>${element.quantity * element.product.price}</td>
  //         </tr>
  //         `
  //       })
          
  //       }
          
  //       <tr>
  //         <td>Jill</td>
  //         <td>Smith</td>
  //         <td>50</td>
  //       </tr>
  //       <tr>
  //         <td>Eve</td>
  //         <td>Jackson</td>
  //         <td>94</td>
  //       </tr>
  //     </table>
  //   </div>
  // `
exports.sendForm = (userInfo) => {
  const {email, nombre, apellido, telefono, tienda, presupuesto, nota } = userInfo;
  sgMail.send({
    to: `${process.env.FROM_EMAIL}`,
    from: `${process.env.FROM_EMAIL}`,
    subject: `Formulario: ${email}`,
    html: `<h2>Datos del Usuario</h2><ul><li>Email: ${email}</li><li>Nombre: ${nombre}</li><li>Apellido: ${apellido}</li><li>Telefono: ${telefono}</li><li>Presupuesto: ${presupuesto}</li><li>Nota: ${nota}</li></ul>`
  });
};

exports.sendOrder = (userInfo, order, store) => {
  const {email, nombre, apellido } = userInfo;
  sgMail.send({
    to: `${process.env.FROM_EMAIL}`,
    from: email,
    subject: `Order: ${email}`,
    html: `<h2>Datos del Usuario</h2><ul><li>Email: ${email}</li><li>Nombre: ${nombre}</li><li>Apellido: ${apellido}</li></ul>
    <div>
    ${store}
    {{#each order}}
      order.name
      order.quantity
    {{/each}}
    </div>`

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

exports.forgotPasswordEmail = (email, token) => {
  const exampleHTMLEmail = `<a target="_blank" rel="noopener noreferrer" href="${process.env.APP_URL}/api/password/${token}">Reset Password</a>`;

  sgMail.send({
    to: email,
    from: process.env.FROM_EMAIL,
    subject: 'Password Reset',
    html: exampleHTMLEmail
  });
};
