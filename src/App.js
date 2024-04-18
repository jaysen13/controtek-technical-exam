import Button from "antd/lib/button";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Layout from "antd/lib/layout";
import InputNumber from "antd/lib/input-number";
import message from "antd/lib/message";
import Space from "antd/lib/space";
import Table from "antd/lib/table";
import Modal from "antd/lib/modal";
import Popconfirm from "antd/lib/popconfirm";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import Cookie from "js-cookie";

import userForm from './config/user-form';
// import { columns as tableColumns } from "./config/table-config";



const { Content } = Layout;

function App() {
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [records, setRecords] = useState({});

  const tableData = () => {
    return Object.entries(records).map(([key, value]) => ({
      key,
      id: key,
      ...value
    }));
  };

  const showAddForm = () => {
    setEdit(false);
    setShowModal(true);
  };

  const onEdit = (record) => {
    setEdit(true);
    setEditData(record);
    form.setFieldsValue(record);
    setShowModal(true);
  };

  const onDelete = (record) => {
    const currentRecords = records;
    delete currentRecords[record.id];
    setRecords({ ...currentRecords });
    Cookie.set('records', JSON.stringify(currentRecords));
  };

  function onFinish({ id, name, age, address }) {
    if (!isEdit) {
      if (records[id])
        return message.error("ID already exist!. Try other ID.", 3);
      else {
        setRecords(currentState => ({ ...currentState, [id]: { name, age, address } }));
        message.success("Success Adding Entry!");
      }
    } else {
      const currentRecords = records;
      if (id !== editData.id)
        if (records[id])
          return message.error("ID Already Exists. Try Other ID", 3);
        else
          delete currentRecords[editData.id];
      setRecords({ ...currentRecords, [id]: { name, age, address } });
      message.success("Success Updating Entry!");
    }
    setShowModal(false);
    form.resetFields();
  }

  const getInput = (type, input_number_fields) => {
    if (type === 'number')
      return <InputNumber {...input_number_fields} />;
    return <Input />;
  };

  useEffect(() => {
    let cookieRecords = Cookie.get('records');
    if (cookieRecords)
      setRecords(JSON.parse(cookieRecords));
  }, []);

  useEffect(() => {
    if (Object.entries(records).length)
      Cookie.set('records', JSON.stringify(records));
  }, [records]);

  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button type='primary' onClick={() => onEdit(record)}>Edit</Button>
          <Popconfirm
            title="Delete Entry!"
            description="Are you sure to delete this entry?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => onDelete(record)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div className="App">
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280
        }}
      >
        <Button type='primary' icon={<PlusOutlined />} onClick={() => showAddForm()} style={{ backgroundColor: "#52c41a", marginBottom: 20 }}>Add Entry</Button>
        <Table columns={tableColumns} dataSource={tableData()} />
      </Content>

      <Modal
        title="User"
        centered
        open={showModal}
        onCancel={() => setShowModal(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={(e) => onFinish(e)} layout='horizontal' labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} style={{ maxWidth: 600 }}>
          {
            userForm.map((input, index) => {
              return <Form.Item key={index} {...input}>
                {getInput(input.type, input.input_number_fields)}
              </Form.Item>;
            })
          }
        </Form>
      </Modal>
    </div>
  );
}

export default App;
