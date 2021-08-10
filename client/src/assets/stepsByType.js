import catalogo from "../assets/images/Compracatalogo-min.png";
import asistida from "../assets/images/Compraasistida-min.png";
import lista from "../assets/images/Compralista-min.png";
import linea from "../assets/images/Compraenlínea-min.png";

export const stepsByType = {
  catalogo: {
    image: catalogo,
    title: 'Compra por Catalogo',
    heading: 'Para hacer este tipo de compras contamos con catálogos digitales de Costco y Bjs.',
    steps: [
      {
        step: 1,
        text: 'Ingresa a nuestro portal',
        description: 'Ingresa en el portal con tu usuario y código y llena en línea los productos que deseas comprar.'
      },
      {
        step: 2,
        text: 'Conforma tu pedido antes del viernes',
        description: 'Recibimos tus pedidos hasta el día viernes, tus productos se comprarán la semana siguiente de recibir la orden.'
      },
      {
        step: 3,
        text: 'Recibe el resumen del pedido y pago',
        description: 'Verifica que todos los productos del pedido estén correctos y que el monto a pagar sea el que se indica al final del pedido.'
      },
      {
        step: 4,
        text: 'Reporte de compra',
        description: 'El jueves o viernes luego de hacer la compra te haremos llegar un reporte con el resumen de la compra y el soporte de la factura.'
      },
      {
        step: 5,
        text: 'Datos del envío',
        description: 'Indícanos cómo quieres que sea tu envío y nosotros nos encargamos de toda la logística de tu carga.'
      },
      {
        step: 6,
        text: 'Espera la mercancia y disfruta',
        description: 'Disfruta'
      },
    ]
  },
  lista: {
    image: lista,
    title: 'Compra por Lista',
    heading: 'Esta modalidad funciona para compras en Walmart o Dollar Tree. Si sabes en detalle los productos que quieres comprar pero no están en internet esta es tu opción.',
    steps: [
      {
        step: 1,
        text: 'Formato de lista',
        description: 'Solicítanos el formato de lista, llénalo y énvialo a compras@grupoigg2000.com. Si son productos muy específicos recuerda siempre enviarnos una foto para nuestra referencia.'
      },
      {
        step: 2,
        text: 'Realiza tu pago',
        description: 'Verifica que todos los productos estén correctos y procede al pago vía Zelle, PayPal, Apple Pay, o una transferencia directa a BOFA.'
      },
      {
        step: 3,
        text: 'Reporte de compra',
        description: 'El jueves o viernes luego de hacer la compra te haremos llegar un reporte con el resumen de la compra y el soporte de la factura.'
      },
      {
        step: 4,
        text: 'Datos del envío',
        description: 'Indícanos cómo quieres que sea tu envío y nosotros nos encargamos de toda la logística de tu carga.'
      },
      {
        step: 5,
        text: 'Espera la mercancia y disfruta',
        description: 'Disfruta'   
      },
    ]
  },
  asistida: {
    image: asistida,
    title: 'Compra Asistida',
    heading: 'Para hacer este tipo de compras contamos con catálogos digitales de Costco y Bjs.',
    steps: [
      {
        step: 1,
        text: 'Ingresa a nuestro portal',
        description: 'Ingresa en el portal con tu usuario y código y llena en línea los productos que deseas comprar.'
      },
      {
        step: 2,
        text: 'Conforma tu pedido antes del viernes',
        description: 'Recibimos tus pedidos hasta el día viernes, tus productos se comprarán la semana siguiente de recibir la orden.'
      },
      {
        step: 3,
        text: 'Recibe el resumen del pedido y pago',
        description: ' Verifica que todos los productos del pedido estén correctos y que el monto a pagar sea el que se indica al final del pedido.'
      },
      {
        step: 4,
        text: 'Reporte de compra',
        description: 'El jueves o viernes luego de hacer la compra te haremos llegar un reporte con el resumen de la compra y el soporte de la factura.'
      },
      {
        step: 5,
        text: 'Datos del envío',
        description: 'Indícanos cómo quieres que sea tu envío y nosotros nos encargamos de toda la logística de tu carga.'
      },
      {
        step: 6,
        text: 'Espera la mercancia y disfruta',
        description: ''
      },
    ]
  },
  linea: {
    image: linea,
    title: 'Compra en Linea',
    heading: 'Este formato funciona para las compras en páginas que no puedes pagar o que no te deje completar la compra.',
    steps: [
      {
        step: 1,
        text: 'Envía la lista con los producto',
        description: `Envíanos el link y lista de compras a compras@grupoipg2000.com, nos comunicaremos contigo para indicarte el resumen de la compra y el monto a pagar.`
      },
      {
        step: 2,
        text: 'Realiza tu pago',
        description: 'Verifica que todos los productos estén correctos y procede al pago vía Zelle, PayPal, Apple Pay, o una transferencia directa a BOFA.'
      },
      {
        step: 3,
        text: 'Control de la compra',
        description: 'Una vez realizada da la compra debes estar atento a las fotos que te enviamos para ir haciendo tu check list.'
      },
      {
        step: 4,
        text: 'Datos del envío',
        description: 'Indícanos cómo quieres que sea tu envío y nosotros nos encargamos de toda la logística de tu carga'
      },
      {
        step: 5,
        text: 'Espera la mercancia y disfruta',
        description: 'Disfruta'
      },
    ]
  }
}