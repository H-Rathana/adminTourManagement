import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
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

export default API;