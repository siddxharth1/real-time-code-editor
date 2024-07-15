import { Language_Versions } from "./constants";
import axios from "axios";

export const executeCode = async (language, sourceCode) => {
  const resp = await axios
    .create({ baseURL: "https://emkc.org/api/v2/piston" })
    .post("/execute", {
      language: language.language,
      version: language.version,
      files: [
        {
          content: sourceCode,
        },
      ],
    });

  return resp.data;
};

export const getLanguages = async () => {
  const resp = await axios
    .create({ baseURL: "https://emkc.org/api/v2/piston" })
    .get("/runtimes");

  return resp.data;
};
