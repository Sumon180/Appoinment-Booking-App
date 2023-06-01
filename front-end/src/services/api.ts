import axios from "axios";
import { Appointment } from "../types";

const API_BASE_URL = "http://localhost:5000";

export const getAppointments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/appointments`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch appointments");
  }
};

export const editAppointments = async (appointmentId: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/appointments/${appointmentId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to Edit appointments");
  }
};

export const createAppointment = async (data: Appointment) => {
  try {
    await axios.post(`${API_BASE_URL}/appointments`, data);
  } catch (error) {
    throw new Error("Failed to create appointment");
  }
};

export const updateAppointment = async (appointment: Appointment) => {
  try {
    await axios.put(
      `${API_BASE_URL}/appointments/${appointment.id}`,
      appointment
    );
  } catch (error) {
    throw new Error("Failed to update appointment");
  }
};

export const deleteAppointment = async (id: string) => {
  try {
    await axios.delete(`${API_BASE_URL}/appointments/${id}`);
  } catch (error) {
    throw new Error("Failed to delete appointment");
  }
};
