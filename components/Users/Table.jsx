import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { useQuery } from "react-query";
import { getUsers } from "../../utils/API";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleChangeAction,
  updateAction,
  deleteAction,
} from "../../redux/reducer";
import { useEffect } from "react";
import styles from "../../styles/Table.module.css";

export default function Table() {
  const { isLoading, isError, data, error } = useQuery("users", getUsers);

  useEffect(() => {
    window.localStorage.setItem("users", JSON.stringify(data));
  }, [data]);

  if (isLoading) return <div>Users are Loading...</div>;
  if (isError) return <div>Got Error {error}</div>;

  return (
    <div className={styles.rightContainer}>
      {data.map((obj, i) => (
        <Tr {...obj} key={i} />
      ))}
    </div>
  );
}

function Tr({ _id, name, email }) {
  const visible = useSelector((state) => state.app.client.toggleForm);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(toggleChangeAction(_id));
    if (visible) {
      dispatch(updateAction(_id));
    }
  };

  const handleDelete = () => {
    if (!visible) {
      dispatch(deleteAction(_id));
    }
  };
  return (
    <>
      <div className={styles.card}>
        <div className={styles.innerBtnCard}>
          <div>
            <button className={styles.btnEdit} onClick={handleUpdate}>
              <BiEdit size={25} color={"#2dce89"}>
                Edit
              </BiEdit>
            </button>
          </div>
          <div>
            <button className={styles.btnDel} onClick={handleDelete}>
              <BiTrashAlt size={25} color={"red"}>
                Delete
              </BiTrashAlt>
            </button>
          </div>
        </div>
        <h2>Name: {name}</h2>
        <h2>Email: {email}</h2>
      </div>
    </>
  );
}
