import React, { useState } from 'react';

import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';



import { Container, FormControl, FormLabel, Heading, Input, Textarea, FormErrorMessage, Text, useToast } from '@chakra-ui/react';
import { sendContactForm } from '../lib/api';



const initValues = {
  name: "",
  email: "",
  message: "",

};

const initState = { values: initValues };

const Order = () => {
  const { totalPrice, totalQuantities, cartItems, setShowCart, setShowOrder, showOrder, toggleCartItemQuantity, onRemove } = useStateContext();
  const [state, setState] = useState(initState);
  const [touched, setTouched] = useState({});
  const { values, isLoading, error } = state;

  const onBlur = ({ target }) => setTouched((prev) => ({
    ...prev, [target.name]: true
  }));

  const handleChange = ({ target }) => setState((prev) => ({
    ...prev,
    values: {
      ...prev.values,
      [target.name]: target.value,
    }
  }));

  const onSubmit = async () => {
    values.products = cartItems;
    values.totalPrice = totalPrice;
    values.totalQuantities = totalQuantities;
    values.isConfirmed = false;

    setState((prev) => ({
      ...prev,
      isLoading: true
    }));
    try {
      await sendContactForm(values);
      setTouched({});
      setState(initState);
      toast.success(`objednávka poslána`);;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message
      }));
    }
  };
  return (
    <div >
      <Container className='email-container'>
        <div className='box' >
          <Heading >Contact </Heading>{
            error && <Text color="red.300" my={4} fontSize="xl">{error}</Text>
          }


          <FormControl isRequired isInvalid={touched.name && !values.name} mb={5}>
            <FormLabel>Name</FormLabel>
            <Input type='text' name="name" errorBorderColor='red.300' value={values.name} onChange={handleChange} onBlur={onBlur} />
            <FormErrorMessage>Povinné</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={touched.email && !values.email} mb={5}>
            <FormLabel>Email</FormLabel>
            <Input type='email' name="email" errorBorderColor='red.300' value={values.email} onChange={handleChange} onBlur={onBlur} />
            <FormErrorMessage>Povinné</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={touched.message && !values.message} mb={5}>
            <FormLabel>Message</FormLabel>
            <Textarea type='text' name="message" errorBorderColor='red.300' rows={4} value={values.message} onChange={handleChange} onBlur={onBlur} />
            <FormErrorMessage>Povinné</FormErrorMessage>
          </FormControl>
          <button variant="outline" colorScheme='blue' disabled={!values.name || !values.email || !values.message} isLoading={state.isLoading} onClick={onSubmit}>Objednat</button>
          <button variant="outline" onClick={() => setShowOrder(false)}>Close</button>
        </div>
      </Container>
    </div>
  )
}

export default Order