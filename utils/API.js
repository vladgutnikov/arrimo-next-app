const BASE_URL = "http://localhost:3000/";

// USERS
export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}api/users`);
  const data = await response.json();

  return data;
};

export const getUserById = async (userId) => {
  const response = await fetch(`${BASE_URL}api/users/${userId}`);
  const data = await response.json();
  if (data) return data;
  return {};
};

export async function addUser(formData) {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    const response = await fetch(`${BASE_URL}api/users`, Options);
    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}

// Update a new user
export async function updateUser(userId, formData) {
  const Options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };

  const response = await fetch(`${BASE_URL}api/users/${userId}`, Options);
  const json = await response.json();
  return json;
}

export async function deleteUser(userId) {
  const Options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(`${BASE_URL}api/users/${userId}`, Options);
  const json = await response.json();
  return json;
}
