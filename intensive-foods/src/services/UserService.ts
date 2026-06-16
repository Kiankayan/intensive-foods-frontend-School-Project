import { auth } from "@services";
import type { User } from "@types";
import axios from "axios";

const API_BASEURL = "https://server.intensivecode.se/api/users";
const CREDENTIALS = "?username=kian&accessCode=hNoRzW";

async function register(user: User) {
  const { headers } = await axios.post(API_BASEURL + CREDENTIALS, user);
  const token = headers["x-auth-token"];
  auth.loginWithJwt(token);
}

export default {
  register,
};
