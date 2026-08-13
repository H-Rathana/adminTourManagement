import axios from "axios";

export const BASE_URL =
  "http://localhost:5000";

const API = axios.create({
  baseURL:
    `${BASE_URL}/api`,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});
export const getBookings = () => API.get("/bookings");

export const approveBooking = (id) =>
  API.put(`/bookings/${id}/approve`);

export const rejectBooking = (id) =>
  API.put(`/bookings/${id}/reject`);

export const getPayments =
  () => API.get("/payments");

export const getUsers =
  () => API.get("/users");

export const getUserBookings =
  (userId) =>
    API.get(
      `/bookings/user/${userId}`
    );

export const getUserById =
  (id) =>
    API.get(`/users/${id}`);

// ✅ Promote User
export const promoteUser = (id) =>
  API.patch(`/users/${id}/promote`);

// ✅ Demote User
export const demoteUser = (id) =>
  API.patch(`/users/${id}/demote`);

// ✅ Delete User
export const deleteUser = (id) =>
  API.delete(`/users/${id}`);

// ✅ Reset User Password
export const resetUserPassword = (id, data) =>
  API.patch(`/users/${id}/reset-password`,data);

export const getTourGallery = async (tourId) => {
  const res = await API.get(`/gallery/${tourId}`);
  return res.data;
};

export const uploadGalleryImage = async (
  tourId,
  formData
) => {
  const res = await API.post(
    `/gallery/${tourId}`,
    formData
  );

  return res.data;
};

export const deleteGalleryImage = async (
  galleryId
) => {
  return API.delete(`/gallery/${galleryId}`);
};

export default API;