import { Form, Input, Button, Modal, Select, DatePicker } from 'antd';

import locale from 'antd/lib/date-picker/locale/pt_BR';

const { Option } = Select;
const { TextArea } = Input;

const dateFormat = 'DD/MM/YYYY';

export function ModalAddDeveloper(props: any) {
  return (
    <div>
      <Modal
        title="Adicionar novo desenvolvedor"
        visible={props.isModalVisible}
        footer={null}
        onCancel={props.closeModal}
      >
        <Form
          form={props.form}
          layout="vertical"
          onFinish={props.onFinish}
          onFinishFailed={props.onFinishFailed}
        >
          <Form.Item
            label="Nome"
            name="nome"
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
              placeholder="Selecione a data"
              locale={locale}
            />
          </Form.Item>
          <Form.Item label="Hobby" name="hobby">
            <TextArea rows={4} showCount maxLength={255} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Adicionar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
