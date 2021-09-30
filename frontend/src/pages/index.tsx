import styles from '@/styles/Home.module.css';
import { UserAddOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {
  Form,
  Button,
  Modal,
  PageHeader,
  Table,
  message,
} from 'antd';
import { useState } from 'react';

import { ModalAddDeveloper } from '@/components/ModalAddDeveloper';
import { columns } from '../components/TableColumns';

const { confirm } = Modal;

export type User = {
  id: number;
  nome: string;
  sexo: string;
  idade: number;
  hobby: string;
  datanascimento: any;
};

export function showDeleteConfirm(user: User) {
  confirm({
    title: `Tem certeza que deseja deletar o usuário?`,
    icon: <ExclamationCircleOutlined />,
    content: `Usuário: ${user.nome}`,
    okText: 'Sim',
    okType: 'danger',
    cancelText: 'Não',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

const data = [
  {
    id: 4,
    nome: 'Itamar Luiz',
    sexo: 'Masculino',
    idade: 49,
    hobby: 'Programar diariamente para obter cada vez mais conhecimento.',
    datanascimento: '1973-08-23T03:00:00.000Z',
  },
  {
    id: 3,
    nome: 'Marcia Regina Batista Alves',
    sexo: 'Feminino',
    idade: 47,
    hobby: 'Programar diariamente para obter cada vez mais conhecimento.',
    datanascimento: '1975-06-21T03:00:00.000Z',
  },
  {
    id: 2,
    nome: 'Paola Tavares de Oliveira',
    sexo: 'Feminino',
    idade: 25,
    hobby: 'Programar diariamente para obter cada vez mais conhecimento.',
    datanascimento: '1996-06-30T03:00:00.000Z',
  },
  {
    id: 1,
    nome: 'Daniel Alves',
    sexo: 'Masculino',
    idade: 25,
    hobby: 'Programar diariamente para obter cada vez mais conhecimento.',
    datanascimento: '1996-01-05T02:00:00.000Z',
  },
];

export default function Home() {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
    closeModal();
    successMessage();
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const successMessage = () => {
    message.success('Desenvolvedor adicionado com sucesso!');
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
        </div>
        <div>
          <Table columns={columns} dataSource={data} rowKey="id" />
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
