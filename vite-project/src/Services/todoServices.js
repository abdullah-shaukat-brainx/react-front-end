import {
  authorizedPostCall,
  authorizedDeleteCall,
  getCall,
  authorizedPutCall,
} from "./APIsServices";

export const getTodos = async () => {
  return new Promise((resolve, reject) => {
    getCall("/todos/get_todos")
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const addTodo = async (text, status) => {
  return new Promise((resolve, reject) => {
    authorizedPostCall("/todos/create_todo", { text, status })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteTodo = async (id) => {
  return new Promise((resolve, reject) => {
    authorizedDeleteCall(`/todos/delete_todo/${id}`)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateTodo = async (id, text, status) => {
  return new Promise((resolve, reject) => {
    authorizedPutCall(`/todos/update_todo/${id}`, { text, status })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
