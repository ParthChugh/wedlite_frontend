const BASE_URL = "https://api.wedlite.in:5001"; 
const REGISTER_API = `${BASE_URL}/api/users/`
const LOGIN_API = `${BASE_URL}/api/users/login/`
const LOGOUT = `${BASE_URL}/api/users/logout/`
const CITY_LIST_API = `${BASE_URL}/places/cities/`
const CATEGORIES = `${BASE_URL}/places/categories/`
const VENUE_CATEGORY_CITY = `${BASE_URL}/places/venues/`
const TERMS_AND_CONDTION = `${BASE_URL}/content/misc/tAndC/`
const ABOUT_US = `${BASE_URL}/content/misc/aboutUs/`
const BUSINESS_SIGN_UP = `${BASE_URL}/business/users/`
const CONTACT_US = `${BASE_URL}/support/`
const POPULAR_VENUES = `${BASE_URL}/places/venues/locations/`
const CLAIM_BUSINESS = `${BASE_URL}/support/business-claim/`
const GET_SHOP_DATA = `${BASE_URL}/ecommerce/search/`
const PRODUCT_DETAIL = `${BASE_URL}/ecommerce/products/`
const CART_ITEMS = `${BASE_URL}/ecommerce/carts/items/`
const PAYMENT_GATEWAY = `${BASE_URL}/ecommerce/payments/`
const PAYMENT_GATEWAY_SUCCESS = `${BASE_URL}/ecommerce/payments/confirm/`
const SEARCH_API = `${BASE_URL}/search/`

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
  CONTACT_US,
  POPULAR_VENUES,
  LOGOUT,
  CLAIM_BUSINESS,
  GET_SHOP_DATA,
  PRODUCT_DETAIL,
  CART_ITEMS,
  PAYMENT_GATEWAY,
  PAYMENT_GATEWAY_SUCCESS,
  SEARCH_API
}