import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'profile', title: 'Profile & links', type: 'document',
  fields: [
    defineField({name:'firstName',title:'First name',type:'string',validation:r=>r.required()}),
    defineField({name:'lastName',title:'Last name',type:'string',validation:r=>r.required()}),
    defineField({name:'name',title:'Full name',type:'string',validation:r=>r.required()}),
    defineField({name:'headline',title:'Headline',type:'string'}),
    defineField({name:'intro',title:'Homepage introduction',type:'text',rows:3}),
    defineField({name:'about',title:'About me',type:'text',rows:6}),
    defineField({name:'quote',title:'Personal quote',type:'string'}),
    defineField({name:'location',title:'Location',type:'string'}),
    defineField({name:'timezone',title:'Timezone',type:'string'}),
    defineField({name:'email',title:'Email',type:'string'}),
    defineField({name:'github',title:'GitHub URL',type:'url'}),
    defineField({name:'linkedin',title:'LinkedIn URL',type:'url'}),
    defineField({name:'leetcode',title:'LeetCode URL',type:'url'}),
    defineField({name:'domain',title:'Portfolio domain',type:'string'}),
    defineField({name:'frontPhoto',title:'Front portrait',type:'image',options:{hotspot:true}}),
    defineField({name:'backPhoto',title:'Back portrait',type:'image',options:{hotspot:true}}),
  ],
  preview: {select:{title:'name',media:'frontPhoto'}},
})
