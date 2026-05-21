export default {
  kind: "collectionType",
  collectionName: "yoga_classes",
  info: {
    singularName: "yoga-class",
    pluralName: "yoga-classes",
    displayName: "Yoga Class",
    description: "Yoga classes offered at the studio",
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
    description: {
      type: "richtext",
      required: true,
    },
    level: {
      type: "enumeration",
      enum: ["beginner", "intermediate", "advanced", "all-levels"],
      default: "all-levels",
      required: true,
    },
    duration: {
      type: "integer",
      required: true,
      min: 15,
      max: 180,
    },
    schedule: {
      type: "string",
      required: true,
    },
    image: {
      type: "media",
      multiple: false,
      required: false,
      allowedTypes: ["images"],
    },
    instructor: {
      type: "relation",
      relation: "manyToOne",
      target: "api::instructor.instructor",
      inversedBy: "classes",
    },
  },
};
