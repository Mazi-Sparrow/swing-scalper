const generateId = (data) => data.reduce((acc, current) => Math.max(acc, current.id), 0) + 1;

export const insertItem = (data, item) => {
  data = [...data];
  item.id = generateId(data);
  item.inEdit = false;
  return data;
};
export const getItems = (data) => {
  data = [...data];
  return data;
};
export const updateItem = (data, item) => {
  data = [...data];
  let index = data.findIndex((record) => record.id === item.id);
  data[index] = item;
  return data;
};
export const deleteItem = (data, item) => {
  data = [...data];
  let index = data.findIndex((record) => record.id === item.id);
  data.splice(index, 1);
  return data;
};
