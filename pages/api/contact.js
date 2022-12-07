import { mailOptions, transporter } from "../../eshop/config/nodemailer";
import { client, urlFor } from '../../lib/client';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';


const CONTACT_MESSAGE_FIELDS = {
  name: "Jméno",
  email: "Email",
  message: "Poznámky",
};



const generateEmailContent = (data, id, code) => {
  console.log("-----------------------------------------");
  console.log(data)

  let arraywas = false;

  let endOfHTML = "";

  const totalPrice = data?.totalPrice;
  const totalQuantity = data?.totalQuantities;

  const linkOnOrder = id + code;

  let messageForCustomer = "";

  if (!data.isConfirmed) {
    messageForCustomer = `<p>Kliknutim na odkaz potvrdíte objednavku pokodu nepotvrdíte do 24 hodiny objednavka bude automaticky zrušena: <a href="${process.env.DOMAIN}/confirm/${linkOnOrder}">Potvrdit objednávku ${id}</a></p>`
  }
  else {
    messageForCustomer = `<p>Vaše objednávka byla potvrzena můžete si ji vyzvednout u nás na prodejně </p>`
  }

  endOfHTML += `<div class="form-container">
      <p>Celkem položek: <span style="float: right; font-weight: bolder;">${totalQuantity} položek</span></p>
      <p>Celkem: <span style="float: right; font-weight: bolder;">${totalPrice}CZK</span></p>
    </div>`
  const stringData = Object.entries(data).reduce((str, [key, value]) => {
    if (!Array.isArray(value) && !arraywas) {
      str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${value} \n \n`;
    }
    else {
      arraywas = true;
    } return str;
  }, "");


  console.log(stringData);
  arraywas = false;

  const htmlData = Object.entries(data).reduce((str, [key, value]) => {
    if (!Array.isArray(value) && !arraywas) { str += `<h1 class="form-heading" align="left">${CONTACT_MESSAGE_FIELDS[key]}</h1><p class="form-answer" align="left">${value}</p>` } else {
      arraywas = true;
    } return str;
  }, "");

  let prodStr = "";
  Object.entries(data)[3].forEach(element => {
    if (typeof (element) === "object") {


      for (let index = 0; index < element.length; index++) {
        const curentObj = element[index];
        console.log("******************************")
        console.log(curentObj)
        console.log(curentObj.image)

        const linkOnProduct = `${process.env.DOMAIN}/product/` + curentObj.slug?.current;
        const imageOfProduct = urlFor(curentObj.image[0]);
        const nameOfProduct = curentObj.name;
        const detailsOfProduct = curentObj.details;
        const priceOfProduct = curentObj.price;
        const quantityOdProduct = curentObj.quantity;
        prodStr += ` <div class="form-container" >
          <a href=${linkOnProduct} style="text-decoration: none; color: black;">
          <div style="display:inline-flex"><img src=${imageOfProduct}  style="width:100px;height:100px;">
            <div style="margin-left: 25px ; width:400px;height:100px;">
              <h1 style="margin:0">${nameOfProduct}</h1>
              <p >${detailsOfProduct.substring(0, 125)}...</p>
              <p style=" float: right; font-weight: bolder;margin:0;margin-right: 55px;">${priceOfProduct}CZK</p>
              <p style=" float: left; font-weight: bolder;margin:0">${quantityOdProduct}x</p>
            </div>
          </div>
        </a></div> `

      }
    }

  });
  console.log(prodStr)


  return {
    text: stringData,
    html: `<!DOCTYPE html>
        <html>
          <head>
            <title></title>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <style type="text/css">
              body,
              table,
              td,
              a {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
              }
              a:hover p, a:hover div{
                color: blue;
              }
              table {
                border-collapse: collapse !important;
              }
              body {
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
              }
              @media screen and (max-width: 525px) {
                .wrapper {
                  width: 100% !important;
                  max-width: 100% !important;
                }
                .responsive-table {
                  width: 100% !important;
                }
                .padding {
                  padding: 10px 5% 15px 5% !important;
                }
                .section-padding {
                  padding: 0 15px 50px 15px !important;
                }
              }
              .form-container {
                margin-bottom: 24px;
                padding: 20px;
                border: 1px dashed #ccc;
              }
              .form-heading {
                color: #2a2a2a;
                font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
                font-weight: 400;
                text-align: left;
                line-height: 20px;
                font-size: 18px;
                text-decoration:underline;
                margin: 0 0 8px;
                padding: 0;
              }
              .form-answer {
                color: #2a2a2a;
                font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
                font-weight: 300;
                text-align: left;
                line-height: 20px;
                font-size: 16px;
                margin: 0 0 24px;
                padding: 0;
              }
              div[style*="margin: 16px 0;"] {
                margin: 0 !important;
              }
            </style>
          </head>
          <body style="margin: 0 !important; padding: 0 !important; background: #fff">
            <div
              style="
                display: none;
                font-size: 1px;
                color: #fefefe;
                line-height: 1px;
                max-height: 0px;
                max-width: 0px;
                opacity: 0;
                overflow: hidden;
              "
            ></div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td
                  bgcolor="#ffffff"
                  align="center"
                  style="padding: 10px 15px 30px 15px"
                  class="section-padding"
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    style="max-width: 500px"
                    class="responsive-table"
                  >
                    <tr>
                      <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tr>
                            <td>
                              <table
                                width="100%"
                                border="0"
                                cellspacing="0"
                                cellpadding="0"
                              >
                                <tr>
                                  <td
                                    style="
                                      padding: 0 0 0 0;
                                      font-size: 16px;
                                      line-height: 25px;
                                      color: #232323;
                                    "
                                    class="padding message-content"
                                  >
                                    ${messageForCustomer}
                                    <h2>Vaše objednávka: <a href="${process.env.DOMAIN}/confirm/${linkOnOrder}">${id}</a></h2>
                                    <div class="form-container">${htmlData}</div>

                                    <div class="form-container" >
                                    <h2>Objednané produkty:</h2>
                                    ${prodStr}
                                    
                                    <div class="form-container" >
                                    ${endOfHTML}
                                    </div>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
        `
  }
}

const Handler = async (req, res) => {
  console.log("email")
  console.log(req.body)

  if (req.method == "POST") {
    const data = req.body;

    let unneID = uuidv4().substring(0, 13);
    let unneCode = uuidv4().substring(0, 6);
    if (data.code) {
      unneCode = data.code;
    }
    if (data.slug) {
      unneID = data.slug;
    }

    if (!data.name || !data.email || !data.message) {
      return res.status(400).json({ message: "Bad request" });
    }
    try {
      await transporter.sendMail({
        ...mailOptions,
        ...generateEmailContent(data, unneID, unneCode),
        to: data.email,
        subject: "Objedávka z obchodu - Sam",
      });

      console.log(data.isConfirmed)
      if (!data.isConfirmed) {
        let productInOrder = [];
        Object.entries(data)[3].forEach(element => {
          console.log(typeof (element))
          console.log(element.length)
          if (typeof (element) === "object") {

            for (let index = 0; index < element.length; index++) {
              const item = element[index];
              productInOrder.push({
                product: { _type: "reference", _ref: item._id },
                _key: uuidv4(),
                quantity: item.quantity,
                price: item.price,
              })
            }

          }

        });
        console.log("product in order")
        console.log(productInOrder)
        var myDate = new Date("2 dec 2012 3:30:00");
        myDate.setHours(myDate.getHours() + 24);
        client.config({
          token: process.env.NEXT_PUBLIC_SANITY_TOKEN
        }).create({
          _type: 'order',
          name: data.name,
          email: data.email,
          message: data.message,
          slug: unneID,
          products: productInOrder,
          totalPrice: data.totalPrice,
          totalQuantity: data.totalQuantities,
          date: moment().format('YYYY-MM-DD HH:mm'),
          isConfirmed: false,
          code: unneCode
        })
      }

      return res.status(200).json({ succes: true });
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message });
    }

  }
  return res.status(400).json({ message: "Bad request" });
}



export default Handler;