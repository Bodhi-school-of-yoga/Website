import type { Schema, Struct } from '@strapi/strapi';

export interface CourseCurriculumItem extends Struct.ComponentSchema {
  collectionName: 'components_course_curriculum_items';
  info: {
    description: 'A single curriculum module with title and body';
    displayName: 'Curriculum Item';
    icon: 'book';
  };
  attributes: {
    body: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CourseFaq extends Struct.ComponentSchema {
  collectionName: 'components_course_faqs';
  info: {
    description: 'Frequently asked question with optional default-open state';
    displayName: 'FAQ';
    icon: 'question';
  };
  attributes: {
    answer: Schema.Attribute.Text & Schema.Attribute.Required;
    defaultOpen: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CourseHighlight extends Struct.ComponentSchema {
  collectionName: 'components_course_highlights';
  info: {
    description: 'Course highlight with icon, title, and body';
    displayName: 'Highlight';
    icon: 'star';
  };
  attributes: {
    body: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.String;
    iconSrc: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CourseInstructor extends Struct.ComponentSchema {
  collectionName: 'components_course_instructors';
  info: {
    description: 'Course instructor with name, role, and avatar';
    displayName: 'Instructor';
    icon: 'user';
  };
  attributes: {
    avatar: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    role: Schema.Attribute.String;
  };
}

export interface CoursePricingPlan extends Struct.ComponentSchema {
  collectionName: 'components_course_pricing_plans';
  info: {
    description: 'Subscription pricing tier (e.g. Monthly, Quarterly, Yearly)';
    displayName: 'Pricing Plan';
    icon: 'shoppingCart';
  };
  attributes: {
    period: Schema.Attribute.String & Schema.Attribute.Required;
    price: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'course.curriculum-item': CourseCurriculumItem;
      'course.faq': CourseFaq;
      'course.highlight': CourseHighlight;
      'course.instructor': CourseInstructor;
      'course.pricing-plan': CoursePricingPlan;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
