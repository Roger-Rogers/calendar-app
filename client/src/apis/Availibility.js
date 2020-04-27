import Api from "./Api";

export default {
  async useravail(email) {
    const res = await Api.post("/useravail", {
      email: email
    });
    return res;
  }
};
