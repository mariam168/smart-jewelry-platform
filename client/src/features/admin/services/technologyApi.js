import api from "../../../lib/axios";

// ==========================================
// GET ALL TECHNOLOGIES
// ==========================================

export const getTechnologies = async () => {

  const response = await api.get(
    "/technologies"
  );

  return response.data;

};


// ==========================================
// GET TECHNOLOGY
// ==========================================

export const getTechnology = async (
  technologyId
) => {

  const response = await api.get(
    `/technologies/${technologyId}`
  );

  return response.data;

};


// ==========================================
// CREATE TECHNOLOGY
// ==========================================

export const createTechnology = async (
  technologyData
) => {

  const response = await api.post(
    "/technologies",
    technologyData
  );

  return response.data;

};


// ==========================================
// UPDATE TECHNOLOGY
// ==========================================

export const updateTechnology = async (
  technologyId,
  technologyData
) => {

  const response = await api.put(
    `/technologies/${technologyId}`,
    technologyData
  );

  return response.data;

};

// ==========================================
// UPLOAD IMAGE
// ==========================================

export const uploadImage = async (formData) => {

  const response = await api.post(
    "/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;

};
// ==========================================
// DELETE TECHNOLOGY
// ==========================================

export const deleteTechnology = async (
  technologyId
) => {

  const response = await api.delete(
    `/technologies/${technologyId}`
  );

  return response.data;

};