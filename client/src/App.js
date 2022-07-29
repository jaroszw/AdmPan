import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(name, email);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, email: email, password: password }),
    };
    fetch("http://localhost:5000/user/register", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <h1>HELLO</h1>
      <div>
        <form action="" className="wrapper" onSubmit={submitHandler}>
          <input
            value={name}
            type="text"
            name="name"
            id=""
            onChange={(e) => setName(e.target.value)}
          />
          <input
            value={email}
            type="text"
            name="email"
            id=""
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            value={password}
            type="password"
            name="password"
            id=""
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default App;
