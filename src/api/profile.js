export async function getProfile() {
  const email = localStorage.getItem("email");

  return apiClient(`/api/profile?email=${email}`, {
    method: "GET",
  });
}
