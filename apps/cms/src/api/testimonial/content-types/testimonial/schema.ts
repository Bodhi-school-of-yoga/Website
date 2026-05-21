export default {
  kind: "collectionType",
  collectionName: "testimonials",
  info: {
    singularName: "testimonial",
    pluralName: "testimonials",
    displayName: "Testimonial",
    description: "Student testimonials and reviews",
  },
  options: {
    draftAndPublish: true,
  },
  attributes: {
    name: {
      type: "string",
      required: true,
      maxLength: 255,
    },
    quote: {
      type: "text",
      required: true,
      maxLength: 1000,
    },
    rating: {
      type: "integer",
      required: true,
      min: 1,
      max: 5,
      default: 5,
    },
    avatar: {
      type: "media",
      multiple: false,
      required: false,
      allowedTypes: ["images"],
    },
  },
};
