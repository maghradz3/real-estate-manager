"use server";
import { Agents, City, getRealEstate, RealEstate, Region } from "@/utils/types";
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

export const getRealEstateById = async (id: number): Promise<getRealEstate> => {
  try {
    const { data } = await axios.get<getRealEstate>(
      `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error fetching real estate by id:", error);
    throw error;
  }
};

export const deleteRealEstateById = async (id: number) => {
  try {
    const response = await axios.delete(
      `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting real estate by id:", error);
    throw error;
  }
};

export const getAllRegions = async (): Promise<Region[] | undefined> => {
  try {
    const { data } = await axios.get<Region[]>(
      "https://api.real-estate-manager.redberryinternship.ge/api/regions",
      {
        headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
      }
    );

    return data;
  } catch (error) {
    console.error("Error fetching regions:", error);
  }
};

export const getAllCities = async (): Promise<City[]> => {
  try {
    const { data } = await axios.get<City[]>(
      "https://api.real-estate-manager.redberryinternship.ge/api/cities",
      {
        headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
      }
    );

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

export const getAllAgents = async (): Promise<Agents[]> => {
  try {
    const { data } = await axios.get<Agents[]>(
      "https://api.real-estate-manager.redberryinternship.ge/api/agents",
      {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error fetching agents:", error);
    throw error;
  }
};

export const createRealEstate = async (data: FormData): Promise<void> => {
  try {
    const response = await axios.post(
      "https://api.real-estate-manager.redberryinternship.ge/api/real-estates",
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
    console.error("Error creating real estate:", error);
    throw error;
  }
};
