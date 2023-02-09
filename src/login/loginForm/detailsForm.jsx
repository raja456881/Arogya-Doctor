import axios from "axios";
import "react-phone-input-2/lib/style.css";
import logo from "../../assets/logo.png";
import { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input, Alert, message } from "antd";

const DetailsForm = (props) => {
  const [form] = Form.useForm();

  const [ifsc_code, setIfsc_code] = useState("");
  const [bankDetails, setBankDetails] = useState(null);

  // update if email changed
  useEffect(() => {
    console.log("bankdetails updated", bankDetails);

    if (bankDetails) {
      form.setFieldsValue({
        bank_name: bankDetails.data.BANK,
        branch: bankDetails.data.BRANCH,
      });
    }
  }, [bankDetails]);

  const onFinish = (values) => {
    setLoading(true);
    let dataForSend = {
      user_email: userEmail,
      user_pass: values.password,
      user_firstname: values.firstName,
      user_lastname: values.lastName,
      user_phone_code: state.prefix_1,
      user_phone_num: state.contactno,
    };

    axios({
      url: import.meta.env.VITE_REACT_API_URL + "/api/signup",
      method: "post",
      data: { ...dataForSend },
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.success === 1) {
          signIn({ email: userEmail, password: values.password });
          setLoading(false);
        } else {
          setSignupError(res.data.message);
          setLoading(false);
        }
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  useEffect(() => bankFetcher(ifsc_code), [ifsc_code]);

  const bankFetcher = (ifsc) => {
    axios({
      url: `https://ifsc.razorpay.com/` + `${ifsc_code}`,
      method: "get",
    })
      .then((res) => {
        if (res.status === 200) {
          setBankDetails(res);
          setLoading(false);
        } else {
          setSignupError(res.data.message);
          setLoading(false);
        }
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="detail-wraper">
      <div style={{marginBottom : '14px'}} className="img">
        <img src={logo} />{" "}
      </div>

      <p style={{ marginTop: "20px 40px" }}>Personal Details</p>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        onFinish={props.onFinish}
        autoComplete="off"
        className="details-form"
      >
        <input
          style={{width : '370px', height : '44px', border : "none", borderRadius : "4px" , fontSize : '18px', padding : '10px' , marginTop : '4px'}}
          disabled
          type="text"
          value={`${
            props.state.prefix_1.toString() + props.state.contactno.toString()
          }`}
        />

        <Form.Item
          label="Full Name"
          name="full_name"
          style={{marginTop : '14px'}}
          rules={[
            {
              required: true,
              message: "Please input your Full Name",
            },
          ]}
        >
          <Input placeholder="Enter your Full Name" />
        </Form.Item>

        <Form.Item
          label="Specialisation"
          name="specialisation"
          rules={[
            {
              required: true,
              message: "Please input your Specialisation",
            },
          ]}
        >
          <Input placeholder="please enter your specialization" />
        </Form.Item>
        <Form.Item
          label="Clinic Name"
          name="clinic_name"
          rules={[
            {
              required: true,
              message: "Please input your Clinic Name",
            },
          ]}
        >
          <Input placeholder="Please enter your Clinic Name" />
        </Form.Item>



        <Form.Item
          label="License Number"
          name="license_number"
          placeholder="specialization"
          rules={[
            {
              required: true,
              message: "Please input your License Number",
            },
          ]}
        >
          <Input placeholder="please enter your License Number" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your Email",
            },
          ]}
        >
          <Input placeholder="please enter your Email" />
        </Form.Item>

        {/* autoComplete="username" */}

        <Form.Item
          label="Address"
          name="address"
          placeholder="address"
          rules={[
            {
              required: true,
              message: "Please input your Address",
            },
          ]}
        >
          <Input placeholder="Please enter your Address" />
        </Form.Item>

        <p style={{ marginTop: "10px", marginBottom: "10px" }}> Bank Details</p>

        <Form.Item
          label="Account Number"
          name="account_number"
          rules={[
            {
              required: true,
              message: "Please Enter Account Number",
            },
          ]}
          hasFeedback
        >
          <Input placeholder="Enter your Account Number" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Account Number"
          dependencies={["account_number"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm  Account Number",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("account_number") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    "The two Account Number that you entered do not match"
                  )
                );
              },
            }),
          ]}
        >
          <Input placeholder="Confirm your Account Number" />
        </Form.Item>

        <Form.Item
          label="Account Holder's Name"
          name="account_holder_name"
          placeholder="specialization"
          rules={[
            {
              required: true,
              message: "Please enter Account Holder Name",
            },
          ]}
        >
          <Input placeholder="Please enter Account Holder Name" />
        </Form.Item>

        <Form.Item
          label="IFSC Code"
          name="ifsc_code"
          rules={[
            {
              required: true,
              message: "Please enter your IFSC Code",
            },
            {
              min: 8,
              message: "IFSC code must be at least 6 characters",
            },
          ]}
        >
          <Input
            onChange={(e) => setIfsc_code(e.target.value)}
            placeholder="Please enter your IFSC Code"
          />
        </Form.Item>

        <Form.Item
          label="Bank Name"
          name="bank_name"
          placeholder="Bank Name"
          rules={[
            {
              required: true,
              message: "Please Enter your Bank Name",
            },
          ]}
        >
          <Input placeholder="Please Enter your Bank Name" />
        </Form.Item>
        <Form.Item
          label="Branch Name"
          name="branch"
          rules={[
            {
              required: true,
              message: "Please enter your Branch Name",
            },
          ]}
        >
          <Input placeholder="Please enter your Branch Name" />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={
            {
              // offset: 5,
              // span: 16,
            }
          }
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Checkbox>I accept the </Checkbox>
            <h4 style={{ color: "#514C9F" }}>Terms & Conditions</h4>
          </div>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 5,
            // span: 16,
          }}
        >
          <Button
            style={{ width: "200px", height: "44px", background: "#514C9F" }}
            loading={props.loading}
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default DetailsForm;

// BRANCH
// Bank
