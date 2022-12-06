import React, { useState } from 'react';
import { Container, FormControl, FormLabel, Heading, Input, Textarea, FormErrorMessage, Text, useToast } from '@chakra-ui/react';

import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';
import { sendContactForm } from '../../lib/api';

const OrderConfirm = ({ order, code }) => {

  return (
    <div>
      {console.log("lllll")}

      {order === null && <div>
        <h2>Zdá se že mate špatny odkaz nebo vaše objednavka byla již smazáFna</h2></div> || order.code !== code && <div>
          <h2>Zdá se že mate špatny odkaz nebo vaše objednavka byla již smazáFna</h2></div>}
      {order !== null && order.code === code && <div>
        <h1>SUPER</h1>
        <h2>Vaše objedávka byla protvrzena</h2>


      </div>}


    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "order"] {
      slug 
    }
    `;

  const orders = await client.fetch(query);
  console.log(orders)
  const paths = orders.map((order) => ({

    params: {
      confirm: order.slug
    }
  }));
  console.log(paths)
  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: { confirm } }) => {
  console.log(confirm)
  const query = `*[_type == "order" && slug == '${confirm.substring(0, 13)}'][0]`;
  const code = confirm.substring(13, 20);

  const order = await client.fetch(query);



  if (order !== null) {
    let newProducts = [];
    order.products.
      forEach(element => {
        if (typeof (element) === "object") {
          console.log(element.product)

          newProducts.push({ product: element.product, price: element.price, quantity: element.quantity })
        }
      });

    for (let i = 0; i < newProducts.length; i++) {
      const element = newProducts[i];

      let nP = await client.fetch(`*[_type == "product" && _id == '${element.product._ref}'][0]`);

      let image = await client.fetch(`*[_type == "product" && _id == '${element.product._ref}']{image}[0]`);
      console.log("imagessssssssssssssssss")
      image = image.image
      console.log(image[0])

      console.log(nP)

      newProducts[i] = { _id: nP._id, _rev: nP._rev, _type: nP._type, details: nP.details, image, name: nP.name, price: element.price, quantity: element.quantity, slug: nP.slug, };
    }
    console.log(newProducts)


    const data = {
      name: order.name,
      email: order.email,
      message: order.message,
      products: newProducts,
      slug: order.slug,
      code: order.code,
      totalPrice: order.totalPrice,
      totalQuantities: order.totalQuantity,
      isConfirmed: true,
    }
    console.log(order.isConfirmed)
    if (order.isConfirmed === false) {
      client.patch(order._id).set({ 'isConfirmed': true }).commit()
      newProducts.forEach(element => {
        console.log(element)
        client.patch(element._id).dec({'quantity':element.quantity}).commit()
      });
      await sendContactForm(data);
    }
  }



  return {
    props: { order, code }
  }
}

export default OrderConfirm