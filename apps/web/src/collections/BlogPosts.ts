import type { CollectionConfig } from "payload";

export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "status", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "legacyImage",
      type: "text",
      admin: {
        description:
          "Path to static image in /public (e.g. /images/blog/my-post.jpg). Used for migrated posts before images are uploaded to Media.",
        position: "sidebar",
      },
    },
    {
      name: "content",
      type: "richText",
      admin: {
        description:
          "Rich text editor for new posts. If both this and legacy markdown exist, this takes priority.",
      },
    },
    {
      name: "markdownContent",
      type: "textarea",
      admin: {
        description:
          "Legacy markdown content (imported from static blog). New posts should use the rich text editor above.",
      },
    },
    {
      name: "author",
      type: "text",
      defaultValue: "Bodhi School of Yoga",
    },
    {
      name: "status",
      type: "select",
      defaultValue: "published",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      admin: {
        position: "sidebar",
      },
    },
  ],
};
