import { defineField, defineType } from 'sanity'

export default defineType({
  name:'credential',title:'Certificates',type:'document',
  fields:[
    defineField({name:'number',title:'Display number',type:'string',initialValue:'01'}),
    defineField({name:'order',title:'Display order',type:'number',initialValue:1}),
    defineField({name:'title',title:'Certificate title',type:'string',validation:r=>r.required()}),
    defineField({name:'issuer',title:'Issuer',type:'string'}),
    defineField({name:'year',title:'Year',type:'string'}),
    defineField({name:'description',title:'Description',type:'text',rows:4}),
    defineField({name:'tags',title:'Tags',type:'array',of:[{type:'string'}],options:{layout:'tags'}}),
    defineField({name:'image',title:'Certificate image',type:'image'}),
    defineField({name:'verifyUrl',title:'Verification URL',type:'url'}),
  ],
  orderings:[{title:'Display order',name:'orderAsc',by:[{field:'order',direction:'asc'}]}],
  preview:{select:{title:'title',subtitle:'issuer',media:'image'}},
})
