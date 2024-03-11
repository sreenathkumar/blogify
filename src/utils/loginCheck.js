import { api } from "@api/api";
import axios from "axios";

const loginCheck = async () => {
  const localToken = localStorage.getItem("token"); //get the token from local storage
  const localUserId = localStorage.getItem("userId"); //get the user from local storage

  if (localToken && localUserId) {
    const { refreshToken, createdAt } = JSON.parse(localToken); //parse the token
    const now = new Date().getTime();
    const diff = now - createdAt;

    if (diff < 24 * 60 * 60 * 1000) {
      //checking token and also getting the user profile
      try {
        const response = await axios.all([
          api.post(`/auth/refresh-token`, { refreshToken }),
          api.get(`/profile/${localUserId}`),
        ]);
        if (response.length === 2) {
          const tokenResponse = response[0];
          const userResponse = response[1];
          if (tokenResponse.status === 200 && userResponse.status === 200) {
            const { accessToken, refreshToken } = tokenResponse.data;

            //set the token and userId in local storage
            localStorage.setItem(
              "token",
              JSON.stringify({
                accessToken,
                refreshToken,
                createdAt: new Date().getTime(),
              })
            );

            return {
              accessToken,
              refreshToken,
              user: userResponse.data,
            };
          }
        }
      } catch (error) {
        return error;
      }
    }
  }

  return null;
};

export default loginCheck;
