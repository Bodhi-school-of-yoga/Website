export default {
  kind: "collectionType",
  collectionName: "instructors",
  info: {
    singularName: "instructor",
    pluralName: "instructors",
    displayName: "Instructor",
    description: "Yoga instructors at the studio",
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
    slug: {
      type: "uid",
      targetField: "name",
      required: true,
    },
    bio: {
      type: "richtext",
      required: true,
    },
    specialization: {
      type: "string",
      required: true,
    },
    experience: {
      type: "integer",
      required: true,
      min: 0,
    },
    photo: {
      type: "media",
      multiple: false,
      required: false,
      allowedTypes: ["images"],
    },
    classes: {
      type: "relation",
      relation: "oneToMany",
      target: "api::yoga-class.yoga-class",
      mappedBy: "instructor",
    },
  },
};
