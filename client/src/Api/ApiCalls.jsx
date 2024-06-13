import axios from 'axios';

const Api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URI}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const fetchData = async (endpoint) => {
  try {
    const response = await Api.get(endpoint);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};

export const FetchAllAreaNames = () => fetchData('/area/get-names');
export const FetchLatestProperties = () => fetchData('/property/get-latest');
export const FetchTopAreas = () => fetchData('/area/top-areas');
export const FetchPropertiesForRent = () => fetchData('/property/for-rent');
export const FetchTopTypes = () => fetchData('/type/get-top');
export const FetchAllDevelopers = () => fetchData('/developer/get-all');
export const FetchDeveloper = (id) => fetchData(`/developer/get/${id}`);
export const FetchProperty = (id) => fetchData(`/property/get/${id}`);
export const FetchLatestLaunches = () => fetchData('/launch/get-latest');
export const FetchLaunchDetails = (id) => fetchData(`/launch/get/${id}`);
export const FetchDeveloperLaunch = (developerId) => fetchData(`/launch/developer-launch/${developerId}`);
export const FetchCompound = (compoundId) => fetchData(`/compound/get/${compoundId}`);
export const FetchTopCompounds = () => fetchData('/compound/get-top');
export const FetchAllLaunches = () => fetchData('/launch/get-all');
export const FetchAllCompoundsNames = () => fetchData('/compound/get-names');
export const FetchAllTypesNames = () => fetchData('/type/get');



// import axios from 'axios';

// const Api = axios.create({
//   baseURL: `${import.meta.env.VITE_SERVER_URI}`,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
// });

// export const FetchAllAreaNames= async()=>{
//    const response= await Api.get("/area/get-names")
//    return response.data.data
// }
// export const FetchLatestProperties= async()=>{
//    const response= await Api.get("/property/get-latest")
//    return response.data.data
// }
// export const FetchTopAreas= async()=>{
//    const response= await Api.get("/area/top-areas")
//    return response.data.data
// }
// export const FetchPropertiesForRent= async()=>{
//    const response= await  Api.get("/property/for-rent")
//    return response.data.data
// }
// export const FetchTopTypes= async()=>{
//    const response= await  Api.get("/type/get-top")
//    return response.data.data
// }
// export const FetchAllDevelopers= async()=>{
//    const response= await  Api.get("/developer/get-all")
//    return response.data.data
// }
// export const FetchDeveloper = async(id)=>{
//    const response= await  Api.get(`/developer/get/${id}`)
//    return response.data.data
// }
// export const FetchProperty = async(id)=>{
//    const response= await  Api.get(`/property/get/${id}`)
//    return response.data.data
// }
// export const FetchLatestLunches = async()=>{
//    const response= await  Api.get(`/launch/get-latest`)
//    return response.data.data
// }
// export const FetchLaunchDetails = async(id)=>{
//    const response= await  Api.get(`/launch/get/${id}`)
//    return response.data.data
// }
// export const FetchDeveloperLaunch = async(developerId)=>{
//    const response= await  Api.get(`/launch/developer-launch/${developerId}`)
//    return response.data.data
// }
// export const FetchCompound = async(compoundId)=>{
//    const response= await  Api.get(`/compound/get/${compoundId}`)
//    return response.data.data
// }
// export const FetchTopCompounds = async()=>{
//    const response= await  Api.get(`/compound/get-top`)
//    return response.data.data
// }
// export const FetchAllLaunches = async()=>{
//    const response= await  Api.get(`launch/get-all`)
//    return response.data.data
// }
// export const FetchAllCompoundsNames = async()=>{
//    const response= await Api.get("/compound/get-names");
//    return response.data.data
// }

// export const FetchAlTypesNames = async()=>{
//    const response= await Api.get("/type/get");
//    return response.data.data
// }

