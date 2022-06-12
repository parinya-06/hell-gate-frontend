import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MenubarAdmin from "../../layouts/MenubarAdmin";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Switch, Select, Tag, Modal, Empty } from "antd";
import { listBook, removeBook, updateBook } from "../../functions/book";


const Home = () => {

  const { user } = useSelector((state) => ({ ...state }));
  const [data, setData] = useState([]);

  useEffect(() => {
    //code
    console.log('user.token=', user.token);
    loadData(user.token);
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

  const handleRemove = (id) => {
    if (window.confirm("Are You Sure Delete!!")) {
      removeBook(id)
        .then((res) => {
          console.log(res);
          loadData(user.token);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [values, setValues] = useState({
    id: "",
    title: "",
    review: "",
    price: "",
    urlimg: "",
  });
  const showModal = (data) => {
    console.log('showModal=', data);
    console.log('showModal=', data._id);
    setIsModalVisible(true);
    setValues({
      ...values,
      id: data._id,
      title: data.title,
      review: data.review,
      price: data.price,
      urlimg: data.urlimg,
    });
  };
  const handleEditBook = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      [e.target.name]: e.target.value,
      [e.target.name]: e.target.value,
      [e.target.name]: e.target.value,
    });
  };

  const handleOk = () => {
    setIsModalVisible(false);
    updateBook(values.id, values)
      .then(res => {
        console.log(res)
        loadData(user.token);
      }).catch(err => {
        console.log(err.response)
      })

  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  console.log('data=', data);

  return (
    <div className="container-fluid">
      <div className="row">

        <div className="col-md-1">
          <MenubarAdmin />
        </div>

        <div className="col">
          <div className="ps-5 bg-primary">
            <h1 className="text-white p-2">Home ADMIN</h1>
          </div>
          <div class="row">
            <div class="col-lg-3 col-6">
              <div class="small-box bg-warning">
                <div class="inner">
                  <h3>44</h3>
                  <p>รายงานสมาชิกใหม่</p>
                </div>
                <div class="icon">
                  <i class="ion ion-person-add"></i>
                </div>
                <a href="#" class="small-box-footer">More info</a>
              </div>
            </div>
            <div class="col-lg-3 col-6">
              <div class="small-box bg-info">
                <div class="inner">
                  <h3>150</h3>
                  <p>ประวัติการซื้อหนังสือ</p>
                </div>
                <div class="icon">
                  <i class="ion ion-bag"></i>
                </div>
                <a href="#" class="small-box-footer">More info</a>
              </div>
            </div>
            <div class="col-lg-3 col-6">
              <div class="small-box bg-success">
                <div class="inner">
                  <h3>53</h3>
                  <p>รายงานการขายหนังสือ</p>
                </div>
                <div class="icon">
                  <i class="ion ion-stats-bars"></i>
                </div>
                <a href="#" class="small-box-footer">More info</a>
              </div>
            </div>


          </div>
          <div className="ps-5 bg-primary">
            <h1 className="text-white p-2">เพิ่ม/ลบ/แก้ไขข้อมูลหนังสือ</h1>
          </div>
          <a type="button" href="/admin/addbook" class="btn btn-success m-2">เพิ่มหนังสือ</a>
          <div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">book Title</th>
                  <th scope="col">book Review</th>
                  <th scope="col">price</th>
                  <th scope="col">actions</th>
                  <th scope="col">image</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((data, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{data.title}</td>
                        <td>{data.review}</td>
                        <td>{data.price}</td>
                        <td>
                          <DeleteOutlined
                            onClick={() => handleRemove(data._id)}
                          />
                          <EditOutlined
                            onClick={() => showModal(data)}
                          />
                        </td>
                        <td>{data.urlimg}</td>
                      </tr>
                    )
                  })
                }
                {/* <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                  <td>
                    <DeleteOutlined
                    // onClick={() => handleRemove()} 
                    />
                    <EditOutlined
                    // onClick={() => showModal()} 
                    />
                  </td>
                </tr> */}
              </tbody>
            </table>
            <Modal
              title="Basic Modal"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>New title :</p>
              <input
                onChange={handleEditBook}
                type="text"
                name="title"
                value={values.title}
              />
              <p>New review :</p>
              <input
                onChange={handleEditBook}
                type="text"
                name="review"
                value={values.review}
              />
              <p>New price :</p>
              <input
                onChange={handleEditBook}
                type="number"
                name="price"
                value={values.price}
              />
              <p>New link image :</p>
              <input
                onChange={handleEditBook}
                type="text"
                name="urlimg"
                value={values.urlimg}
              />
            </Modal>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
