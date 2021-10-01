import {
  Button,
  DatePicker,
  Form,
  Input,
  PageHeader,
  Select,
  message,
} from 'antd';
import locale from 'antd/lib/date-picker/locale/pt_BR';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { gazinApi } from 'services/api';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;

const dateFormat = 'DD/MM/YYYY';

export type User = {
  id: string;
  nome: string;
  sexo: string;
  idade: number;
  hobby: string | null;
  datanascimento: any;
};

export default function EditDeveloper() {
  const router = useRouter();
  const { id } = router.query;
  const [developerData, setDeveloperData] = useState<any>();

  useEffect(() => {
    getDeveloperdataData();
  }, []);

  function getDeveloperdataData() {
    if (!id) return;
    gazinApi
      .get(`/developers/${id}`)
      .then((response) => {
        console.log(response.data);
        setDeveloperData(response.data);
      })
      .catch((response) => {
        console.error('resposta de erro:', response);
      });
  }

  function putDeveloperdataData(values: User) {
    if (!id) return;
    const years = moment().diff(Date.parse(values.datanascimento), 'years');
    const newData = { ...values, idade: years };
    gazinApi
      .put(`/developers/${id}`, newData)
      .then((response) => {
        successMessage('Desenvolvedor atualizado com sucesso!');
        router.push('/');
      })
      .catch((response) => {
        console.error('resposta de erro:', response);
      });
  }

  const successMessage = (info: string) => {
    message.success(info);
  };

  const [form] = Form.useForm();

  const onFinish = (values: User) => {
    console.log('Success:', values);
    putDeveloperdataData(values);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <header style={{ width: '100%', borderBottom: '1px solid #a9a9a9' }}>
        <PageHeader
          className="site-page-header"
          title="- GAZIN DEVELOPERS CRUD - DANIEL LUIZ ALVES"
          avatar={{
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpwgyLv-Uc5VgnLPL0ptcpwvR6Y-B8LjVIPA&usqp=CAU',
          }}
        />
      </header>
      {developerData && (
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 20,
              marginTop: 60,
            }}
          >
            <h1>Editar desenvolvedor</h1>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 20,
              marginTop: 30,
              width: 500,
              margin: 'auto',
            }}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              style={{ width: '100% !important' }}
            >
              <Form.Item
                label="Nome"
                name="nome"
                initialValue={developerData.nome}
                rules={[
                  {
                    required: true,
                    message: 'Nome obrigatório!',
                  },
                ]}
              >
                <Input placeholder="Digite o nome do desenvolvedor" />
              </Form.Item>
              <Form.Item
                label="Sexo"
                name="sexo"
                initialValue={developerData.sexo}
                rules={[
                  {
                    required: true,
                    message: 'Sexo obrigatório!',
                  },
                ]}
              >
                <Select>
                  <Option value="Masculino">Masculino</Option>
                  <Option value="Feminino">Feminino</Option>
                  <Option value="Outro">Outro</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Data de nascimento"
                name="datanascimento"
                rules={[
                  {
                    required: true,
                    message: 'Data de nascimento obrigatória!',
                  },
                ]}
              >
                <DatePicker
                  format={dateFormat}
                  style={{
                    width: '100%',
                  }}
                  placeholder="Selecione ou digite a data"
                  locale={locale}
                />
              </Form.Item>
              <Form.Item label="Hobby" name="hobby">
                <TextArea
                  rows={4}
                  showCount
                  maxLength={255}
                  defaultValue={developerData.hobby}
                />
              </Form.Item>
              <Form.Item>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 20,
                  }}
                >
                  <Link href="/">
                    <a> Voltar</a>
                  </Link>
                  <Button type="primary" htmlType="submit">
                    Atualizar
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}
