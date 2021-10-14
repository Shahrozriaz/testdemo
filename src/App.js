import React, { Component, useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import { Card, Input, message, Button, Space, Typography, List } from "antd";

function App() {
  
  const { Text, Link } = Typography;

  const [Name, setName] = useState(false);
  const [Password, setPassword] = useState(false);
  // const [Password, setPassword] = useState(false);
  const [IsLogin, setIsLogin] = useState(false);
  const [DataApi, setDataApi] = useState();

  const success = () => {
    message.success("SucessFully Login");
  };

  const error = () => {
    message.error("Incorrect Username or Password");
  };

  const handleclick = () => {
    let payload = {
      username: Name,
      password: parseInt(Password),
    };

    console.log("body", payload);

    var config = {
      headers: { "Content-Type": "application/json" },
    };

    axios
      .post(
        "https://xfoil-technical-interview.herokuapp.com/login",
        payload,
        config
      )
      .then((res) => {
        debugger;
        if (res.status == 200) {
          console.log("res", res);
          success();
          setDataApi(res.data);
          setIsLogin(true);
        } else {
          error();
        }
      })
      .catch((err) => {
        debugger;
        error();
        console.log("err", err);
      });
  };

  return (
    <>
      {!IsLogin ? (
        <Card
          title="Login Card"
          style={{ width: 500, margin: "auto", marginTop: "40px" }}
        >
          <Input
            placeholder="User Name"
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: "18px" }}
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: "18px" }}
          />
          <Button
            type="primary"
            onClick={handleclick}
            style={{ marginBottom: "18px" }}
          >
            Submit
          </Button>
        </Card>
      ) : (
        <Card
          title="Details"
          style={{ width: 500, margin: "auto", marginTop: "40px" }}
        >
          <Text>
            User : {DataApi?.firstNameAdmin + "   " + DataApi?.lastNameAdmin}
          </Text>

          <div style={{ marginTop: "20px" }}>
            <Text>id : {DataApi?.companyId}</Text>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Text>Office Location</Text>
            <List
              size="small"
              bordered
              dataSource={DataApi?.currentLocation}
              renderItem={(item) => <List.Item>{item.locationName}</List.Item>}
            />
          </div>
        </Card>
      )}
    </>
  );
}

export default App;
