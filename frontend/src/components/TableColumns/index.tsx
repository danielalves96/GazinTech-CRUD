import {
  DeleteOutlined,
  EditOutlined
} from '@ant-design/icons';
import { Button, Space } from 'antd';
import { User, showDeleteConfirm } from '../../pages/index';

export const columns = [
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
        <Button type="primary" icon={<EditOutlined />} >
          Editar
        </Button>
      </Space>
    ),
  },
];
