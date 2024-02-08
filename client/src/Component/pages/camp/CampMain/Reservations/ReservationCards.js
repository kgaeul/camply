import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { CgWebsite } from 'react-icons/cg';
import { TfiFullscreen } from 'react-icons/tfi';

function ReservationsCards(props) {
  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={props.imgPath} alt="card-img" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text style={{ textAlign: 'justify' }}>
          {props.description}
        </Card.Text>
        <Button variant="warning" href={props.ghLink} target="_blank">
          <TfiFullscreen /> &nbsp;
          {props.isBlog ? 'Blog' : '둘러보기'}
        </Button>
        {'\n'}
        {'\n'}

        {!props.isBlog && props.reservationsLink && (
          <Button
            variant="warning"
            href={props.reservationsLink}
            target="_blank"
            style={{ marginLeft: '10px' }}
          >
            <CgWebsite /> &nbsp;
            {'예약하기'}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default ReservationsCards;
