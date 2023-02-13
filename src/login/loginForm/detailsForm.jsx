import axios from "axios";
import "react-phone-input-2/lib/style.css";
import logo from "../../assets/Carepay_logo_main_no_Padding.webp";
import { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input, Alert, message } from "antd";
import specialisationarrayData from '../../assets/specialisationdata'
import Loader from "../loader";
const DetailsForm = (props) => {
  const [form] = Form.useForm();

  const [ifsc_code, setIfsc_code] = useState("");
  const [bankDetails, setBankDetails] = useState(null);
  const [colorState, setColorState] = useState(false)
  const [specialisationColor, setColorStateSpecial] = useState(false)
  const [loaderState, setLoader] = useState(false)

  // update if email changed
  useEffect(() => {
    console.log("bankdetails updated", bankDetails);

    if (bankDetails) {
      form.setFieldsValue({
        bank_name: bankDetails.data.BANK,
        branch: bankDetails.data.BRANCH,
      });
    }
    if (props.state.contactno) {
      form.setFieldsValue({
        phone_number: props.state.prefix_1.toString() + props.state.contactno.toString(),

      })
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
    if (ifsc_code.length === 11) {
      setLoader(true)
      axios({
        url: `https://ifsc.razorpay.com/` + `${ifsc_code}`,
        method: "get",
      })
        .then((res) => {
          if (res.status === 200) {
            setLoader(false)
            setBankDetails(res);
            setLoading(false);
            
          } else {
            setSignupError(res.data.message);
            setLoading(false);
            setLoader(false)
          }
        })
        .catch((e) => {
          setLoading(false);
        });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const setColor = (e,type) => {
if(type==='Entity'){
    if (e.target.value) {
      setColorState(true)
      form.setFieldsValue({
        type_of_entity: e.target.value,

      });
    }
    else {
      form.setFieldsValue({
        type_of_entity: e.target.value,

      });
      setColorState(false)
    }
  }
  if(type==='specialisation'){
    if (e.target.value) {
      setColorStateSpecial(true)
      form.setFieldsValue({
        specialisation: e.target.value,
        

      });
    }
    else {
      form.setFieldsValue({
        specialisation: e.target.value,

      });
      setColorStateSpecial(false)
    }
  }
  }

  return (
    <div className="detail-wraper">
      {/* <div style={{ marginBottom: '14px' }} className="img">
        <img src={logo} width='60%' />{" "}
      </div> */}
      <p style={{ marginTop: '10px', marginBottom: '10px', fontSize: '14px' }}>Thank You  for choosing CarePay! Please enter
        the below details to start your onboarding.</p>
      <p >
        <strong>Personal & Practice Details</strong></p>
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
        {/* <label>Mobile Number</label>
        <input
          style={{ width: '370px', height: '44px', border: "none", borderRadius: "4px", fontSize: '18px', padding: '10px', marginTop: '4px' }}
          disabled
          type="text"
          value={`${props.state.prefix_1.toString() + props.state.contactno.toString()
            }`}
        /> */}
        <Form.Item
          label="Mobile Number"
          name="phone_number"
          style={{ marginTop: '14px' }}
          rules={[
            {
              required: true,
              message: "Please Enter your Mobile Number",
            },
          ]}

        >
          <Input className="background-color" value={props.state.prefix_1.toString() + props.state.contactno.toString()} readOnly placeholder="Mobile Number" />
        </Form.Item>

        <Form.Item
          label="Full Name"
          name="full_name"
          style={{ marginTop: '14px' }}
          rules={[
            {
              required: true,
              message: "Please Enter your Full Name",
            },
          ]}
        >
          <Input className="background-color" placeholder="Full name as per PAN card" />
        </Form.Item>

        <Form.Item

          label="Specialisation"
          name="specialisation"
          rules={[
            {
              required: true,
              message: "Please Select Specialisation",
            },
          ]}
        >
          <select className="select-field form-control" onChange={(e) => setColor(e,'specialisation')} style={{ color: !specialisationColor  ? 'rgba(0, 0, 0, 0.4)' : '#000' }}>
            <option value='' selected style={{ color: '#d9d9d9' }}>Select Specialisation</option>
            {specialisationarrayData ? specialisationarrayData.map((data, i) => {
              return (
                <option value={data.code}>{data.name}</option>
              )
            }) : ""}
          </select>
          {/* <Input className="background-color" placeholder="please enter your specialization" /> */}
        </Form.Item>
        <Form.Item
          label="Clinic Name"
          name="clinic_name"
          rules={[
            {
              required: true,
              message: "Please Enter your Clinic Name",
            },
          ]}
        >
          <Input className="background-color" placeholder=" Clinic Name" />
        </Form.Item>



        <Form.Item
          label="License Number"
          name="license_number"
          placeholder="specialization"
          rules={[
            {
              required: true,
              message: "Please Enter your License Number",
            },
          ]}
        >
          <Input className="background-color" placeholder="License Number" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please Enter your Email",
            },
          ]}
        >
          <Input className="background-color" placeholder="Email" />
        </Form.Item>

        {/* autoComplete="username" */}

        {/* <Form.Item
          label="Address"
          name="address"
          placeholder="address"
          rules={[
            {
              required: true,
              message: "Please Enter your Address",
            },
          ]}
        >
          <Input className="background-color" placeholder="Please enter your Address" />
        </Form.Item> */}
        <Form.Item
          label="Building"
          name="building"
          placeholder="building"
          rules={[
            {
              required: true,
              message: "Please Enter your building",
            },
          ]}
        >
          <Input className="background-color" placeholder="Office/Shop/House/Block number" />
        </Form.Item>
        <Form.Item
          label="Locality"
          name="locality"
          placeholder="locality"
          rules={[
            {
              required: true,
              message: "Please Enter your locality",
            },
          ]}
        >
          <Input className="background-color" placeholder="Building/ Road/ Area" />
        </Form.Item>
        <Form.Item
          label="Pincode"
          name="pincode"
          placeholder="pincode"
          rules={[
            {
              required: true,
              message: "Please Enter your pincode",
            },
          ]}
        >
          <Input className="background-color" placeholder="Pincode" type='tel'  max='6'/>
        </Form.Item>
        <Form.Item
          label="City"
          name="city"
          placeholder="city"
          rules={[
            {
              required: true,
              message: "Please Enter your city",
            },
          ]}
        >
          <Input className="background-color" placeholder="City" />
        </Form.Item>

        <Form.Item
          label="Full name of business entity"
          name="full_name_of_business_entity"
          placeholder="full name of business entity"
          rules={[
            {
              required: true,
              message: "Please Enter your name of business entity",
            },
          ]}
        >
          <Input className="background-color" placeholder="Name of Business Entity" />
        </Form.Item>
        <Form.Item
          label="Type of entity"
          name="type_of_entity"
          placeholder="type_of_entity"
          rules={[
            {
              required: true,
              message: "Please Select Type Of entity",
            },
          ]}
        >
          {console.log(props.state)}
          <select onChange={(e) => setColor(e,'Entity')} className="select-field" style={{ color: !colorState ? 'rgba(0, 0, 0, 0.4)' : '#000' }}>
            <option value='' selected style={{ color: '#d9d9d9' }}>Select Entity</option>
            <option value='Private Limited Company'>Private Limited Company</option>
            <option value='Limited Liability Company (LLP)'>Limited Liability Company (LLP)</option>
            <option value='Partnership Firm'>Partnership Firm</option>
            <option value='Sole Proprietorship'>Sole Proprietorship</option>

          </select>
        </Form.Item>

        <Form.Item
          label="CIN/LLPIN"
          name="cin_llpin"
          placeholder="Enter CIN/LLPIN"

        >
          <Input className="background-color" placeholder="CIN/LLPIN" />
        </Form.Item>
        <Form.Item

          label="GSTIN"
          name="gstin"
          placeholder="Enter GSTIN"

        >
          <Input className="background-color" placeholder="GSTIN" />
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
          
        >
          <Input className="background-color" placeholder="Account Number" type="password" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Account Number"
          dependencies={["account_number"]}
          
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
                    "Account Number should be same as above"
                  )
                );
              },
            }),
          ]}
        >
          <Input className="background-color" placeholder="Confirm your Account Number" />
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
          <Input className="background-color" placeholder="Account Holder Name" />
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
          <Input className="background-color"
            onChange={(e) => setIfsc_code(e.target.value)}
            placeholder="IFSC Code"
            style={{ textTransform: 'uppercase' }}
            maxLength='11'
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
          <Input className="background-color" placeholder="Bank Name" />
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
          <Input className="background-color" placeholder="Branch Name" />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          rules={[
            {
              required: true,
              message: "Accept Terms & Conditions First",
            },
          ]}
          wrapperCol={
            {
              // offset: 5,
              // span: 16,
            }
          }

        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Checkbox>I accept the </Checkbox>
            <h4 style={{ color: "#514C9F" }}>
              <a target='_blank' href='https://docs.google.com/document/d/1ahwOUCCj6uWcx96PQ2wBup3MhxbLdf82ONzMnLvwEek/edit'>Terms & Conditions</a></h4>
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
      {console.log(loaderState,'loaderState')}
      {loaderState?
      <Loader/>
      :""}
    </div>
  );
};
export default DetailsForm;

// BRANCH
// Bank
