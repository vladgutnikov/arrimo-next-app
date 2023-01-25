import { useQuery, useMutation, useQueryClient } from "react-query";
import { getUserById, getUsers, updateUser } from "../../utils/API";
import styles from "../../styles/Users.module.css";

export default function UpdateUserForm({ formId, formData, setFormData }) {
  const queryClient = useQueryClient();
  const { isLoading, isError, data } = useQuery(["users", formId], () =>
    getUserById(formId)
  );
  const UpdateMutation = useMutation((newData) => updateUser(formId, newData), {
    onSuccess: async (data) => {
      queryClient.prefetchQuery("users", getUsers);
    },
  });

  if (isLoading) return <div>Loading...!</div>;
  if (isError) return <div>Error</div>;

  const { name, email } = data;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updated = Object.assign({}, data, formData);
    await UpdateMutation.mutate(updated);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formEdit}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={setFormData}
          defaultValue={name}
        />
      </div>

      <div className={styles.inputContainer}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={setFormData}
          defaultValue={email}
        />
      </div>
      <button className={styles.btnFormEdit}>Update User</button>
    </form>
  );
}
