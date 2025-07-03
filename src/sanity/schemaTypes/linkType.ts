import { defineField, defineType } from "sanity";


export const linkType = defineType({
    name: "link",
    title: "Link",
    type: "document",
    fields : [
        defineField({
            name: "orignalURL",
            title: "Original URL",
            type: "url",
            validation: (Rule) => Rule.required().uri({
                scheme: ['http', 'https']
            })
        }),
        defineField({
            name: "shortSlug",
            title: "Short Slug",
            type: "string",
            validation: (Rule) => 
                Rule.required().min(3).max(50).error("Short slug must be between 3 and 50 characters")
        }),
        defineField({
            name: "clicks",
            title: "Clicks",
            type: "number",
            initialValue: 0,
            validation: (Rule) => Rule.min(0).error("Clicks must be a non-negative number")
        }),
        defineField({
            name: "createdAt",
            title: "Created At",
            type: "datetime",
            initialValue: () => new Date().toDateString(),
            validation: (Rule) => Rule.required().error("Created At is required")
        })
    ]
})