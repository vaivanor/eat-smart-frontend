import { refreshAccessToken } from "./refreshAccessToken.js";

export const fetchData = async ({
  endpoint,
  method = "GET",
  body = null,
  token = null,
  headers = { "Content-Type": "application/json" },
  onSuccess = () => {},
  onError = () => {},
  setIsLoading = () => {},
  navigate = null,
}) => {
  setIsLoading(true);

  const finalHeaders = {
    ...headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    let response = await fetch(`http://localhost:3000${endpoint}`, {
      method,
      headers: finalHeaders,
      body: body ? JSON.stringify(body) : null,
      credentials: "include",
    });

    if (response.status === 401) {
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        localStorage.setItem("accessToken", newAccessToken);

        response = await fetch(`http://localhost:3000${endpoint}`, {
          method,
          headers: {
            ...finalHeaders,
            Authorization: `Bearer ${newAccessToken}`,
          },
          body: body ? JSON.stringify(body) : null,
          credentials: "include",
        });
      } else {
        if (navigate) navigate("/sign-in");
        return null;
      }
    }

    const result = await response.json();
    onSuccess(result);
    return result;
  } catch (error) {
    onError(error?.message || "Something went wrong. Please try again.");
    return null;
  } finally {
    setIsLoading(false);
  }
};
