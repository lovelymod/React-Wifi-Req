import "./table.css";
import { Table, Tag, Space, Input } from "antd";
import "antd/dist/antd";
import { motion } from "framer-motion";
import { useState } from "react";
import { SearchOutlined } from "@mui/icons-material";

const Blogslist = ({
  memberList,
  deleteMember,
  showUser,
  edituser,
  setExMemberList,
}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleChange = (pagination, _filters, _sorter, extra) => {
    console.log(extra.currentDataSource);
    setExMemberList(extra.currentDataSource);
  };

  const testedData = [
    {
      id: "1",
      Dates: "2020",
      Times: "12:00",
      Firstname: "gong",
      Lastname: "sabo",
      User_Type: "gong",
      Start_Date: "121",
      End_Date: "333",
    },
  ];
  //  todo fix width page on mobile phone
  const columns = [
    {
      width: "7.5%",
      title: "No",
      dataIndex: "id",
      key: "id",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.id - b.id,
    },
    {
      width: "10%",
      title: "Date",
      dataIndex: "Dates",
      key: "date",
      sorter: (a, b) => a.Dates.localeCompare(b.Dates),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input.Search
            enterButton
            allowClear
            autoFocus
            placeholder="Enter Date..."
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
            }}
            onSearch={() => {
              confirm();
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          ></Input.Search>
        );
      },
      onFilter: (value, record) => {
        return record.Dates.toLowerCase().includes(value.toLowerCase());
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
    },
    {
      width: "7.5%",
      title: "Time",
      dataIndex: "Times",
      key: "Times",
      sorter: (a, b) => a.Times.localeCompare(b.Times),
    },
    {
      width: "12%",
      title: "Firstname",
      dataIndex: "Firstname",
      key: "firstname",
      sorter: (a, b) => a.Firstname.localeCompare(b.Firstname),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input.Search
            enterButton
            allowClear
            autoFocus
            placeholder="Enter Firstname..."
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
            }}
            onSearch={() => {
              confirm();
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          ></Input.Search>
        );
      },
      onFilter: (value, record) => {
        return record.Firstname.toLowerCase().includes(value.toLowerCase());
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
    },
    {
      width: "12%",
      title: "Lastname",
      dataIndex: "Lastname",
      key: "Lastname",
      sorter: (a, b) => a.Lastname.localeCompare(b.Lastname),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input.Search
            enterButton
            allowClear
            autoFocus
            placeholder="Enter Lastname..."
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
            }}
            onSearch={() => {
              confirm();
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          ></Input.Search>
        );
      },
      onFilter: (value, record) => {
        return record.Lastname.toLowerCase().includes(value.toLowerCase());
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
    },
    {
      width: "11%",
      title: "UserType",
      dataIndex: "User_Type",
      key: "User_Type",
      sorter: (a, b) => a.User_Type.localeCompare(b.User_Type),
      filters: [
        {
          text: "Staff",
          value: "staff",
        },
        {
          text: "Internship",
          value: "internship",
        },
        {
          text: "Guest",
          value: "guest",
        },
      ],
      onFilter: (value, record) => {
        return record.User_Type === value;
      },
      render: (User_Type) => {
        let color = "";
        if (User_Type === "staff") color = "green";
        if (User_Type === "internship") color = "volcano";
        if (User_Type === "guest") color = "geekblue";
        return (
          <Tag color={color} key={User_Type}>
            {User_Type.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      width: "10%",
      title: "Start Date",
      dataIndex: "Start_Date",
      key: "Start_Date",
      sorter: (a, b) => a.Start_Date.localeCompare(b.Start_Date),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input.Search
            enterButton
            allowClear
            autoFocus
            placeholder="Enter Start Date..."
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
            }}
            onSearch={() => {
              confirm();
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          ></Input.Search>
        );
      },
      onFilter: (value, record) => {
        return record.Start_Date.toLowerCase().includes(value.toLowerCase());
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
    },
    {
      width: "10%",
      title: "End Date",
      dataIndex: "End_Date",
      key: "End_Date",
      sorter: (a, b) => a.End_Date.localeCompare(b.End_Date),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input.Search
            enterButton
            allowClear
            autoFocus
            placeholder="Enter End Date..."
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
            }}
            onSearch={() => {
              confirm();
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          ></Input.Search>
        );
      },
      onFilter: (value, record) => {
        return record.End_Date.toLowerCase().includes(value.toLowerCase());
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
    },
    {
      align: "center",
      width: "18%",
      title: "Action",
      dataIndex: "",
      key: "Action",
      render: (record) => (
        <Space size="small">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="btn edit-butt3"
            onClick={() => showUser(record.id)}
          >
            Show
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            className="btn edit-butt3"
            onClick={() => edituser(record.id)}
          >
            Edit
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="btn del-butt3"
            onClick={() => deleteMember(record.id)}
          >
            Delete
          </motion.button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Table
        dataSource={memberList}
        columns={columns}
        sticky={true}
        bordered
        pagination={{
          position: ["bottomCenter"],
          current: page,
          pageSize: pageSize,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
        onChange={handleChange}
      />
    </>
  );
};

export default Blogslist;
