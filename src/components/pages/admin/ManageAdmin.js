import React, { useState, useEffect } from "react";
import { Switch, Select, Tag, Modal, Empty } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import MenubarAdmin from "../../layouts/MenubarAdmin";
import { useSelector } from "react-redux";
import moment from "moment/min/moment-with-locales";
// functions
import {
  listUser,
  changeStatus,
  changeRole,
  removeUser,
  resetPassword,
  searchUser
} from "../../functions/users";

const ManageAdmin = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [values, setValues] = useState({
    id: "",
    password: "",
  });
  const [userSearch, setUsersearch] = useState([])
  const [search, setSearch] = useState()

  const showModal = (id) => {
    setIsModalVisible(true);
    setValues({ ...values, id: id });
  };
  const handleChangePassword = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleOk = () => {
    setIsModalVisible(false);
    resetPassword(user.token, values.id, values)
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

  console.log("data", data);
  useEffect(() => {
    //code
    loadData(user.token);
  }, []);

  const loadData = (authtoken) => {
    //code
    listUser(authtoken)
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

  const handleChangeSearch = (e) => {
    console.log('handleChangeSearch=', e.target.value);
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // console.log('userSearch=',userSearch);
    searchUser(search)
      .then((res) => {
        console.log('searchUser res.data=', res.data);
        setUsersearch(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const refreshHandleSearch = (e) => {
    // e.preventDefault();
    // console.log('userSearch=',userSearch);
    searchUser(search)
      .then((res) => {
        console.log('searchUser res.data=', res.data);
        setUsersearch(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  console.log('userSearch==', userSearch);

  const handleOnchange = (e, id) => {
    const value = {
      id: id,
      enabled: e,
    };
    console.log('handleOnchange', value);
    changeStatus(user.token, id, value)
      .then((res) => {
        console.log('changeStatus', res);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleChangeRole = (e, id) => {
    let values = {
      id: id,
      role: e,
    };
    changeRole(user.token, id, values)
      .then((res) => {
        console.log(res);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const handleRemove = (id) => {
    if (window.confirm("Are You Sure Delete!!")) {
      removeUser(user.token, id)
        .then((res) => {
          console.log(res);
          loadData(user.token);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  const roleData = ["admin", "user"];
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-1">
          <MenubarAdmin />
        </div>
        <div className="col">
          <div className="form-group row ps-5 bg-primary">
            <div className="col">
              <h1 className="text-white p-2">ManageAdmin Page</h1>
            </div>
            <form className="col form-inline my-2 my-lg-0">
              <div className="row">
                <div className="col">
                  <input className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={handleChangeSearch}
                  />
                </div>
                <div className="col-md-2">
                  <button className="btn btn-light btn-outline-success my-2 my-sm-0"
                    type="submit"
                    onClick={handleSearch}
                  >Search</button>
                </div>
              </div>
            </form>
          </div>
          {
            userSearch != '' ?
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">username</th>
                    <th scope="col">firstname</th>
                    <th scope="col">lastname</th>
                    <th scope="col">role</th>
                    <th scope="col">status</th>
                    <th scope="col">created</th>
                    <th scope="col">updated</th>
                    <th scope="col">actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    <tr>
                      <th scope="row">{userSearch.username}</th>
                      <th scope="row">{userSearch.firstname}</th>
                      <th scope="row">{userSearch.lastname}</th>
                      <td>
                        <Select
                          style={{ width: "100%" }}
                          value={userSearch.role}
                          onChange={(e) => {
                            handleChangeRole(e, userSearch._id)
                            refreshHandleSearch(userSearch.username)
                          }}
                        >
                          {roleData.map((item, index) => (
                            <Select.Option value={item} key={index}>
                              {item == "admin" ? (
                                <Tag color="green">{item}</Tag>
                              ) : (
                                <Tag color="red">{item}</Tag>
                              )}
                            </Select.Option>
                          ))}
                        </Select>
                      </td>
                      <td>
                        <Switch
                          checked={userSearch.enabled}
                          onChange={(e) => {
                            handleOnchange(e, userSearch._id)
                            refreshHandleSearch(userSearch.username)
                          }}
                        />
                      </td>
                      <td>{moment(userSearch.createdAt).locale("th").format("ll")}</td>
                      <td>
                        {moment(userSearch.updatedAt)
                          .locale("th")
                          .startOf(userSearch.updatedAt)
                          .fromNow()}
                      </td>
                      <td>
                        <DeleteOutlined onClick={() => {
                          handleRemove(userSearch._id)
                          refreshHandleSearch(userSearch.username)
                        }} />
                        <EditOutlined onClick={() => {
                          showModal(userSearch._id)
                          refreshHandleSearch(search)
                        }} />
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
              : null
          }
          <table class="table">
            <thead>
              <tr>
                <th scope="col">username</th>
                <th scope="col">name</th>
                <th scope="col">lastname</th>
                <th scope="col">role</th>
                <th scope="col">status</th>
                <th scope="col">created</th>
                <th scope="col">updated</th>
                <th scope="col">actions</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{item.username}</th>
                    <th scope="row">{item.firstname}</th>
                    <th scope="row">{item.lastname}</th>
                    <td>
                      <Select
                        style={{ width: "100%" }}
                        value={item.role}
                        onChange={(e) => handleChangeRole(e, item._id)}
                      >
                        {roleData.map((item, index) => (
                          <Select.Option value={item} key={index}>
                            {item == "admin" ? (
                              <Tag color="green">{item}</Tag>
                            ) : (
                              <Tag color="red">{item}</Tag>
                            )}
                          </Select.Option>
                        ))}
                      </Select>
                    </td>
                    <td>
                      <Switch
                        checked={item.enabled}
                        onChange={(e) => handleOnchange(e, item._id)}
                      />
                    </td>
                    <td>{moment(item.createdAt).locale("th").format("ll")}</td>
                    <td>
                      {moment(item.updatedAt)
                        .locale("th")
                        .startOf(item.updatedAt)
                        .fromNow()}
                    </td>
                    <td>
                      <DeleteOutlined onClick={() => handleRemove(item._id)} />
                      <EditOutlined onClick={() => showModal(item._id)} />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <Modal
            title="Basic Modal"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>New Password :</p>
            <input
              onChange={handleChangePassword}
              type="text"
              name="password"
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ManageAdmin;
