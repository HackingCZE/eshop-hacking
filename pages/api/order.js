import { client, urlFor } from '../../lib/client';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

export default async function createOrder(req, res) {
    // Destructure the pieces of our request
    const data = JSON.parse(req.body)
       
      
    try {
      // Use our Client to create a new document in Sanity with an object  
      await client.config({
        token: process.env.NEXT_PUBLIC_SANITY_TOKEN
      }).create({
        _type: 'order',
        name: data.name,
        email: data.email,
        message: data.message,
        slug: data.unneID,
        products: data.productInOrder,
        totalPrice: data.totalPrice,
        totalQuantity: data.totalQuantities,
        date: moment().format('YYYY-MM-DD HH:mm'),
        isConfirmed: false,
        code: data.unneCode
      })
    } catch (err) {
      console.error(err)
      return res.status(500).json({message: `Couldn't submit order`, err})
    }
      
    return res.status(200).json({ message: 'Order submitted' })
  }