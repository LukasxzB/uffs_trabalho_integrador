import axios from "axios";

function handleErrors(error) {
  if (error.response.status === 401) {
    localStorage.removeItem("token");
    window.location.reload();
    return;
  }

  const msgs = error.response.data.message;
  if (typeof msgs === "string" || msgs instanceof String) {
    alert(msgs);
    return;
  }

  if (typeof msgs === "object" && msgs instanceof Array) {
    alert(msgs.join("\n"));
  }
}

export function RequestSender() {
  const get = (endpoint, callback) => {
    axios
      .get(endpoint)
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => handleErrors(error));
  };

  const post = (endpoint, data, callback) => {
    axios
      .post(endpoint, data)
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => handleErrors(error));
  };

  const put = (endpoint, data, callback) => {
    axios
      .put(endpoint, data)
      .then((response) => callback(response.data))
      .catch((error) => handleErrors(error));
  };

  const del = (endpoint, callback) => {
    axios.delete(endpoint).then((response) => callback(response.data));
  };

  return { get, post, put, del };
}
