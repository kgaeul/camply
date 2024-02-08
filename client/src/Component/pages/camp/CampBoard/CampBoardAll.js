import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./css/CampBoardAll.css";
import { Container } from "react-bootstrap";
import CampNavbar from "../CampNavbar";

function CampBoardAll() {
  const [boardData, setBoardData] = useState([]);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("yourTokenKey");
    if (token) {
      const decodedToken = parseJwt(token);
      setUserType(decodedToken.USER_TYPE);
      console.log("Decoded Token:", decodedToken);
    }

    axios
      .get("http://localhost:8080/camp/board/all", { responseType: "arraybuffer" })
      .then((response) => {
        const decodedData = new TextDecoder("utf-8").decode(response.data);
        const jsonData = JSON.parse(decodedData);
        setBoardData(jsonData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const parseJwt = (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));

      const decodeUTF8Fields = (fields) => {
        return Object.fromEntries(
          Object.entries(fields).map(([key, value]) => [key, decodeURIComponent(escape(value))])
        );
      };

      const decodedUser = {
        ...decodedToken,
        ...decodeUTF8Fields({
          user_name: decodedToken.user_name,
          user_address: decodedToken.user_address,
          user_businessaddress: decodedToken.user_businessaddress,
        }),
      };

      return {
        ...decodedUser,
        USER_TYPE: decodedUser.auth.includes("Admin") ? "Admin" : "User",
      };
    } catch (e) {
      return null;
    }
  };

  const handleRowClick = (camp_id) => {
    window.location.href = `/camp/board/get/${camp_id}`;
  };

  return (
    <section>
      <CampNavbar />
      <Container fluid className="home-section" id="home">
        <Container className="home-content"></Container>
      </Container>

      <h1>Camp Board - All Camps</h1>
      <table>
        <thead>
          <tr>
            <th>게시글 번호</th>
            <th>카테고리</th>
            <th>캠핑장 위치</th>
            <th>캠핑장 이름</th>
            <th>1박 가격</th>
          </tr>
        </thead>
        <tbody>
          {boardData.map((board) =>
            board ? (
              <tr
                key={board.camp_id}
                onClick={() => handleRowClick(board.camp_id)}
              >
                <td>{board.camp_id}</td>
                <td>{board.camp_select}</td>
                <td>{board.camp_location}</td>
                <td>{board.camp_name}</td>
                <td>{board.camp_price}</td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
      {userType === "Admin" && (
        <Link to="/camp/board/add">
          <button>게시글 작성하기</button>
        </Link>
      )}
    </section>
  );
}

export default CampBoardAll;
