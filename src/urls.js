const BASE_URL = "https://api.wedlite.in:5001"; 
const REGISTER_API = `${BASE_URL}/api/users/`
const LOGIN_API = `${BASE_URL}/api/users/login/`
const CITY_LIST_API = `${BASE_URL}/places/cities/`
const CATEGORIES = `${BASE_URL}/places/categories/`
const VENUE_CATEGORY_CITY = `${BASE_URL}/places/venues/`
const TERMS_AND_CONDTION = `${BASE_URL}/content/misc/TandC/`
const ABOUT_US = `${BASE_URL}/content/misc/aboutUs/`
const BUSINESS_SIGN_UP = `${BASE_URL}/business/users/`
const CONTACT_US = `${BASE_URL}/support/`

export {
  BASE_URL,
  REGISTER_API,
  LOGIN_API,
  CITY_LIST_API,
  CATEGORIES,
  VENUE_CATEGORY_CITY,
  ABOUT_US,
  TERMS_AND_CONDTION,
  BUSINESS_SIGN_UP,
  CONTACT_US
}