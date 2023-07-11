export interface Company {
  company_id: number;
  company_name: string;
  company_email_address: string;
  company_mobile_number: string;
  status: string;
  added_date: string;
  company_country: string;
  added_by: string;
  verified_by: string;
  company_industry: string;
  verified_date: string;
  company_logo: string;
  company_code: string;
  company_credit?: any;
}

export interface UserProfile {
  client_id: number;
  client_parent_company: Company;
  client_company_id: string;
  client_login_username: string;
  client_password: string;
  status: string;
  client_pin: string;
  client_first_name: string;
  client_last_name: string;
  client_mobile_number: string;
  client_postal_address: string;
  client_postal_code: string;
  client_city: string;
}
export interface RequestInterface {
  pk: number;
  request_type: string;
  request_package: string;
  request_ref_number: string;
  dataset_name: string;
  registration_number: string;
  request_date: string;
  percentage: number;
  status: string;
  package_id: number;
}

export interface StatsInterface {
  new: number;
  final: number;
  in_progress: number;
  interim: number;
  invalid: number;
  recent?: RequestInterface[];
}

export interface NotificationInterface {
  body: string;
  type: string;
}

declare global {
  interface Window {
    JQuery: any;
  }
}
