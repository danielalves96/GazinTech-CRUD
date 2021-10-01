import { ModalAddDeveloper } from '@/components/ModalAddDeveloper';
import styles from '@/styles/Home.module.css';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Button, Form, message, Modal, PageHeader, Space, Table } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { gazinApi } from 'services/api';
import { uuid } from 'uuidv4';
import moment from 'moment';

const { confirm } = Modal;

export type User = {
  id: string;
  nome: string;
  sexo: string;
  idade: number;
  hobby: string | null;
  datanascimento: any;
};

export default function Home() {
  const [data, setData] = useState();

  useEffect(() => {
    getApiData();
  }, []);

  function getApiData() {
    gazinApi
      .get('/developers')
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((response) => {
        console.error('resposta de erro:', response);
      });
  }
  
  function createColumns(): (
    | {
        title: string;
        dataIndex: string;
        key: string;
        render: (text: string) => JSX.Element;
      }
    | { title: string; dataIndex: string; key: string; render?: undefined }
    | {
        title: string;
        key: string;
        render: (record: User) => JSX.Element;
        dataIndex?: undefined;
      }
  )[] {
    return [
      {
        title: 'Nome',
        dataIndex: 'nome',
        key: 'nome',
        render: (text: string) => <a>{text}</a>,
      },
      {
        title: 'Sexo',
        dataIndex: 'sexo',
        key: 'sexo',
      },
      {
        title: 'Idade',
        dataIndex: 'idade',
        key: 'idade',
      },
      {
        title: 'Hobby',
        dataIndex: 'hobby',
        key: 'hobby',
      },
      {
        title: 'Data de nascimento',
        dataIndex: 'datanascimento',
        key: 'datanascimento',
        render: (record: string) => (
          <Space size="middle">
            <span>{new Date(record).toLocaleDateString('pt-BR')}</span>
          </Space>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (record: User) => (
          <Space size="middle">
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                showDeleteConfirm(record);
              }}
            >
              Deletar
            </Button>

            <Link
              href={{
                pathname: '/edit-developer',
                query: { id: record.id },
              }}
            >
              <a> {<EditOutlined />} Editar</a>
            </Link>
          </Space>
        ),
      },
    ];
  }

  function showDeleteConfirm(user: User) {
    confirm({
      title: `Tem certeza que deseja deletar o usuário?`,
      icon: <ExclamationCircleOutlined />,
      content: `Usuário: ${user.nome}`,
      okText: 'Sim',
      okType: 'danger',
      cancelText: 'Não',
      onOk() {
        gazinApi
          .delete(`/developers/${user.id}`)
          .then((response) => {
            getApiData();
            successMessage('Desenvolvedor removido com sucesso!');
          })
          .catch((response) => {
            errorMessage('Erro ao remover desenvolvedor, tente novamente');
          });
      },
      onCancel() {},
    });
  }

  function addDeveloper(values: User) {
    const years = moment().diff(Date.parse(values.datanascimento), 'years');
    const newData = { ...values, id: uuid(), idade: years };
    console.log(newData);
    gazinApi
      .post(`/developers/`, newData)
      .then((response) => {
        console.log('resposta de acerto:', response.data);
        closeModal();
        successMessage('Desenvolvedor adicionado com sucesso!');
        form.resetFields();
        getApiData();
      })
      .catch((response) => {
        errorMessage('Erro ao adicionar desenvolvedor, tente novamente');
        console.error('resposta de erro:', response);
      });
  }

  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pagination, setPagination] = useState(true);

  const columns = createColumns();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
    addDeveloper(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const successMessage = (info: string) => {
    message.success(info);
  };

  const errorMessage = (info: string) => {
    message.error(info);
  };

  const changePagination = () => {
    setPagination(!pagination);
  };

  return (
    <div className={styles.container}>
      <header style={{ width: '100%', borderBottom: '1px solid #a9a9a9' }}>
        <PageHeader
          className="site-page-header"
          title="- GAZIN DEVELOPERS CRUD - DANIEL LUIZ ALVES"
          avatar={{
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpwgyLv-Uc5VgnLPL0ptcpwvR6Y-B8LjVIPA&usqp=CAU',
          }}
        />
      </header>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 60,
        }}
      >
        <h1>Listagem de desenvolvedores</h1>
      </div>

      <div className={styles.main}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: 20,
            width: '80%',
          }}
        >
          <Button type="primary" icon={<UserAddOutlined />} onClick={showModal}>
            Adicionar
          </Button>
          &nbsp;&nbsp;&nbsp;
          {pagination && (
            <Button type="primary" danger onClick={changePagination}>
              Mostrar sem paginação
            </Button>
          )}
          {!pagination && (
            <Button type="primary" onClick={changePagination}>
              Mostrar com paginação
            </Button>
          )}
        </div>
        <div>
          <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            // @ts-expect-error
            pagination={pagination}
          />
        </div>
      </div>
      <ModalAddDeveloper
        form={form}
        isModalVisible={isModalVisible}
        closeModal={closeModal}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      ></ModalAddDeveloper>
    </div>
  );
}
