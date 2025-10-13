export const fetchData = async ({
  endpoint,
  method = "GET",
  body = null,
  token = null,
  headers = { "Content-Type": "application/json" },
  onSuccess = () => {},
  onError = () => {},
  setIsLoading = () => {},
}) => {
  setIsLoading(true);

  const finalHeaders = {
    ...headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const response = await fetch(`http://localhost:3000${endpoint}`, {
      method,
      headers: finalHeaders,
      body: body ? JSON.stringify(body) : null,
    });

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
