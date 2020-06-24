export type ProjectType = {
  catagory: string;
  title: string;
  description: string;
  tags: string;
  source?: string;
  live?: string;
};

export type PostType = {
  title: string;
  description: string;
  category: string;
  date: string;
  slug: string;
};

export type ContactFormType = {
  formName: string;
  name: string;
  email: string;
  message: string;
};
