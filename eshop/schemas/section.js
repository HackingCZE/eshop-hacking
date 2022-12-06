export default {
    name: 'section',
    title: 'Section',
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
        name: 'subsections',
        title: 'Subsections',
        type: 'array',
        of:[{type:"reference", to:{type:"subsection"}}]
        
      }
    ]
  }