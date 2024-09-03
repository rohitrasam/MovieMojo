import React, { BaseSyntheticEvent, useState } from "react";
import axios from 'axios';
import "./AdminDashboard.css";
import AdminBar from "./AdminBar";
import { Link } from "react-router-dom";

const AddMovie =()=>{
    const[movie,setMovie]=useState({
        name:"", posterUrl:"", desc:"",rating: 0,
        release_date: "", duration: 0,languages: "",
        genres: "", cast: "", formats:"",
    });
    const [errors, setErrors] = useState('');
   const handleChange=(e)=>{
    const{name,value}=e.target;
    setMovie((prevMovie)=>({
        ...prevMovie,[name]:value,
    }));
   } ;
   const validatedata = (e: BaseSyntheticEvent) => {
    if((!movie.name)||(!movie.cast)){
        setErrors("required");
        alert("required")
        return true;
    }
   };

   const handleSubmit = (e: React.BaseSyntheticEvent<object, any, any>) => {
    e.preventDefault();
    if (validatedata(e)) {
      console.log("Sign Up Data:", movie);
    }
  };

   const handleSubmitApi =()=>{
    console.log("Movie Details :", movie);
    // console.log(movie.languages.split(","));
    
    axios.post("http://localhost:8000/movies/post_movie",{
    name : movie.name ,
    posterUrl:movie.posterUrl,
    desc: movie.desc,
    rating: movie.rating,
    release_date: movie.release_date,
    duration:movie.duration,
    languages:movie.languages.split(","),
    genres:movie.genres.split(","),
    cast:movie.cast.split(","),
    formats:movie.formats.split(",")
      })

        .then(result =>{
          console.log(result);
          alert(result);
        })

        .catch((error) => {
          console.error(error.response.data);
        })
    };

    return (
        <div className="container-scroller">
            <div className="container-fluid page-body-wrapper">
                <AdminBar />
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="page-header">
                            <h3 className="page-title">Add Movie</h3>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/admindashboard">Dashboard</Link></li>
                                </ol>
                            </nav>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-12 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title" style={{ textAlign: 'center' }}>Add Movie</h4>
                                            <div className="form-group">
                                                <label htmlFor="tName">Movie Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={movie.name}
                                                    onChange={handleChange}
                                                    placeholder="Movie Name"
                                                />
                                            </div>

                                            {/* <div className="form-group">
                                                <label htmlFor="tName">Poster URL</label>
                                                <input
                                                        type="text"
                                                        name="posterUrl"
                                                        value={movie.posterUrl}
                                                        onChange={handleChange}
                                                        placeholder="Poster URL"
                                                        />
                                            </div> */}

                                            <div className="form-group">
                                                <label htmlFor="tName">Movie Descrition</label>
                                                <textarea
                                                name="desc"
                                                value={movie.desc}
                                                onChange={handleChange}
                                                placeholder="Description"
                                            />
                                            </div>

                                            <div className="form-group">
                                            <label htmlFor="tName"> Duration</label>
                                            <input
                                                type="number"
                                                name="duration"
                                                value={movie.duration}
                                                onChange={handleChange}
                                                placeholder="Duration (minutes)"
                                            />
                                            </div>
                                            
                                            <div className="form-group">
                                            <label htmlFor="tName">Release Date</label>
                                            <input
                                                type="date"
                                                name="release_date"
                                                value={movie.release_date}
                                                onChange={handleChange}
                                                placeholder="Release Date"
                                            />
                                            </div>
                                            <div className="form-group">
                                            <label htmlFor="tName">Movie Rating</label>
                                            <input
                                                type="number"
                                                name="rating"
                                                value={movie.rating}
                                                onChange={handleChange}
                                                placeholder="Rating"
                                            />
                                            </div>
                                            

                                            <div className="form-group">
                                                <label htmlFor="tName">Languages</label>
                                                <input
                                                        type="text"
                                                        name="languages"
                                                        value={movie.languages}
                                                        onChange={handleChange}
                                                        placeholder="Languages"
                                                        />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="tName">Genres</label>
                                                <input
                                                        type="text"
                                                        name="genres"
                                                        value={movie.genres}
                                                        onChange={handleChange}
                                                        placeholder="Genres"
                                                        />
                                            </div>

                                            <div className="form-group">
                                            <label htmlFor="tName">Cast</label>
                                            <input
                                                type="text"
                                                name="cast"
                                                value={movie.cast}
                                                onChange={handleChange}
                                                placeholder="Cast"
                                            />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="tName">Formats</label>
                                                <input
                                                        type="text"
                                                        name="formats"
                                                        value={movie.formats }
                                                        onChange={handleChange}
                                                        placeholder="Formats"
                                                        />
                                            </div>

                                            </div>
                                            </div>
                                            </div>
                                            </div>
                                            <button onClick={handleSubmitApi} className="btn btn-primary">Add</button>
                                            </form>

                                           
                                        </div>
                                    </div>
                                </div>
                            </div>
    );
};

export default AddMovie;
