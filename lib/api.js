export const sendContactForm = async (data) => fetch(`${process.env.DOMAIN}/api/contact`, {method: "POST", 
body: JSON.stringify(data), headers: {
    "Content-Type":"application/json",
    Accept: "application/json",
},
})