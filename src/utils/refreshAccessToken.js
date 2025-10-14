export const refreshAccessToken = async () => {
  try {
    const response = await fetch("http://localhost:3000/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    const result = await response.json();

    if (response.ok && result.accessToken) {
      localStorage.setItem("accessToken", result.accessToken);
      return result.accessToken;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
