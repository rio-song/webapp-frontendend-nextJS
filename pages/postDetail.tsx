import { Modal, Container, Row, Col, Button } from 'react-bootstrap'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { useState } from 'react';
import { postFavo, deleteFavo } from '../type/api';

export default function PostDetail(props) {

    const closePostDetailShow = () => props.setPostDetailShow(false);

    let json = props.postDetailResult.PostDetail;

    const hundleNoFavo = (id) => {
        let favo = [...props.favos]
        favo[props.tapFavosIndex] = false
        props.setFavo(favo)
        deleteFavo(id)
    }


    const hundlefavo = (id) => {
        let favo = [...props.favos]
        favo[props.tapFavosIndex] = true
        props.setFavo(favo)
        postFavo(id)
    }


    return (
        <Modal show={props.postDetailShow} onHide={closePostDetailShow} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    <Row>
                        <Col xs={12} md={8}>
                            <img src={json.imageUrl} />
                        </Col>
                        <Col xs={6} md={4}>
                            <h4>{json.title}</h4>
                            <p> {json.text}</p>
                            <p>{json.postedAt}</p>

                            {props.favos[props.tapFavosIndex] ? (
                                <Button onClick={() => hundleNoFavo(json.id)}><AiFillHeart /></Button>) : (
                                <Button onClick={() => hundlefavo(json.id)}><AiOutlineHeart /></Button>)}


                            {json.favosCount} 件
                            <p> <FaRegComment />{json.commentsCount} 件</p>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
}
