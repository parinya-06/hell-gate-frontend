import axios from "axios";

export const listBook = async (authtoken) => {
  return await axios.get("http://localhost:5000/books", {
    headers: {
      authtoken,
    },
  });
};

export const addBook = async (value) =>{
  console.log('addBook=',value);
  return await axios.post("http://localhost:5000/books/crbook", value);
}

export const removeBook = async (id) =>{
  console.log('removeBook=',id);
  return await axios.delete("http://localhost:5000/books/"+id);
}

export const updateBook = async (id,value) =>{
  console.log('updateBook=',id);
  console.log('updateBook=',value);
  return await axios.put("http://localhost:5000/books/update-book/"+id,value);
}

export const buyBook = async (value) =>{
  console.log('buyBook=',value);
  return await axios.post("http://localhost:5000/historybook", value);
}
  
