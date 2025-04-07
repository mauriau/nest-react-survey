import { api } from "../api.ts";

export async function useLogin(username: string, password: string) {
  return await api
    .post(
      `/auth/login`,
      { username, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    .then(function (response) {
      if (response.status == 200) {
        localStorage.setItem("token", response.data.access_token);
        return response;
      }
      throw new Error();
    });
}
