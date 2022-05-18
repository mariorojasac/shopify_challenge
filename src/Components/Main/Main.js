import axios from "axios";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import loader from "./IMG_0429.GIF";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const Main = () => {
  //  Setting State
  const [textInput, setTextInput] = useState();
  const [responses, setResponses] = useState([]);
  const [isLoading, setLoading] = useState(false);

  //Saving item to local storage
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
      axios.post(api, data, config).then((res) => {
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
        <h2>Fun with OpenAI</h2>
        <form onSubmit={handleSubmit}>
          <p>Enter Prompt</p> <br />
          <TextareaAutosize
            maxRows={5}
            aria-label="maximum height"
            placeholder="Type Prompt Here ... i.e) Create a poem about Pizza!"
            defaultValue=""
            onChange={handleChange}
            type="text"
            value={textInput}
            name="textInput"
            required
            style={{ width: 300, height: 200 }}
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
      <h3>Responses</h3>
      <div
        style={{
          backgroundColor: "#FBF6EC",
          height: "55vh",
          overflow: "scroll",
          marginBottom: "6vh",
        }}
      >
        <ul
          style={{
            backgroundColor: "#FBF6EC",
          }}
        >
          {responses.map((resObj, index) => (
            <Card
              sx={{
                maxWidth: "90%",
                margin: "10px",
              }}
              key={index}
            >
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Prompt: {resObj.prompt}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Response: {resObj.response}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Main;
