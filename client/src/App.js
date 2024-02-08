import React, { useState, useEffect, Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

import Register from "./Component/pages/common/Register";
import GeneralRegister from "./Component/pages/common/GeneralRegister";
import ManagerRegister from "./Component/pages/common/ManagerRegister";
import GeneralEmailRegister from "./Component/pages/common/GeneralEmailRegister";
import ManagerEmailRegister from "./Component/pages/common/ManagerEmailRegister";
import Login from "./Component/pages/common/Login";
import Preloader from "./Pre";
import Navbar from "./Component/pages/camp/CampNavbar";
import CampSearch from "./Component/pages/camp/CampSearch/CampSearch";
import Home from "./Component/pages/camp/CampMain/Home/Home";
import About from "./Component/pages/camp/CampMain/About/About";
import Reservations from "./Component/pages/camp/CampMain/Reservations/Reservations";
import Inquiry from "./Component/pages/camp/CampMain/Inquiry/Inquiry";
import ScrollToTop from "./Component/pages/camp/CampScrollToTop";
import "./Component/pages/camp/CampStyle.css";
import "./CampApp.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Component/pages/camp/CampFooter";
import MyPage from "./Component/pages/common/MyPage";
import EditUser from "./Component/pages/common/EditUser";
import campMainImg from "./Component/img/MainImg/메인페이지 이미지2.jpeg";
import CampBoard from "./Component/pages/camp/CampBoard/CampBoard";
import CampBoardAll from "./Component/pages/camp/CampBoard/CampBoardAll";
import CampBoardDetail from "./Component/pages/camp/CampBoard/CampBoardDetail";
import CampBoardUpdate from "./Component/pages/camp/CampBoard/CampBoardUpdate";
import CampReserve from "./Component/pages/camp/CampReserve/CampReserve";
import CampBoardTent from "./Component/pages/camp/CampBoard/CampBoardTent";
import CampBoardCaravan from "./Component/pages/camp/CampBoard/CampBoardCaravan";
import CampBoardGlamping from "./Component/pages/camp/CampBoard/CampBoardGlamping";
import CampBoardPension from "./Component/pages/camp/CampBoard/CampBoardPension";
import CampBoardSite from "./Component/pages/camp/CampBoard/CampBoardSite";
import MyShopping from "./Component/pages/common/MyShopping";
import MyCamping from "./Component/pages/common/MyCamping";
import "./Component/pages/camp/CampStyle.css";
import "./CampApp.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <div className='container text-center mt-5'>
              <h1 className='display-4'>
                안녕하세요. 캠플리에 오신걸 환영합니다.
              </h1>
              <p className='lead'>캠핑 예약 또는 쇼핑 몰로 이동하세요.</p>
              <div className='d-flex justify-content-center'>
                <Link to='/camp' className='btn btn-primary m-2'>
                  <img
                    src={campMainImg}
                    alt='Camping Image'
                    className='img-thumbnail'
                    style={{ width: "200px", height: "200px" }}
                  />
                  <p>캠핑 예약</p>
                </Link>
              </div>
            </div>
          }
        />


        <Route
          path='/camp/*'
          element={
            <>
              <Preloader load={load} />
              <div className='App' id={load ? "no-scroll" : "scroll"}>
                <Navbar />
                <ScrollToTop />
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/reservation' element={<Reservations />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/inquiry' element={<Inquiry />} />
                </Routes>
              </div>
            </>
          }
        />
        <Route path='/register' element={<Register />} />
        <Route path='/register/general' element={<GeneralRegister />} />
        <Route path='/register/manager' element={<ManagerRegister />} />
        <Route
          path='/register/general/email'
          element={<GeneralEmailRegister />}
        />
        <Route
          path='/register/manager/email'
          element={<ManagerEmailRegister />}
        />

        <Route path='/login' element={<Login />} />
        <Route path='/camp/board/add' element={<CampBoard />} />
        <Route path='/camp/board/all' element={<CampBoardAll />} />
        <Route path='/camp/board/get/:camp_id' element={<CampBoardDetail />} />
        <Route path='/camp/board/edit/:camp_id' element={<CampBoardUpdate />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/myshopping' element={<MyShopping />} />
        <Route path='/mycamping' element={<MyCamping />} />
        <Route path='/mypage/edit' element={<EditUser />} />
        <Route path='/camp/searchList' element={<CampSearch />} />
        <Route path='/camp/reserve' element={<CampReserve />} />

        <Route path='/camp/board/caravan' element={<CampBoardCaravan />} />
        <Route path='/camp/board/tent' element={<CampBoardTent />} />
        <Route path='/camp/board/glamping' element={<CampBoardGlamping />} />
        <Route path='/camp/board/site' element={<CampBoardSite />} />
        <Route path='/camp/board/pension' element={<CampBoardPension />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
