import User from "./models/User";
import Event from "./models/Event";

// Users
export async function getUsers(req, res) {
  try {
    const users = await User.find({});

    if (!users) return res.status(404).json({ error: "Data not Found" });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching Data" });
  }
}

export async function getUserById(req, res) {
  try {
    const { userId } = req.query;

    if (userId) {
      const user = await User.findById(userId);
      res.status(200).json(user);
    }
    res.status(404).json({ error: "User not Selected...!" });
  } catch (error) {
    res.status(404).json({ error: "Cannot get the User...!" });
  }
}

export async function postUser(req, res) {
  try {
    const formData = req.body;
    if (!formData)
      return res.status(404).json({ error: "Form Data Not Provided...!" });
    User.create(formData, function (err, data) {
      return res.status(200).json(data);
    });
  } catch (err) {
    return res.status(404).json({ err });
  }
}

export async function putUser(req, res) {
  try {
    const { userId } = req.query;
    const formData = req.body;

    if (userId && formData) {
      const user = await User.findByIdAndUpdate(userId, formData);
      res.status(200).json(user);
    }
    res.status(404).json({ error: "User Not Selected...!" });
  } catch (error) {
    res.status(404).json({ error: "Error While Updating the Data...!" });
  }
}

export async function deleteUser(req, res) {
  try {
    const { userId } = req.query;
    if (userId) {
      const user = await User.findByIdAndDelete(userId);
      return res.status(200).json({ deletedAccount: user });
    }

    res.status(404).json({ error: "User Not Selected...!" });
  } catch (error) {
    res.status(404).json({ error: "Error While Deleting the User...!" });
  }
}

// Events

export async function getEvents(req, res) {
  try {
    const events = await Event.find({});

    if (!events) return res.status(404).json({ error: "Data not Found" });
    res.status(200).json(events);
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching Data" });
  }
}

export async function getEventById(req, res) {
  try {
    const { eventId } = req.query;

    if (eventId) {
      const event = await User.findById(eventId);
      res.status(200).json(event);
    }
    res.status(404).json({ error: "Event not Selected...!" });
  } catch (error) {
    res.status(404).json({ error: "Cannot get the Event...!" });
  }
}

export async function postEvent(req, res) {
  try {
    const formData = req.body;
    if (!formData)
      return res.status(404).json({ error: "Form Data Not Provided...!" });
    Event.create(formData, function (err, data) {
      return res.status(200).json(data);
    });
  } catch (err) {
    return res.status(404).json({ err });
  }
}

export async function putEvent(req, res) {
  try {
    const { eventId } = req.query;
    const formData = req.body;

    if (eventId && formData) {
      const user = await Event.findByIdAndUpdate(eventId, formData);
      res.status(200).json(user);
    }
    res.status(404).json({ error: "Event Not Selected...!" });
  } catch (error) {
    res.status(404).json({ error: "Error While Updating the Data...!" });
  }
}

export async function deleteEvent(req, res) {
  try {
    const { eventId } = req.query;
    if (eventId) {
      const event = await Event.findByIdAndDelete(eventId);
      return res.status(200).json({ deletedAccount: event });
    }

    res.status(404).json({ error: "Event Not Selected...!" });
  } catch (error) {
    res.status(404).json({ error: "Error While Deleting the Event...!" });
  }
}
