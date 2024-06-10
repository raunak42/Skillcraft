const BASE_URL_DEV = "http://localhost:3000"
const BASE_URL_PROD = "https://raunak42.in"

const ADMIN_BASE_URL_DEV = "http://localhost:3001"
const ADMIN_BASE_URL_PROD = "https://skillcraftadmin.raunak42.in"

export const BASE_URL = process.env.NODE_ENV === 'production' ? BASE_URL_PROD : BASE_URL_DEV;
export const ADMIN_BASE_URL = process.env.NODE_ENV === 'production' ? ADMIN_BASE_URL_PROD : ADMIN_BASE_URL_DEV;

export const SIGNUP_SUCCESS_MESSAGE = "Signed up successfully.";
export const USERNAME_TAKEN_MESSAGE = "Username taken."

export const INVALID_USRNM_PSWRD_MESSAGE = "Invalid username or password."
export const LOGIN_SUCCESS_MESSAGE = "Successfully logged in."

export const UNKNOWN_ERR_MESSAGE = "An unknown error occurred."
export const DB_CONNCT_ERR = "Error connecting to database."
export const DB_CONNCT_SCCS = "Connected to database."

export const SESSION_HEADER_MISSING_MESSAGE = "sessionDataHeader not found."
export const COURSE_CREATE_SUCCESS_MESSAGE = "Course created successfully."
export const COURSE_DELETE_SUCCESS_MESSAGE = "Course deleted successfully."
export const COURSE_UPDATE_SUCCESS_MESSAGE = "Course updated successfully."
export const REMOVED_FROM_WISHLIST_MESSAGE = "Course removed from wishlist."
export const REMOVED_FROM_CART_MESSAGE = "Course removed from cart."

export const PERMISSION_DENIED_MESSAGE = "Permission denied."
export const ADMIN_NOT_FOUND_MESSAGE = "Admin not found."

