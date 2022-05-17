import axios from "axios";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import loader from "./IMG_0429.GIF";

const Main = () => {
  //  Setting State
  const [textInput, setTextInput] = useState();
  console.log("this is the textinput state = " + textInput);
  const [responses, setResponses] = useState([]);
  console.log("this is the response state = " + responses);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const json = JSON.stringify(responses);
    localStorage.setItem("responses", json);
  }, [responses]);

  // form handelers
  const handleChange = (e) => {
    setTextInput(e.target.value);
  };
  const handleSubmit = (e) => {
    setLoading((prevState) => !prevState);
    e.preventDefault();
    const api = "https://api.openai.com/v1/engines/text-curie-001/completions";
    const superSecretKey = process.env.REACT_APP_OPEN_AI_KEY;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${superSecretKey}`,
      },
    };

    const data = {
      prompt: textInput,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    try {
      const res = axios.post(api, data, config).then((res) => {
        let response = res.data.choices[0].text;
        let prompt = textInput;
        setLoading((prevState) => !prevState);
        setResponses([...responses, { prompt: prompt, response: response }]);
      });
    } catch (error) {
      alert(e);
    }
  };

  return (
    <div>
      <div>
        <h2>Fun with AI</h2>
        <form onSubmit={handleSubmit}>
          <label>Enter Prompt</label> <br />
          <textarea
            onChange={handleChange}
            type="text"
            value={textInput}
            name="textInput"
            placeholder="Type Prompt Here ... i.e) Create a poem about Pizza!"
          />
          <br />
          <Button
            type="submit"
            value="submit"
            variant="contained"
            style={{ backgroundColor: "#038C65" }}
          >
            Submit
          </Button>
        </form>
      </div>
      <div style={{ height: "100px" }}>
        {isLoading ? <img src={loader} alt="" width="100" /> : ""}
      </div>
      <div style={{ backgroundColor: "#FBF6EC" }}>
        <h1>Responses</h1>
        <ul>
          {responses.map((resObj, index) => (
            <li key={index}>
              <p>{resObj.prompt}</p>
              <br />
              <p>{resObj.response}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Main;
