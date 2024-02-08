import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import Reply from "./Board/Reply";
import CampNavbar from "../CampNavbar";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const parseJwt = (token) => {
  console.log("Parsed JWT:", token);
};

function CampBoardDetail() {
  const location = useLocation();
  const [boardData, setBoardData] = useState({ camp_images: [] });
  const { camp_id } = useParams();
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState(
    localStorage.getItem("yourTokenKey")
  );
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const handleHeart = () => {
    setLike(!like);
    const userId = parseJwt(userToken)?.user_id;
    axios
      .post(`http://localhost:8080/camp/board/add/dips`, { camp_id: camp_id, user_id: userId })
      .then((response) => {
        alert("좋아요!.");
      })
      .catch((error) => {
        alert("좋아요 실패: " + error.response.data.message);
      });
  };
  
  
  const [like, setLike] = useState(false);

  const initializeMap = useCallback(() => {
    if (window.kakao && boardData.camp_address) {
      const mapContainer = document.getElementById("map");
      if (mapContainer) {
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        // 지도를 생성
        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        // 주소-좌표 변환 객체를 생성
        const geocoder = new window.kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색
        geocoder.addressSearch(
          boardData.camp_address,
          function (result, status) {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(
                result[0].y,
                result[0].x
              );

              // 결과값으로 받은 위치를 마커로 표시
              const marker = new window.kakao.maps.Marker({
                map: map,
                position: coords,
              });

              // 인포윈도우로 장소에 대한 설명을 표시
              const infowindow = new window.kakao.maps.InfoWindow({
                content: `<div style="width:150px;text-align:center;padding:6px 0;">${boardData.camp_name}</div>`,
              });
              infowindow.open(map, marker);

              // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
              map.setCenter(coords);
            }
          }
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardData.camp_address]);

  useEffect(() => {
    if (!camp_id) {
      navigate("/camp/board/all");
      alert("없는 페이지입니다.");
      return;
    }

    const userToken = localStorage.getItem("yourTokenKey");
    setUserToken(userToken);

    if (!userToken) {
      setIsCurrentUser(null);
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8080/camp/board/get/${camp_id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        const camp_images = response.data.camp_images.split(";");
        setBoardData({ ...response.data, camp_images });

        try {
          const base64Url = userToken.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const userTokenPayload = JSON.parse(atob(base64));

          console.log("User ID from token:", userTokenPayload?.user_id);
          console.log("User ID from response:", response.data.user_id);

          const currentUser =
            response.data.user_id === userTokenPayload?.user_id;
          console.log("Is current user:", currentUser);
          setIsCurrentUser(currentUser ? userTokenPayload?.user_id : null);

          setLoading(false);
        } catch (error) {
          console.error("Error decoding JWT token:", error);
        }
      })
      .catch((error) => {
        console.error("게시글 가져오기 실패:", error);
      });
  }, [camp_id, navigate]);

  useEffect(() => {
    setUserToken(localStorage.getItem("yourTokenKey"));
  }, [camp_id]);

  const handleUpdateClick = () => {
    navigate(`/camp/board/edit/${camp_id}`);
  };

  useEffect(() => {
    initializeMap();
  }, [initializeMap, boardData.camp_address]);

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "게시글이 삭제됩니다. 계속하시겠습니까?"
    );
  

    if (confirmDelete) {
      axios
        .delete(`http://localhost:8080/camp/board/delete/${camp_id}`)
        .then(() => {
          alert("삭제되었습니다.");
          navigate("/camp/board/all");
        })
        .catch((error) => {
          alert("게시글 삭제 실패: " + error.response.data.message);
        });
    } else {
      alert("취소 되었습니다.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  // 검색페이지에서 검색 조건 받기
  const searchInfo = { ...location.state };

  // 예약페이지 이동
  const reserveMove = ({}) => {
    navigate("/camp/reserve", {
      state: {
        // 캠핑장 번호
        CAMP_ID: `${boardData.camp_id}`,
        // 캠핑유형
        CAMP_SELECT: `${searchInfo.CAMP_SELECT}`,
        // 선택인원 (성인)
        CAMP_ADULT: `${searchInfo.CAMP_ADULT}`,
        // 선택인원 (아이)
        CAMP_CHILD: `${searchInfo.CAMP_CHILD}`,
        // 체크인 시간
        CAMP_CHECKIN: `${searchInfo.CAMP_CHECKIN}`,
        // 체크아웃 시간
        CAMP_CHECKOUT: `${searchInfo.CAMP_CHECKOUT}`,
      },
    });
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage === boardData.camp_images.length - 1 ? 0 : prevPage + 1
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) =>
      prevPage === 0 ? boardData.camp_images.length - 1 : prevPage - 1
    );
  };

  return (
    <section>
      <CampNavbar />
      <Container fluid className="home-section" id="home">
        <Container className="home-content"></Container>
      </Container>
      <h1>Camp Board - Camp Details</h1>
      <table>
        <thead>
          <tr>
            <th>게시글 번호</th>
            <th>유저 번호</th>
            <th>카테고리</th>
            <th>캠핑장 위치</th>
            <th>캠핑장 주소</th>
            <th>캠핑장 이름</th>
            <th>전화번호</th>
            <th>성인 인원</th>
            <th>아동 인원</th>
            <th>1박 가격</th>
            <th>부대 시설</th>
            <th>상세설명</th>
            {isCurrentUser && <th>수정</th>}
            {isCurrentUser && <th>삭제</th>}
            <th>찜하기</th>
            <th>예약하기</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{boardData.camp_id}</td>
            <td>{boardData.user_id}</td>
            <td>{boardData.camp_select}</td>
            <td>{boardData.camp_location}</td>
            <td>{boardData.camp_address}</td>
            <td>{boardData.camp_name}</td>
            <td>{boardData.camp_phone}</td>
            <td>{boardData.camp_adult}</td>
            <td>{boardData.camp_child}</td>
            <td>{boardData.camp_price}</td>
            <td>{boardData.camp_facility}</td>
            <td>{boardData.camp_description}</td>
            {isCurrentUser && (
              <td>
                <div className="my-5 d-flex justify-content-center">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={handleUpdateClick}
                  >
                    <i className="fas fa-pen"></i> 수정하기
                  </button>
                </div>
              </td>
            )}
            {isCurrentUser && (
              <td>
                <button onClick={handleDelete}>삭제</button>
              </td>
            )}
            <td>
              <div className="like" onClick={handleHeart}>
                {like ? (
                  <AiFillHeart style={{ color: "#FEA92A", fontSize: "30px" }} />
                ) : (
                  <AiOutlineHeart style={{ fontSize: "30px" }} />
                )}
              </div>
            </td>
            <td><Button variant="primary"  onClick={reserveMove}className="mt-3">
            예약하기
      </Button></td>
          </tr>
        </tbody>
      </table>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
  <Button onClick={handlePrevPage}>이전</Button>
  {boardData.camp_images && boardData.camp_images.length > 0 && boardData.camp_images[currentPage] ? (
    <img
      style={{ width: "500px", height: "400px", objectFit: "cover" }}
      src={boardData.camp_images[currentPage]}
      alt={`상품 이미지 ${currentPage + 1}`}
      onError={(e) => {
        e.target.onerror = null;
      }}
    />
  ) : (
    <p>이미지가 없습니다.</p>
  )}
  <Button onClick={handleNextPage}>다음</Button>

</div>
      <h1>지도</h1>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>

      <Reply />
    </section>
  );
}

export default CampBoardDetail;
