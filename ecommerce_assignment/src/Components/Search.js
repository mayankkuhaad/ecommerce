import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Search.css";

export default function Search() {
  const [image, setimage] = useState("");
  const [getImage, setgetImage] = useState([]);
  const [imgc, setimgc] = useState(false);
  const bookm = [];
  const [BookMarkImg, setBookMarkIMg] = useState([]);

  const Preview = () => {
    dataFetching();
    setimage("");
  };

  const dataFetching = async () => {
    await axios
      .get(
        `https://api.unsplash.com/search/photos?page=1&query=${image}&client_id=PUJMdBbZLpTcPaCz0IffHRW6T9Fg3WZRpZ9occjVVfk`
      )
      .then((res) => {
        // console.log(res.data.results)
        setgetImage(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    dataFetching();
  }, []);

  return (
    <>
      <div className="Heading">
        <h2 className="Header">eCommerce App</h2>
        <button
          className="BookMarks"
          onClick={() => {
            console.log(BookMarkImg);
            if (imgc) {
              setimgc(false);
            } else {
              setimgc(true);
            }
          }}
        >
          BookMarks
        </button>
      </div>
      <div className="container">
        <input
          type="text"
          placeholder="Search text"
          value={image}
          onChange={(e) => setimage(e.target.value)}
        />
        <button type="submit" className="SearchButton" onClick={Preview}>
          Search
        </button>
      </div>
      <div className="ImageContainer">
        {imgc
          ? BookMarkImg.map((elem) => {
              return (
                <>
                  <img
                    className="Cloumns"
                    key={elem.id}
                    src={elem.urls.small}
                    alt=""
                  />
                </>
              );
            })
          : getImage.map((elem, index) => {
              return (
                <>
                  <img
                    className="Cloumns"
                    key={elem.id}
                    src={elem.urls.small}
                    onClick={() => {
                      bookm.push(elem);
                      console.log(bookm);
                      setBookMarkIMg(bookm);
                    }}
                    alt=""
                  />
                </>
              );
            })}
      </div>
    </>
  );
}
