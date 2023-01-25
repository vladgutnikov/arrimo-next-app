import {
  getEventById,
  putEvent,
  deleteEvent,
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
      getEventById(req, res);
      break;
    case "PUT":
      putEvent(req, res);
      break;
    case "DELETE":
      deleteEvent(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
