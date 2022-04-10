import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Two from './images/two.png'

function App() {
  let [AllSkins, setAllSkins] = useState(null);

  let [opening, setOpening] = useState(false)

  let [refresh, setRefresh] = useState(false)

  let [refreshing, setRefreshing] = useState(false)

  const GetSkins = () => {
    return new Promise((resolve, reject) => {
      axios.get("https://valorant-api.com/v1/weapons/skins").then((res) => {
        resolve(res.data.data);
      });
    });
  };

  const RandomNumber = () => {
    return new Promise((resolve, reject) => {
      let resultRandom = [];

      for (let i = 0; i < 6; i++) {
        let Random = Math.floor(Math.random() * 456);

        resultRandom = [...resultRandom, Random];
      }

      resolve(resultRandom);
    });
  };

  const Main = async () => {
    let Random = await RandomNumber();
    let skins = await GetSkins();

    let resultSkins = Random.map((item) => {
      return {
        skin: skins[item],
        id: item,
        isOpened: false,
      };
    });

    setAllSkins(resultSkins);
  };

  useEffect(() => {
    Main();
  }, [refresh]);

  console.log(AllSkins);

  return (
    <div className="App">

      {refreshing ? <div className="loader"></div> : null}

      <h1>FAKE NIGHT MARKET</h1>
      <div className="container">
        {AllSkins && AllSkins.length > 0
          ? AllSkins.map((item) => {

            let levels_skin = item.skin.levels.length
              return (
                <div>
                  {item.isOpened ? <p>{item.skin.displayName}</p> : <p>?</p>}
                  <div
                    key={item.id}
                    className={opening ? "card-animated" : "card"}
                    onClick={() => {
                      console.log(item.id);
                      let updateState = AllSkins.map((items) => {
                        return {
                          ...items,
                          isOpened: item.id === items.id ? true : items.isOpened,
                        };
                      });

                      setOpening(true)
                      setTimeout(()=>{
                        setAllSkins(updateState);
                        setOpening(false)
                      }, 2000)
                    }}
                  >
                    {/* <p>{item.skin.levels.length}</p> */}
                    {item.isOpened ? null : <img className={levels_skin <= 1 ? "Two-img-noob" : levels_skin > 1 && levels_skin < 3 ? "Two-img-rookie" : levels_skin >= 3 && levels_skin < 5 ? "Two-img-good" : levels_skin == 5 ? "Two-img-ace" : null} src={Two}></img>}
                    <div className={item.isOpened ? "img-container-open" : "img-container-close"}>
                      <img
                        style={{ width: "200px" }}
                        src={item.skin.displayIcon ? item.skin.displayIcon : "Not found image"}
                      ></img>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>

      <button onClick={()=>{
        setRefreshing(true)
        setTimeout(()=>{
          setRefreshing(false)
          setRefresh(!refresh)
        }, 1500)
      }} className="refresh-btn"><p>Refresh</p></button>
    </div>
  );
}

export default App;
