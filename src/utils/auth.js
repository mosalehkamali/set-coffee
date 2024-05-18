import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

export const hasher = async (password) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

export const passwordValidator = async (hashedPassword, password) => {
  const isValidPassword = await compare(hashedPassword, password);
  return isValidPassword;
};

export const tokenGenrator = (data) => {
  const token = sign({ ...data }, process.env.AccessTokenPrivateKey, {
    expiresIn: "60s",
  });
  return token;
};

export const verifyToken = () => {
  try {
    const payLoad = verify(token, process.env.AccessTokenPrivateKey);

    return payLoad;
  } catch (err) {
    console.log("Verify Access Token Error =>", err);
    return false;
  }
};

export const generateRefreshToken = (data) => {
  const token = sign({ ...data }, process.env.RefreshTokenPrivateKey, {
    expiresIn: "15d",
  });
  return token;
};
