import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'profile',
  title: 'Profile & links',
  type: 'document',
  fields: [
    defineField({ name: 'firstName', title: 'First name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'lastName', title: 'Last name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'name', title: 'Full name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'intro', title: 'Homepage introduction', type: 'text', rows: 3 }),
    defineField({ name: 'about', title: 'About me', type: 'text', rows: 6 }),
    defineField({ name: 'quote', title: 'Personal quote', type: 'string' }),
    defineField({ name: 'location', title: 'Location (Country / City)', type: 'string' }),
    defineField({ name: 'coordinates', title: 'Location Coordinates', type: 'string', initialValue: '33.6844° N, 73.0479° E' }),
    defineField({ name: 'timezone', title: 'Timezone', type: 'string' }),

    // Academic / Trajectory fields
    defineField({ name: 'cgpa', title: 'Current CGPA / CPI', type: 'string', initialValue: '3.82' }),
    defineField({ name: 'cgpaLabel', title: 'CGPA Label', type: 'string', initialValue: 'CURRENT CGPA' }),
    defineField({ name: 'cgpaStatus', title: 'CGPA Status / Trend Note', type: 'string', initialValue: 'SPI dipped Sem 2, recovering steadily since' }),
    defineField({ name: 'semesterProgress', title: 'Semester Progress', type: 'string', initialValue: '4/8 SEMS' }),
    defineField({ name: 'verifyText', title: 'Verification Badge Text', type: 'string', initialValue: 'VERIFIED' }),
    defineField({
      name: 'chartData',
      title: 'SPI Trend Data Points',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'sem', title: 'Semester Label', type: 'string' },
            { name: 'spi', title: 'SPI Score (0-100)', type: 'number' },
            { name: 'cpi', title: 'CPI Score (0-100)', type: 'number' },
          ],
        },
      ],
    }),

    // Personal traits (Growth / Focus / Craft)
    defineField({
      name: 'traits',
      title: 'Personal Traits (Growth, Focus, Craft)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Trait Title', type: 'string' },
            { name: 'copy', title: 'Trait Description', type: 'text', rows: 2 },
          ],
        },
      ],
    }),

    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'github', title: 'GitHub URL', type: 'url' }),
    defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'leetcode', title: 'LeetCode URL', type: 'url' }),
    defineField({ name: 'domain', title: 'Portfolio domain', type: 'string' }),
    defineField({ name: 'frontPhoto', title: 'Front portrait', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'backPhoto', title: 'Back portrait', type: 'image', options: { hotspot: true } }),
  ],
  preview: { select: { title: 'name', media: 'frontPhoto' } },
})
