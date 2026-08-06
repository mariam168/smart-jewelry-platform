import api from "../../../../lib/axios";

// ==========================================
// GET ALL
// ==========================================

export const getSmartUnits = async () => {

  const response = await api.get(
    "/smart-units"
  );

  return response.data;

};

// ==========================================
// GET BY ID
// ==========================================

export const getSmartUnit = async (
  smartUnitId
) => {

  const response = await api.get(
    `/smart-units/${smartUnitId}`
  );

  return response.data;

};

// ==========================================
// CREATE
// ==========================================

export const createSmartUnit = async (
  smartUnitData
) => {

  const response = await api.post(
    "/smart-units",
    smartUnitData
  );

  return response.data;

};

// ==========================================
// UPDATE
// ==========================================

export const updateSmartUnit = async (
  smartUnitId,
  smartUnitData
) => {

  const response = await api.put(
    `/smart-units/${smartUnitId}`,
    smartUnitData
  );

  return response.data;

};

// ==========================================
// DELETE
// ==========================================

export const deleteSmartUnit = async (
  smartUnitId
) => {

  const response = await api.delete(
    `/smart-units/${smartUnitId}`
  );

  return response.data;

};