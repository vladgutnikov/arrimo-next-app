import {
  deleteEvent,
  getEvents,
  postEvent,
  updateEvent,
} from "../../../database/controllers";
import connectMongo from "../../../database/db";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the Connection" })
  );

  // type of request
  const { method } = req;

  switch (method) {
    case "GET":
      getEvents(req, res);
      //   res.status(200).json({ method, name: "GET Request" });
      break;
    case "POST":
      postEvent(req, res);
      //   res.status(200).json({ method, name: "POST Request" });
      break;
    case "PUT":
      updateEvent(req, res);
      //   res.status(200).json({ method, name: "PUT Request" });
      break;
    case "DELETE":
      deleteEvent(req, res);
      //   res.status(200).json({ method, name: "DELETE Request" });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} not allowed`);
      break;
  }
}
