import { refreshAccessToken } from "./refreshAccessToken.js";

export const fetchData = async ({
  endpoint,
  method = "GET",
  body = null,
  headers = { "Content-Type": "application/json" },
  onSuccess = () => {},
  onError = () => {},
  setIsLoading = () => {},
  navigate = null,
  requireAuth = false,
}) => {
  setIsLoading(true);

  try {
    let token = localStorage.getItem("accessToken");

    let response = await fetch(`http://localhost:3000${endpoint}`, {
      method,
      headers: {
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : null,
      credentials: "include",
    });

    if (response.status === 401) {
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        localStorage.setItem("accessToken", newAccessToken);
        token = newAccessToken;

        response = await fetch(`http://localhost:3000${endpoint}`, {
          method,
          headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
          },
          body: body ? JSON.stringify(body) : null,
          credentials: "include",
        });
      } else {
        localStorage.removeItem("accessToken");

        if (requireAuth && navigate) {
          navigate("/sign-in");
        }

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
