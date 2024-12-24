import { Grid, Rating, TextField } from "@mui/material";
import React,{useState,useEffect} from "react";
import BookOverview from "../../components/BookOverview/BookOverview.component";
import CustomButton from "../../components/CustomButton/CustomButton.component";
import useQuery from "../../hooks/useQuery";
import useMutation from "../../hooks/useMutation";
const Home = () => {
  const [books, setBooks] = useState([]);
  const { isLoading, response,fetchData } = useQuery({
    url: "/books/getAll",
    showSnack: false,
    onSuccess: (data) => {
      setBooks(data.books);
      console.log(data.books);
    },
  });
  const [bookOfTheDay,setBook] = useState()
  const { mutate } = useMutation({
    url: '/books/getRandomBook',
    showSnack: false,
    onSuccess: (res) => {
      setBook(res.book)
    },
  });


  useEffect(()=>{
    fetchData();
    mutate()
  },[])
  return (
    <div className="w-full h-full flex flex-col overflow-y-auto">
      <div className="section1 w-full h-56 flex gap-8 p-3">
        <div className="h-full w-3/4 rounded-xl shadow-shadow1 p-5 flex flex-col gap-3 items-start ">
          <div className="text-3xl font-semibold text-primary">
            Search through a collection of thousands of books
          </div>
          <TextField label="Seach by book name, type or category" fullWidth />
          <CustomButton size="small">SEARCH</CustomButton>
        </div>
        <div className="h-full flex-1 rounded-xl shadow-shadow1 p-5 flex flex-col gap-4">
          <div className="w-full flex-1 rounded-xl border-primary border-4 flex items-center justify-start p-3">
            <span className="text-3xl text-primary font-semibold mr-2">
              1000+{" "}
            </span>{" "}
            books rented
          </div>
          
        </div>
      </div>
      <div className="section2 w-full p-3 flex flex-col gap-6">
        <div className="w-full rounded-lg shadow-shadow1 p-3">
          <div className="text-2xl text-primary font-semibold mb-3">
            Books we recommended for you!
          </div>
          {!isLoading ? (
            <Grid container spacing={2}>
              {books.slice(0).reverse().slice(0,12).map((book,idx) => (
                <Grid item md={2}>
                  <BookOverview book={book} key={idx}/>
                </Grid>
              ))}
            </Grid>
          ) : null}
        </div>
        <div className="w-full h-fit flex gap-4">
          <div className="w-3/5 rounded-lg shadow-shadow1 p-3 flex flex-col">
            <div className="text-2xl text-primary font-semibold mb-3">
              Book of the day
            </div>
            <div className="w-full flex flex-1 gap-8">
              <img
                src="https://images.unsplash.com/photo-1633477189729-9290b3261d0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1922&q=80"
                className="w-2/5 rounded-lg"
                alt=""
              />
              <div className="h-full flex-1 flex flex-col items-start justify-between gap-2">
                <div className="text-lg text-primary font-semibold">
                  #2nd best rental
                </div>
                <div className="text-5xl font-semibold">
                  {bookOfTheDay?.name}
                </div>
                <Rating defaultValue={4} size="large" />
                <div className="text-3xl font-semibold text-primary">
                  Rs. {bookOfTheDay?.rentPrice}/-
                </div>
                <CustomButton>ADD TO CART</CustomButton>
              </div>
            </div>
          </div>

          <div className="h-full flex-1 flex flex-col rounded-lg shadow-shadow1 p-3 ">
            <div className="text-2xl text-primary font-semibold mb-3">
              Read it again!
            </div>
            <Grid container spacing={2}>
              {[...Array(2)].map((i) => (
                <Grid item md={6}>
                  <BookOverview />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
