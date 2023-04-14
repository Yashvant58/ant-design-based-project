import { Button, Table, Modal, Input } from "antd";
import { useState} from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { WithContext as ReactTags } from 'react-tag-input';
import React from 'react';

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const date=new Date();
  const d=date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes();

  const [tags, setTags] = React.useState([
    { id: 'India', text: 'India' }
  ]);
  const ele=tags.map((o)=>{return o.id});
  const changeTag=(ele.map((e)=>e));
 
  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };
  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };
  // const opt = [
  //   {
  //     key:1,
  //     value: "OPEN",
  //   },
  //   {
  //     key:2,
  //     value: "WORKING",
  //   },
  //   {
  //     key: 3,
  //     value: "DONE",
  //   },
  //   {
  //     key: 4,
  //     value: "OVERDUE",
  //   },
  // ];
 
  const [dataSource, setDataSource] = useState([
    { 
      id: 1,
      key:0,
      timestamp:`${d}`,
      title: "Title 1",
      description: "Write somethings...",
      dueDate:`${d}`,
      tag:`${changeTag}`,
      status:"status"
    },
  ]);
  let key=dataSource.length;
  const handlbarStamp=()=>{}
  const handlbarDes=()=>{}
  const handlbarDue=()=>{}
const handlbarTitle=()=>{
}
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Timestamp",
      dataIndex: "timestamp",
    },
    {
      key: "3",
      title: "Title",
      dataIndex: "title",
    },
    {
      key: "4",
      title: "Description",
      dataIndex: "description",
    },
    {
      key: "5",
      title: "Due Date",
      dataIndex: "dueDate",
    },
    {
      key: "6",
      title: "Tag",
      dataIndex: "tag",
    },
    {
      key: "7",
      title: "Status",
      dataIndex: "status",
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined 
              onClick={() => {
                onEditStudent(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteStudent(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  let randomNumber =dataSource.length;
  const onAddStudent = () => {
    randomNumber++;
    key++;
    const newStudent = {
      id: randomNumber,
      key:key,
      timestamp:`${d}`,
      title: "Title " + randomNumber,
      description:"Write somethings...",
      dueDate: `${d}`,
      tag:`${changeTag}`,
     status:"status",
    }
    setDataSource((pre) => {
    return [...pre, newStudent];
    })

  
   };
  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((student) => student.id !== record.id);
        });
      },
    });
  };
  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };


  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={onAddStudent}>Add a new Student</Button>
        <Button onClick={handlbarStamp}>sort stamp</Button>
        <Button onClick={handlbarTitle}>sort title</Button>
        <Button onClick={handlbarDes}>sort des</Button>
        <Button onClick={handlbarDue}>sort due date</Button>
        <Table  columns={columns} dataSource={dataSource}></Table>
        <Modal
          title="Edit Student"
          open={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((student) => {
                if (student.id === editingStudent.id) {
                  return editingStudent;
                } else {
                  return student;
                }
              });
            });
            resetEditing();
          }}
        > 
          <Input
            value={editingStudent?.title}
            max="100"
            required
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, title: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.description}
            max="1000"
            required
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, description: e.target.value };
              });
            }}
          />
             <Input
            value={editingStudent?.dueDate}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, dueDate: e.target.value };
              });
            }}
          />
 
           <ReactTags
          tags={tags}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          inputFieldPosition="bottom"
          autocomplete
          />
     {/* <select>
     {opt.map((option) => (
       <option  value={option.key}>{option.value}</option>
     ))} 
   </select> */}

        </Modal>
      </header>
    </div>
  );
}

export default App;