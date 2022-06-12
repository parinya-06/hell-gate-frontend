import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Button } from 'react-bootstrap';
import { listBook } from "../functions/book";

const Home = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [authtoken,setAuthtoken] = useState(null)
    const [data, setData] = useState([]);

    useEffect(() => {
        //code
        loadData(authtoken);
    }, []);

    const loadData = (authtoken) => {
        //code
        listBook(authtoken)
            .then((res) => {
                //code
                console.log('loadData=', res.data);
                setData(res.data);
            })
            .catch((err) => {
                //err
                console.log(err.response.data);
            });
    };

    console.log('data=',data);
    return (
        <div>
            <h1 className="text-center">Home Page</h1>
            <div className="ps-5 w-25 bg-primary">
                <h1 className="text-white p-2">หมวดทั่วไป</h1>
            </div>
            <div className="container justify-content-center">
                <div className="row justify-content-start">
                    {
                        data.map((data,index) => {
                            return (
                                <Card key={index} style={{ width: '18rem', margin: 10 }}>
                                    <img width='100%' src={data.urlimg} />
                                    {/* <img width='100%' src={'https://images-se-ed.com/ws/Storage/Originals/978616/041/9786160415724L.jpg?h=282e2de99504b0526d0c452803d3cec5'} /> */}
                                    <Card.Body>
                                        <Card.Title>{data.title}</Card.Title>
                                        <Card.Text>{data.review}</Card.Text>
                                        <Card.Text>{data.price} บาท</Card.Text>
                                        <Button variant="primary" 
                                        onClick={() => alert('กรุณาลงชื่อเข้าใช้')}
                                        >ซื้อหนังสือ</Button>
                                    </Card.Body>
                                </Card>

                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
