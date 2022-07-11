const { db } = require("./configFirebase");
const { v4: uuid } = require("uuid");

module.exports = (collect) => {
  const _create = (collect) => {
    return async (data) => {
      try {
        const id = uuid();
        const docRef = db.collection(collect).doc(id);
        await docRef.set(data);
        const dataAdd = {
          id,
          ...data,
        };
        return dataAdd;
      } catch (error) {
        throw {
          status: error?.status || 500,
          message: error?.message || error,
        };
      }
    };
  };

  const _find = (collect) => {
    return async (criteria = {}) => {
      try {
        const docRef = await db.collection(collect);
        const snapshot = await docRef.get();
        const allDoc = [];
        snapshot.forEach((doc) => allDoc.push({ id: doc.id, ...doc.data() }));
        return allDoc;
      } catch (error) {
        throw { status: 500, message: error };
      }
    };
  };

  const _findId = (collect) => {
    return async (id) => {
      try {
        const docRef = await db.collection(collect).doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
          throw {
            status: 400,
            message: `El id: ${id} no se encuentra`,
          };
        }
        const dataDoc = {
          id,
          ...doc.data(),
        };
        return dataDoc;
      } catch (error) {
        throw {
          status: error?.status || 500,
          message: error?.message || error,
        };
      }
    };
  };

  const _update = (collect) => {
    return async (id, data) => {
      try {
        const docRef = await db.collection(collect).doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
          throw {
            status: 400,
            message: `El id: ${id} no se encuentra`,
          };
        }
        await docRef.set(data);
        const dataAdd = {
          id,
          ...data,
        };
        return dataAdd;
      } catch (error) {
        throw {
          status: error?.status || 500,
          message: error?.message || error,
        };
      }
    };
  };

  const _remove = (collect) => {
    return async (id) => {
      try {
        const docRef = await db.collection(collect).doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
          throw {
            status: 400,
            message: `El id: ${id} no se encuentra`,
          };
        }
        const dataAdd = {
          id,
          ...doc.data(),
        };
        await docRef.delete();
        return dataAdd;
      } catch (error) {
        throw {
          status: error?.status || 500,
          message: error?.message || error,
        };
      }
    };
  };

  const output = {};

  output.create = _create(collect);
  output.find = _find(collect);
  output.findId = _findId(collect);
  output.update = _update(collect);
  output.remove = _remove(collect);
  return output;
};
