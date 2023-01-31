export const url = "https://planeta-acuarela.vercel.app/api";
export const setHeaders = () => {
  const headers = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  };

  return headers;
};
