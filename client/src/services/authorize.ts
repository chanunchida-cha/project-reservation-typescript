//token
export const getToken = () => {
  if (typeof window != "undefined") {
    if (sessionStorage.getItem("token")) {
      return JSON.parse(sessionStorage.getItem("token") || "{}");
    } else {
      return false;
    }
  }
};
