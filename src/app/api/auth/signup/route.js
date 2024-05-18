import connectToDB from "base/configs/db";

export async function GET(req) {
  await connectToDB();
  return Response.json({ message: "signup api route" });
}
