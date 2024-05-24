import { cookies } from "next/headers";

export function GET(req) {
  try {
    cookies().delete("token");
    return Response.json(
      { message: "User logged out Successfully :))" },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return Response.json({ error: "UnKnown Internal Server Error !!!" });
  }
}
