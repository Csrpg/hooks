import { useState, useEffect, useRef } from "react";
import axios, { isCancel, AxiosError } from "axios";

import "./App.css";

function App() {
  const [mostrar, setMostrar] = useState(true);
  const [informacion, setInformacion] = useState<any[]>([]);
  const didRun = useRef(false);

  useEffect(() => {
    let data = "";
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/prueba/encontrarUsuario",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJmZXJuYW5kbyIsImNvcnJlbyI6ImZlckBjb3JyZW8uY29tIiwiZGlyZWNjaW9uIjoibWFkcmlkIiwiaWF0IjoxNzcxMzI1OTA2LCJleHAiOjE3NzEzMjU5NjZ9.1nfRdbwfM6SSVojvXfm9sb9K5_sVJ5vyPX0F6e151BE",
      },
      data: data,
    };

    if (!didRun.current) {
      axios
        .request(config)
        .then((response) => {
          console.log(response.data);
          console.log(response.status);

          if (response.status === 200) {
            setInformacion(response.data);
            setMostrar(true);
            console.log(response.data);
          } else {
            setMostrar(false);
            console.log("error");
          }
        })
        .catch((error) => {
          console.log(error);
        });
      didRun.current = true;
    }
  });

  return (
    <>
      {mostrar && (
        <>
          {informacion.map((item: any) => {
            return (
              <div>
                <h1>{item.nombre}</h1>
                <h1>{item.edad}</h1>
                <h1>{item.email}</h1>
              </div>
            );
          })}
        </>
      )}
      
    </>
  );
}

export default App;
