import SmartUnit from "../models/SmartUnit.js";

// ==========================================
// CREATE
// ==========================================

export const createSmartUnit = async (
  smartUnitData
) => {

  const smartUnit =
    await SmartUnit.create(
      smartUnitData
    );

  return smartUnit;

};

// ==========================================
// GET ALL
// ==========================================

export const getSmartUnits =
  async () => {

    return await SmartUnit.find()
      .sort({
        createdAt: -1,
      });

};

// ==========================================
// GET BY ID
// ==========================================

export const getSmartUnitById =
  async (id) => {

    return await SmartUnit.findById(id);

};

// ==========================================
// UPDATE
// ==========================================

export const updateSmartUnit =
  async (
    id,
    smartUnitData
  ) => {

    return await SmartUnit.findByIdAndUpdate(

      id,

      smartUnitData,

      {
        new: true,
        runValidators: true,
      }

    );

};

// ==========================================
// DELETE
// ==========================================

export const deleteSmartUnit =
  async (id) => {

    return await SmartUnit.findByIdAndDelete(
      id
    );

};