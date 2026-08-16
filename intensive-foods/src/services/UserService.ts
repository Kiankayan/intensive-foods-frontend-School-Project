import { auth } from "@services";
import type { UserRegister } from "@types";
import axios from "axios";

//const API_BASEURL = "https://server.intensivecode.se/api/users";
const API_BASEURL = "http://localhost:5432/api/users";
const CREDENTIALS = "?username=kian&accessCode=hNoRzW";

async function register(user: UserRegister) {
  const { headers, data } = await axios.post(API_BASEURL + CREDENTIALS, user);
  const token = headers["x-auth-token"];
  auth.loginWithJwt(token);
  return data;
}

export default {
  register,
};
