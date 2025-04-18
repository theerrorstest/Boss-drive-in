import { defineField, defineType } from "sanity";

export const order_item = defineType({
  name: "order_item",
  title: "Order Item",
  type: "document",
  fields: [
    defineField({
      name: "createdBy",
      title: "Created By",
      type: "reference",
      to: [{ type: "user" }],
    }),
    defineField({
        name: "name",
        title: "Name",
        type: "string",
        validation: (Rule) => Rule.required(),
    }),
    defineField({
      name:"Order",
      title:"Order",
      type: "number",
      validation: (Rule) => Rule.required(),
      default: 0,
    }),
    defineField({
        name: "isEnabled",
        title: "Is Enabled",
        type: "boolean",
        validation: (Rule) => Rule.required(),
    })
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
