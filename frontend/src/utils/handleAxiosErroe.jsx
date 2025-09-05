export default function handleAxiosError(error) {
  if (error.response) {
    // Backend response (400/500)
    return error.response.data.message || "Something went wrong";
  } else if (error.request) {
    // server doesn't response
    return "No response from server. Please try again.";
  } else {
    // Axios config error
    return "Error: " + error.message;
  }
}
