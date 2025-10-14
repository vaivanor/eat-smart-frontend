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

    if (response.status === 403) {
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        response = await fetch(`http://localhost:3000${endpoint}`, {
          method,
          headers: {
            ...headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
          body: body ? JSON.stringify(body) : null,
          credentials: "include",
        });
      } else {
        alert("Sign In again.");
        if (navigate) {
          navigate("/sign-in");
        }
      }
    }

    const result = await response.json();
    onSuccess(result);
    return result;
  } catch (error) {
    console.error("Fetch error:", error);
    onError(error);
    return null;
  } finally {
    setIsLoading(false);
  }
};
