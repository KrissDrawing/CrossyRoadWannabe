import { createResultElement } from "../UI/UI";
import axios from "axios";
export const getResults = () => {
  let data;
  data = axios("https://us-central1-crossyroadwannabe.cloudfunctions.net/results")
    .then((data) => {
      console.log(data.data);
      data.data.map((item, index) => {
        createResultElement(item, index + 1);
      });
    })
    .catch((err) => console.log(err));
};

export const postResult = (username, result) => {
  axios
    .post("https://us-central1-crossyroadwannabe.cloudfunctions.net/addResult", {
      username,
      result,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
