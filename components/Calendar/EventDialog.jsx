import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  TextField,
} from "@mui/material";
import { forwardRef, useReducer } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addEvent, getEvents } from "../../utils/API";
import Error from "../Error";
import Success from "../Success";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

export const EventDialog = ({
  eventModal,
  setEventModal,
  eventTitle,
  setEventTitle,
  addNewEvent,
  editEvent,
  deleteEvent,
  isEditModal,
  setModalAdd,
}) => {
  const queryClient = useQueryClient();
  const addMutation = useMutation(addEvent, {
    onSuccess: () => {
      queryClient.prefetchQuery("events", getEvents);
    },
  });

  const handleAdd = (e) => {
    e.preventDefault();
    addNewEvent();
    let event = {
      title: eventTitle,
    };
  };

  const handleEdit = (event) => {
    editEvent(event);
  };
  const handleDelete = (e) => {
    deleteEvent(e);
  };

  if (addMutation.isLoading) return <div>Loading!</div>;
  if (addMutation.isError) return <Error message={addMutation.error.message} />;
  if (addMutation.isSuccess) return <Success message={"Added Successfully"} />;

  return (
    <Dialog
      open={eventModal}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setModalAdd(false)}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        {isEditModal ? <h3>Edit Event</h3> : <h3>Add New Event</h3>}

        <TextField
          required
          variant="outlined"
          placeholder="Event Title"
          type="text"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          sx={{ color: "black" }}
        />
      </DialogContent>
      <DialogActions>
        <Box width="100%" display="flex" justifyContent="space-around">
          <Box>
            {isEditModal ? (
              <>
                <Button
                  sx={{ marginRight: "10px" }}
                  variant="outlined"
                  onClick={handleEdit}
                  color="success"
                >
                  Edit
                </Button>
                <Button
                  sx={{ marginRight: "10px" }}
                  color="error"
                  variant="outlined"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </>
            ) : (
              <Button
                sx={{ marginRight: "10px" }}
                variant="outlined"
                onClick={handleAdd}
                color="success"
              >
                Add
              </Button>
            )}
          </Box>
          <Button onClick={() => setEventModal(false)} variant="outlined">
            Close
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
