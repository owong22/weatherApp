import { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Loading from "./Loading.js";
import Footer from "./Footer";
import "./App.css";
function App() {
  const [data, setData] = useState({});
  const [weatherArray, setWeatherArray] = useState([]);
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [hasDuplicates, setHasDuplicates] = useState(true);
  const [oscarsWA, setOscarsWA] = useState(true);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=9979808349d411824d57e29f3d5609b0`;

  const popWeatherArray = () => {
    let tempArray = [...weatherArray];
    tempArray.pop();
    tempArray.pop();
    // setIndex(0); No longer needed after adding this line to 'searchLocation' function. Keep here in case something breaks
    setWeatherArray(tempArray);
  };

  const decrementIndex = () => {
    let newIndex = index - 1;
    if (newIndex < 0) {
      newIndex = weatherArray.length - 1;
    }
    setIndex(newIndex);
  };

  const incrementIndex = () => {
    let newIndex = index + 1;
    if (newIndex > weatherArray.length - 1) {
      newIndex = 0;
    }
    setIndex(newIndex);
  };

  const searchLocation = async () => {
    setIsLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
    setIsLoading(false);
    setLocation("");
    setWeatherArray([data, ...weatherArray]);
    setIndex(0);
    setOscarsWA(false);
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="main">
      <div>
        <form className="form" onSubmit={searchLocation}>
          <div>
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Enter Location"
              id="city"
              name="city"
              type="text"
              className="form input"
            />
            <button className="form button" type="submit">
              Find City
            </button>
          </div>
        </form>
      </div>

      <section className="section">
        <div className="section-center">
          {weatherArray.map((currentCity, cityIndex) => {
            let position = "nextSlide"; // Default, all classes will be nextSlide except for 2 that are lastSlide and activeSlide

            if (cityIndex == index) {
              // Display with slide that matches the current index
              position = "activeSlide";
            }
            if (weatherArray.length > 2) {
              if (
                cityIndex === index - 1 || //In all but one case, the lastSlide will be asigned to the city one index below the current index.
                (index === 0 && cityIndex === weatherArray.length - 1) // If the index is 0, there is no index lower, so it wraps around array and assigns the last element to be the lastSlide
              ) {
                position = "lastSlide";
              }
            } else if (weatherArray.length == 2) {
              // The carousel breaks with only cities in the array because at least 3 are needed, 1 assigned to each class type: activeSlide, lastSlide, nextSlide
              // So when the array only has two cities, I doubled the array to have 4 cities, then the carousel functions correctly
              setWeatherArray([...weatherArray, ...weatherArray]);
            }
            if (weatherArray.length == 5 && hasDuplicates == true) {
              // As soon as a 3rd city is added, the duplicate cites need to be removed
              popWeatherArray(); // Function that removes the last 2 cities in the array which are the duplicates
              setHasDuplicates(false); // Boolean created so the removal of the last two cities only occurs once after a third city is entered by a user. Does a more effiecnt solution exist?
            }

            return (
              <article key={currentCity.id + cityIndex} className={position}>
                <h3 className="text">{currentCity.name}</h3>

                {currentCity.main ? (
                  <h1 className="author">
                    {currentCity.main.temp.toFixed()}°F
                  </h1>
                ) : null}

                {currentCity.weather ? (
                  <p>With {currentCity.weather[0].main}</p>
                ) : null}

                <div>
                  {currentCity.name !== undefined && (
                    <div>
                      <div>
                        <p>Humidity: </p>
                        {currentCity.main ? (
                          <p>{currentCity.main.humidity}%</p>
                        ) : null}
                      </div>
                      <p>Wind Speed: </p>
                      {currentCity.wind ? (
                        <p>{currentCity.wind.speed.toFixed()} MPH</p>
                      ) : null}
                    </div>
                  )}
                </div>
              </article>
            );
          })}

          {oscarsWA ? (
            <h2 className="text">Oscar's Weather App</h2>
          ) : (
            <div>
              <button className="prev" onClick={decrementIndex}>
                <FiChevronLeft></FiChevronLeft>
              </button>
              <button className="next" onClick={incrementIndex}>
                <FiChevronRight></FiChevronRight>
              </button>
            </div>
          )}
        </div>
      </section>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
