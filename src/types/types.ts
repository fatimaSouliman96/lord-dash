export type ApiResponse<T> = {
  data?: T;
  error?: string;
  status: number;
};
export interface ApiError {
  message?: string;
  errors?: string[]; // مثل Laravel validation errors
}
export type LoginFormData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
};

export type city = {
  id: number,
  name: string,
  created_at: string,
  updated_at: string
}

export type region = {
  id: number,
  name: string,
  city_id: number,
  created_at: string,
  updated_at: string,
  city: city
}
export interface Package {
  id: number;
  name: string;
  speed: string;
  limit: string;
  duration: string;
  price: string;
  slug: string;
  region_id: number;
  created_at: string; // تاريخ بصيغة ISO
  updated_at: string; // تاريخ بصيغة ISO
  region: region
}

export type Provider = {
  id: number;
  name: string;
  address: string;
  phone: string;
  description?: string | null;
  image?: string | null;
  package_id: number;
  created_at?: string | null;
  updated_at?: string | null;
  package: Package
};

export type Testimonial = {
  id: number;
  name: string;
  position: string;
  comment: string;
  created_at: string;
  updated_at: string;
};
export type Branch = {
  id: number;
  name: string;
  address: string;
  phone: string;
  status: string;
  created_at: string;
  updated_at: string;
};
export type faq = {
  id: number;
  question: string;
  answer: string;
  created_at: string;
  updated_at: string;
};

export type settings = {
        id: number,
        title: string,
        description: string,
        created_at?: string,
        updated_at?: string
    }
