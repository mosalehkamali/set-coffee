import { validatePhone } from "@/utils/auth";
import connectToDB from "base/configs/db";
import otpModel from "base/models/Otp";
const request = require("request");

export async function POST(req) {
  try {
    connectToDB();
    const { phone } = await req.json();
    
    if (!validatePhone(phone)) {
      return Response.json(
        { message: "Phone is not valid !!" },
        {
          status: 403,
        }
      );
    }

    const code = Math.floor(Math.random() * 10000 + 10000).toString();

    const now = new Date();
    const expTime = now.getTime() + 120_000;

    const isOtp = await otpModel.findOne({ phone });

    if (isOtp && isOtp.useTimes === isOtp.maxUse) {
        await otpModel.findOneAndUpdate(
          { phone },
          {
            $set: { useTimes: 0 },
          }
        );
        return Response.json(
          { message: "Limit usege !!!" },
          {
            status: 410,
          }
        );
    }

    request.post(
      {
        url: "http://ippanel.com/api/select",
        body: {
          op: "pattern",
          user: "u09140676389",
          pass: "Faraz@1439823020566509",
          fromNum: "3000505",
          toNum: phone,
          patternCode: "6ett5upl1k0zkly",
          inputData: [{ "verification-code": code }],
        },
        json: true,
      },
      async function (error, response, body) {
        if (!error && response.statusCode === 200) {
          //YOU‌ CAN‌ CHECK‌ THE‌ RESPONSE‌ AND SEE‌ ERROR‌ OR‌ SUCCESS‌ MESSAGE
          if (isOtp) {
            await otpModel.findOneAndUpdate(
              { phone },
              {
                $set: { code, expTime },
              }
            );
          } else {
            await otpModel.create({ phone, code, expTime });
          }
        } else {
          console.log(error);
          return Response.json(
            { message: "failed to sending code !!!" },
            { status: 500 }
          );
        }
      }
    );

    return Response.json(
      { message: "Code sent to phone successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return Response.json(
      { error: "UnKnown Internal Server Error !!!" },
      { status: 500 }
    );
  }
}
