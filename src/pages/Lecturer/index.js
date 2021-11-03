import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Space,
  Breadcrumb,
  Button,
  Card,
  Input,
  Select,
  Table,
  Tag,
  Modal,
  notification,
} from 'antd';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as lecturerActions from 'redux/actions/lecturers';
import { lectureState$ } from 'redux/selectors';
import styles from './index.module.less';

const { confirm } = Modal;

const mapToDataSource = array => {
  return array.map(item => {
    return {
      key: item.idLecturer,
      idLecturer: item.idLecturer,
      username: item.username === null ? 'null' : item.username,
      displayName: item.displayName,
      email: item.email,
      gender: item.gender === 0 ? 'Male' : item.gender === 1 ? 'Female' : 'Others',
      phoneNumber: item.phoneNumber,
      address: item.address,
      birthday: moment(item.dob).format('DD/MM/YYYY'),
      isActivated: item.isActivated,
    };
  });
};

const Lecturer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const lecturers = useSelector(lectureState$);
  const dataSource = mapToDataSource(lecturers.data);
  const columns = [
    // {
    //   title: 'ID',
    //   dataIndex: 'idLecturer',
    //   align: 'center',
    //   ellipsis: true,
    // },
    {
      title: 'Username',
      dataIndex: 'username',
      align: 'center',
      ellipsis: true,
    },
    {
      title: 'Full name',
      dataIndex: 'displayName',
      ellipsis: true,

      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
        return (
          <div style={{ padding: 8 }}>
            <Input
              autoFocus
              placeholder="Type text here"
              style={{ marginBottom: 8, display: 'block', fontSize: '14px' }}
              value={selectedKeys[0]}
              onChange={event => {
                setSelectedKeys(event.target.value ? [event.target.value] : []);
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            />

            <Space>
              <Button
                type="primary"
                style={{ width: 90, fontSize: '12px' }}
                onClick={() => {
                  confirm();
                }}
                icon={<SearchOutlined />}
                size="small">
                Search
              </Button>
              <Button
                style={{ width: 90, fontSize: '12px' }}
                onClick={() => {
                  clearFilters();
                }}
                size="small">
                Reset
              </Button>
            </Space>
          </div>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.displayName.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      ellipsis: true,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      align: 'center',
    },
    {
      title: 'Phone number',
      dataIndex: 'phoneNumber',
      ellipsis: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      ellipsis: true,
    },
    {
      title: 'Birthday',
      dataIndex: 'birthday',
      align: 'center',
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'isActivated',
      align: 'center',
      render: isActivated => (
        <span>
          {isActivated ? <Tag color="success">Working</Tag> : <Tag color="orange">Unemployed</Tag>}
        </span>
      ),
    },
    {
      title: '',
      dataIndex: 'idLecturer',
      align: 'center',
      render: idLecturer => (
        <div style={{ display: 'flex', justifyContent: 'center', columnGap: '20px' }}>
          <Button
            onClick={() => handleEditLecturer(idLecturer)}
            type="primary"
            ghost
            icon={<EditOutlined />}
          />
          <Button
            onClick={() => handleDeleteLecturer(idLecturer)}
            danger
            icon={<DeleteOutlined />}
          />
        </div>
      ),
    },
  ];

  React.useEffect(() => {
    dispatch(lecturerActions.getLecturers.getLecturersRequest());
  }, [dispatch]);

  const handleAddLecturerClick = () => {
    history.push('/lecturer/add');
  };
  const handleEditLecturer = idLecturer => {
    history.push(`/lecturer/edit/${idLecturer}`);
  };
  const handleDeleteLecturer = idLecturer => {
    confirm({
      title: 'Do you want to delete this employee?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        dispatch(lecturerActions.deleteLecturer.deleteLecturerRequest(idLecturer));

        lecturers.isSuccess
          ? notification['success']({
              message: 'Successfully',
              description: 'Delete employee success',
            })
          : notification['error']({
              message: 'Notification Title',
              description: 'That employee is activating',
            });
      },
      onCancel() {},
    });
  };

  console.log({ dataSource });

  return (
    <div>
      <Breadcrumb style={{ marginBottom: '20px' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Application Center</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Application List</a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="heading">Lecturer list</h3>
      <Card>
        <div className={styles.wrapper}>
          <Button
            onClick={handleAddLecturerClick}
            className={styles.btn}
            size="large"
            type="primary">
            Add lecturer
          </Button>
        </div>
        <Table
          loading={lecturers.isLoading}
          columns={columns}
          dataSource={dataSource}
          rowKey={row => row.idLecturer}
        />
      </Card>
    </div>
  );
};

export default Lecturer;
