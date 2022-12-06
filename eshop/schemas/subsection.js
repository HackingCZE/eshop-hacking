export default {
    name: 'subsection',
    title: 'Subsection',
    type: 'document',
    fields: [
      { 
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      { 
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 90,
        }
      },
      {
        name: 'keys',
        title: 'Keys',
        type:'array',
        of:[{type:"reference", to:{type:"key"}}],
      }
    ]
  }