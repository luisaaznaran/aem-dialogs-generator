import React, { useState }from 'react';
import './App.css';
import { Row, Col, Button, Modal, Input, Checkbox, Form, Tooltip } from 'antd';
import { FontSizeOutlined, CheckSquareOutlined, SelectOutlined, ScanOutlined, CloudUploadOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const App = () => {
  const [ showModal, setShowModal ] = useState(false)
  const [ nameComponent, setNameComponent ] = useState(null)
  const openModal = (component) => {
    setNameComponent(component)
    setShowModal(true)
  }
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 0 },
    },
  };
  const components =  [
    {
      component: 'Textfield',
      icon: <FontSizeOutlined />,
      itemDynamic: false
    },
    {
      component: 'Checkbox',
      icon: <CheckSquareOutlined />,
      itemDynamic: false
    },
    {
      component: 'Multifield',
      icon: <ScanOutlined />,
      itemDynamic: false
    },
    {
      component: 'Select ',
      icon: <SelectOutlined />,
      itemDynamic: true
    },
    {
      component: 'Fileupload',
      icon: <CloudUploadOutlined />,
      itemDynamic: false
    },
  ]

  return (
          <div>
            <Row style={{minHeight: '100vh'}}>
              <Col className="gutter-row-left" span={6}>
          {components.map((item, index) => {
             return (
              <>
                <Button className="btn-component" type="primary" shape="round" icon={item.icon} size="large" onClick={() => openModal(item.component)}>
                {item.component}
                </Button>
                <Modal
                  title={item.component}
                  visible={nameComponent === item.component ? showModal : false}
                  onOk={() => setShowModal(false)}
                  onCancel={() => setShowModal(false)}>
                  <Input
                    placeholder="Nombre del campo"
                  />
                  <div className="chk-required">
                    <Checkbox/> 
                    <p className="chk-required-item">Requerido</p>
                  </div>
                  <Input
                    placeholder="Label"
                  />
                  <Input
                    placeholder="Descripcion del campo"
                  />
                  {item.itemDynamic ?
                    <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel}>
                      <Form.List name="names">
                      {(fields, { add, remove }) => {
                          return (
                          <div>
                              {fields.map((field, index) => (
                              <Form.Item
                                  {...(formItemLayoutWithOutLabel)}
                                  required={false}
                                  key={field.key}
                              >
                                  <Form.Item
                                  {...field}
                                  validateTrigger={['onChange', 'onBlur']}
                                  rules={[
                                      {
                                      required: true,
                                      whitespace: true,
                                      message: "Please input passenger's name or delete this field.",
                                      },
                                  ]}
                                  noStyle
                                  >
                                  <Input placeholder="Nombre del campo" style={{ width: '60%' }} />
                                  </Form.Item>
                                  {fields.length >= 0 ? (
                                  <MinusCircleOutlined
                                      className="dynamic-delete-button"
                                      style={{ margin: '0 8px' }}
                                      onClick={() => {
                                      remove(field.name);
                                      }}
                                  />
                                  ) : null}
                              </Form.Item>
                              ))}
                              <Form.Item>
                              <Button
                                  type="dashed"
                                  shape="circle"
                                  onClick={() => {
                                      add();
                                  }}
                                  >
                                  <PlusOutlined />
                                  </Button>
                              </Form.Item>
                          </div>
                          );
                      }}
                      </Form.List>
                  </Form>
                  : null }
                </Modal>
              </>
             )
          })}
            </Col>
              <Col className="gutter-row-right" span={18}></Col>
            </Row>
        </div>
    
  );
}

export default App;
