const link = process.env.DOMAIN;

export const sendContactForm = async (data) => fetch("http://eshop-hacking.vercel.app/api/contact", {method: "POST", 
body: JSON.stringify(data), headers: {
    "Content-Type":"application/json",
    Accept: "application/json",
},
})