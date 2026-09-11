import { defineField, defineType } from 'sanity'

export default defineType({
  name:'project',title:'Projects',type:'document',
  fields:[
    defineField({name:'number',title:'Display number',type:'string',initialValue:'01'}),
    defineField({name:'order',title:'Display order',type:'number',initialValue:1}),
    defineField({name:'title',title:'Project title',type:'string',validation:r=>r.required()}),
    defineField({name:'category',title:'Category',type:'string'}),
    defineField({name:'description',title:'Description',type:'text',rows:4}),
    defineField({name:'stack',title:'Technology stack',type:'array',of:[{type:'string'}],options:{layout:'tags'}}),
    defineField({name:'color',title:'Accent color',type:'string',initialValue:'#00d9ff'}),
    defineField({name:'image',title:'Project image',type:'image',options:{hotspot:true}}),
    defineField({name:'liveUrl',title:'Live project URL',type:'url'}),
    defineField({name:'sourceUrl',title:'GitHub/source URL',type:'url'}),
    defineField({name:'featured',title:'Featured on homepage',type:'boolean',initialValue:true}),
  ],
  orderings:[{title:'Display order',name:'orderAsc',by:[{field:'order',direction:'asc'}]}],
  preview:{select:{title:'title',subtitle:'category',media:'image'}},
})
