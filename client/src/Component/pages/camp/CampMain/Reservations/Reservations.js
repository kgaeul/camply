import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReservationCard from './ReservationCards';
//import Particle from '../Particle';
import backpacking from '../../../../Assets/Reservations/backpacking.png';
import motorhome from '../../../../Assets/Reservations/motorhome.png';
import tent from '../../../../Assets/Reservations/tent.png';
import glamping from '../../../../Assets/Reservations/glamping.png';
import rooftop from '../../../../Assets/Reservations/rooftop.png';
import caravan from '../../../../Assets/Reservations/caravan.png';

function Reservations() {
  return (
    <Container fluid className="project-section">
      <Container>
        <h1 className="project-heading">
          캠핑은 <strong className="purple">캠플리</strong> 예약하자
        </h1>
        <p style={{ color: 'black' }}>캠플리와 캠핑을 즐겨보세요.</p>
        <Row style={{ justifyContent: 'center', paddingBottom: '10px' }}>
          <Col md={4} className="project-card">
            <ReservationCard
              imgPath={glamping}
              isBlog={false}
              title="Glamping"
              description="글램핑은 '글래머러스 캠핑'의 합성어로, 자연 속에서도 편안한 숙박을 즐길 수 있는 스타일리시한 캠핑 형태입니다. 특히 고급 텐트, 캠핑카, 혹은 독특한 숙박 시설을 활용하여 자연과의 조화를 즐기는 경험을 제공합니다."
              introduceLink="#"
              reservationsLink="#"
            />
          </Col>

          <Col md={4} className="project-card">
            <ReservationCard
              imgPath={caravan}
              isBlog={false}
              title="Caravan Camping"
              description="카라반 캠핑은 이동형 주택인 카라반(휴대용 트레일러)을 이용하여 캠핑하는 형태입니다. 이동이 용이하며 필요한 시기에 자신만의 캠핑 장소를 찾아갈 수 있어 자유로운 여행이 가능합니다."
              introduceLink="#"
              reservationsLink="#"
            />
          </Col>

          <Col md={4} className="project-card">
            <ReservationCard
              imgPath={tent}
              isBlog={false}
              title="Tent Camping"
              description="텐트 캠핑은 전통적이고 가장 기본적인 캠핑 형태로, 텐트를 설치하여 자연 속에서 숙박하는 것입니다. 간이 캠핑장이나 자연 속에서 멋진 야경을 감상하며 휴식을 취할 수 있습니다."
              introduceLink="#"
              reservationsLink="#"
            />
          </Col>

          <Col md={4} className="project-card">
            <ReservationCard
              imgPath={backpacking}
              isBlog={false}
              title="Backpacking"
              description="백패킹은 가벼운 캠핑 장비를 가지고 여행하는 형태로, 주로 등산로나 자연 경로를 따라 걷는 여행을 의미합니다. 자연 속에서 더 가벼운 독립적인 경험을 즐길 수 있습니다."
              introduceLink="#"
              reservationsLink="#"
            />
          </Col>

          <Col md={4} className="project-card">
            <ReservationCard
              imgPath={rooftop}
              isBlog={false}
              title="Rooftop Tent Camping"
              description="루프탑 텐트 캠핑은 차량의 지붕에 텐트를 설치하여 캠핑하는 형태입니다. 텐트를 차량 위에 펼치면 빠르게 숙소를 마련할 수 있어 여행 중에 편리하게 이용할 수 있습니다."
              introduceLink="#"
              reservationsLink="#"
            />
          </Col>

          <Col md={4} className="project-card">
            <ReservationCard
              imgPath={motorhome}
              isBlog={false}
              title="Motorhome Camping"
              description="모터홈은 주택과 차량이 결합된 이동형 숙소로, 주행 중에도 편안한 숙박을 즐길 수 있는 캠핑 스타일입니다. 주행 중에도 휴식과 요리, 화장실 이용이 가능합니다."
              introduceLink="#"
              reservationsLink="#"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Reservations;
