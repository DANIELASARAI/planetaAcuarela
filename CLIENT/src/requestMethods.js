import axios from "axios";

const BASE_URL = "https://planeta-acuarela.vercel.app/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjNmNjRhNDBjNzhiYTY3NzZmNmYzNCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NzkyMDY2MCwiZXhwIjoxNjY4MTc5ODYwfQ.Zx_Ll4C5snjyw7og7q3-WD0Bw1MXk6ncA0OihBVi_yA";

export const publicRequest = axios.create({ baseURL: BASE_URL });

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
