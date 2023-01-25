import { useEffect } from "react";
import { useQueryClient, useMutation } from "react-query";
import { addUser, getUsers } from "../../utils/API";
import Error from "../Error";
import Success from "../Success";
import styles from "../../styles/Users.module.css";

export default function AddUserForm({ formData, setFormData }) {
  const queryClient = useQueryClient();
  const addMutation = useMutation(addUser, {
    onSuccess: () => {
      queryClient.prefetchQuery("users", getUsers);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0)
      return console.log("Don't have Form Data");
    let { name, email } = formData;

    const model = {
      name: name,
      email,
    };

    addMutation.mutate(model);
  };

  if (addMutation.isLoading) return <div>Loading!</div>;
  if (addMutation.isError) return <Error message={addMutation.error.message} />;
  if (addMutation.isSuccess) return <Success message={"Added Successfully"} />;

  return (
    <form onSubmit={handleSubmit} className={styles.formEdit}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          onChange={setFormData}
          name="name"
          placeholder="Name"
        />
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          onChange={setFormData}
          name="email"
          placeholder="Email"
        />
      </div>
      <button className={styles.btnFormEdit}>Add User</button>
    </form>
  );
}
