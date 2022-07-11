module.exports = (model) => {
  const _find = (model) => {
    return async (criteria = {}) => {
      try {
        return await model.find(criteria);
      } catch (error) {
        throw { status: 500, message: error };
      }
    };
  };

  const _findId = (model) => {
    return async (id) => {
      try {
        const result = await model.findById(id);
        if (!result) {
          throw {
            status: 400,
            message: `El id: ${id} no se encuentra`,
          };
        }
        return result;
      } catch (error) {
        throw {
          status: error?.status || 500,
          message: error?.message || error,
        };
      }
    };
  };

  const _create = (model) => {
    return async (data) => {
      try {
        const dataToInsert = new model(data);
        await dataToInsert.save();
        return dataToInsert;
      } catch (error) {
        throw {
          status: error?.status || 500,
          message: error?.message || error,
        };
      }
    };
  };

  const _update = (model) => {
    return async (id, data) => {
      try {
        const result = await model.findByIdAndUpdate(id, data, { new: true });
        if (!result) {
          throw {
            status: 400,
            message: `El id: ${id} no se encuentra`,
          };
        }
        return result;
      } catch (error) {
        throw {
          status: error?.status || 500,
          message: error?.message || error,
        };
      }
    };
  };

  const _remove = (model) => {
    return async (id) => {
      try {
        const result = await model.findByIdAndDelete(id);
        if (!result) {
          throw {
            status: 400,
            message: `El id: ${id} no se encuentra`,
          };
        }
        return result;
      } catch (error) {
        throw {
          status: error?.status || 500,
          message: error?.message || error,
        };
      }
    };
  };

  const output = {};
  output.find = _find(model);
  output.findId = _findId(model);
  output.create = _create(model);
  output.update = _update(model);
  output.remove = _remove(model);
  return output;
};
