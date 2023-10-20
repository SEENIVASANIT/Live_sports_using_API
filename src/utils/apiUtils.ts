import { API_ENDPOINT } from "../config/constants";
import {
  SetPreferences,
  UserLogin,
  UserSignup,
  UserUpdate,
} from "../types/user";

type requestType = "GET" | "POST" | "PATCH";

type payloadType =
  | UserLogin
  | UserSignup
  | UserUpdate
  | SetPreferences
  | object;

export const request = async (
  endpoint: string,
  method: requestType = "GET",
  data: payloadType = {}
) => {
  let url;
  let payload: string;
  if (method === "GET") {
    const requestParams = data
      ? `${Object.keys(data)
          .map((key) => `${key}=${data[key as keyof payloadType]}`)
          .join("&")}`
      : "";

    url = `${API_ENDPOINT}${endpoint}?${requestParams}`;
    payload = "";
  } else {
    url = `${API_ENDPOINT}${endpoint}`;
    payload = data ? JSON.stringify(data) : "";
  }

  const token = localStorage.getItem("authToken");
  const auth = token ? "Token " + token : "Token ";
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: method !== "GET" ? payload : undefined,
  });
  if (response.ok) {
    try {
      const data = await response.json();
      return data;
    } catch (err) {
      return {};
    }
  } else {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
};

export const createUser = async (data: UserSignup) => {
  return await request("/users", "POST", data);
};

export const loginUser = async (data: UserLogin) => {
  return await request("/users/sign_in", "POST", data);
};

export const updateUser = async (data: UserUpdate) => {
  return await request("/user/password", "PATCH", data);
};

export const setPreferences = async (data: SetPreferences) => {
  return await request("/user/preferences", "PATCH", data);
};

export const me = async () => {
  return await request("/user", "GET");
};

export const getArticles = async () => {
  return await request("/articles", "GET");
};

export const getArticle = async (id: number) => {
  return await request(`/articles/${id}`, "GET");
};

export const getMatches = async () => {
  return await request("/matches", "GET");
};

export const getMatch = async (id: number) => {
  return await request(`/matches/${id}`, "GET");
};

export const getSports = async () => {
  return await request("/sports", "GET");
};

export const getSport = async (id: number) => {
  return await request(`/sports/${id}`, "GET");
};

export const getTeams = async () => {
  return await request("/teams", "GET");
};

export const getTeam = async (id: number) => {
  return await request(`/teams/${id}`, "GET");
};
