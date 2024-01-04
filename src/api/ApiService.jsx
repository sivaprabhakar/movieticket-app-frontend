import axios from "axios"


export const getAllMovies = async()=>{
   const res =await axios.get("/movie")
   .catch((err)=>console.log(err))
   if(res.status !== 200){
    return console.log("no data")

   }
   const data = await res.data;
   return data;
}

export const sendUserAuthRequest = async (data, signup) => {
   const res = await axios
     .post(`/user/${signup ? "signup" : "login"}`, {
       name: signup ? data.name : "",
       email: data.email,
       password: data.password,
     })
     .catch((err) => console.log(err));
 
   if (res.status !== 200 && res.status !== 201) {
     console.log("Unexpected Error Occurred");
   }
 
   const resData = await res.data;
   return resData;
 };
 export const getMovieDetails = async (id) => {
  try {
    const res = await axios.get(`/movie/${id}`);
    
    if (res.status === 200) {
      return res.data; 
    } else {
      console.log("Unexpected Error:", res.status);
      return null; 
    }
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
};

export const newBooking = async (data) => {
  try {
    const res = await axios.post("/booking", {
      movie: data.movie,
      seatNumbers: data.seatNumbers,
      date: data.date,
      user: localStorage.getItem("userId"),
    });

    if (res.status === 201) {
      const resData = await res.data;
      return resData;
    } else {
      console.log("Unexpected Error");
      return null; 
    }
  } catch (err) {
    console.log("Error:", err);
    return null; 
  }
};




export const getUserBookings = async () => {
  const id = localStorage.getItem("userId");

  try {
    const res = await axios.get(`/user/booking/${id}`);
    
    if (res.status === 200) {
      const resData = await res.data;
      return resData;
    } else {
      console.log("Unexpected Error:", res.status);
      
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
     
      console.log("Unauthorized request:", error.message);
    } else {
      console.error("Request failed:", error);
      throw error;
    }
  }
};

export const deleteBooking = async (id) => {
  const res = await axios
    .delete(`/booking/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unepxected Error");
  }

  const resData = await res.data;
  return resData;
};

export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios.get(`/user/${id}`).catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};