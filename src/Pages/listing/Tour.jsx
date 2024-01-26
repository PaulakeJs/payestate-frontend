import { Form, Input, Modal, message } from "antd";
import React from "react";
import { TourHouse } from "../../apicalls/listings";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";

const Tour = ({ listing, setIsOpen, isOpen }) => {
  const dispatch = useDispatch();
  const formRef = React.useRef(null);
  const rules = [
    {
      required: true,
      message: "required",
    },
  ];
  const tour = async (values) => {
    values.to = listing?.seller.email;
    values.subject = listing?.title;
    values.location = listing?.location
    values.address = listing?.address
    try {
      dispatch(SetLoader(true));
      setIsOpen(false)
      const res = await TourHouse(values);
      dispatch(SetLoader(false));
      message.success(res.message);
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <div>
      <Modal
        title="Request Tour"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        centered
        okText="Tour Now"
        className="bg-stone-300"
        onOk={() => {
          formRef.current.submit();
        }}
      >
        <div className="rounded-3xl">
          <Form className="" layout="vertical" ref={formRef} onFinish={tour}>
            <Form.Item label={"Full Name"} name={"name"} rules={rules}>
              <Input />
            </Form.Item>
            <Form.Item label={"Email"} name={"email"} rules={rules}>
              <Input type="email" />
            </Form.Item>

            <Form.Item label={"Phone"} name={"phone"} rules={rules}>
              <Input type="number" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default Tour;
