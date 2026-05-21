export default {
  kind: "collectionType",
  collectionName: "blog_posts",
  info: {
    singularName: "blog-post",
    pluralName: "blog-posts",
    displayName: "Blog Post",
    description: "Blog articles for the yoga studio",
  },
  options: {
    draftAndPublish: true,
  },
  attributes: {
    title: {
      type: "string",
      required: true,
      maxLength: 255,
    },
    slug: {
      type: "uid",
      targetField: "title",
      required: true,
    },
    excerpt: {
      type: "text",
      required: true,
      maxLength: 500,
    },
    content: {
      type: "richtext",
      required: true,
    },
    coverImage: {
      type: "media",
      multiple: false,
      required: false,
      allowedTypes: ["images"],
    },
    author: {
      type: "relation",
      relation: "manyToOne",
      target: "api::instructor.instructor",
    },
    category: {
      type: "enumeration",
      enum: ["practice", "wellness", "philosophy", "lifestyle", "news"],
      default: "practice",
      required: true,
    },
  },
};
