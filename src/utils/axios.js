import axios from "axios";
const apiInstance = axios.create({
	baseURL: "https://us-central1-rebel-grooming.cloudfunctions.net/api",
});
// const apiInstance = axios.create({
// 	baseURL: "http://localhost:5001/rebel-grooming/us-central1/api",
// });
export default apiInstance;
