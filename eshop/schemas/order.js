export default {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            readOnly: ({ document }) => !document?.publishedOnce
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string',
            readOnly: ({ document }) => !document?.publishedOnce
        },
        {
            name: 'message',
            title: 'Message',
            type: 'string',
            readOnly: ({ document }) => !document?.publishedOnce
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'string',
            readOnly: ({ document }) => !document?.publishedOnce
        },
        {
            name: 'products',
            title: 'Products in order',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    {
                        name: 'product',
                        type: 'reference',
                        title: 'Product in order',
                        to: [
                            { type: 'product' }
                        ],
                        readOnly: ({ document }) => !document?.publishedOnce
                    },

                    {
                        name: 'quantity',
                        type: 'number',
                        title: 'Quantity of product',
                        readOnly: ({ document }) => !document?.publishedOnce
                    },

                    {
                        name: 'price',
                        type: 'number',
                        title: 'Price of product',
                        readOnly: ({ document }) => !document?.publishedOnce

                    }
                ]
            }],
            
        }
        ,
        {
            name: 'totalPrice',
            title: 'Total price',
            type: 'number',
            readOnly: ({ document }) => !document?.publishedOnce
        },
        {
            name: 'totalQuantity',
            title: 'Total quantity',
            type: 'number',
            readOnly: ({ document }) => !document?.publishedOnce
        },
        {
            name: 'date',
            title: 'Date of end',
            type: 'datetime',
            readOnly: ({ document }) => !document?.publishedOnce
        },
        {
            name: 'isConfirmed',
            title: 'Is confirmed',
            type: 'boolean',
        },
        {
            name: 'code',
            title: 'Code',
            type: 'string',
            readOnly: ({ document }) => !document?.publishedOnce
        }
    ]
}