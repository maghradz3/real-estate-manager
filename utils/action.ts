"use server";
import { City, RealEstate, Region } from "@/utils/types";
import axios from "axios";

const API_URL =
  "https://api.real-estate-manager.redberryinternship.ge/api/real-estates";

export const getAllRealEstates = async (): Promise<RealEstate[]> => {
  try {
    const { data } = await axios.get<RealEstate[]>(API_URL, {
      headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
    });
    return data;
  } catch (error) {
    console.error("Error fetching real estates:", error);
    throw error;
  }
};

export const getAllRegions = async (): Promise<Region[]> => {
  try {
    const { data } = await axios.get<Region[]>(
      "https://api.real-estate-manager.redberryinternship.ge/api/regions",
      {
        headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching regions:", error);
    throw error;
  }
};

export const getAllCities = async (): Promise<City[]> => {
  try {
    const { data } = await axios.get<City[]>(
      "https://api.real-estate-manager.redberryinternship.ge/api/regions",
      {
        headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching regions:", error);
    throw error;
  }
};

export const createAgent = async (data: FormData): Promise<void> => {
  try {
    const response = await axios.post(
      "https://api.real-estate-manager.redberryinternship.ge/api/agents",
      data,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating agent:", error);
    throw error;
  }
};
