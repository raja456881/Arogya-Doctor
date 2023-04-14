import OtpInput from "react-otp-input";
import "react-phone-input-2/lib/style.css";
import { Button, Checkbox, Form, Input, Alert, message } from "antd";
const OtpForm = (props) => {
  return (
    <Form
      name="basic"
      onFinish={props.onFinishOtp}
      //   onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      
      <h1 style={{ fontWeight: 600 }}>Verify OTP</h1>
      <h2>Enter the OTP Sent to</h2>
      <div className="change-number">
        <h3>
          {props.state.prefix_1.toString() + props.state.contactno.toString()}
        </h3>
        <h4
          onClick={() => props.setOtoScreenShow(false)}
          style={{ color: "#514C9F", fontWeight: 600, cursor: "pointer",textDecoration:'underline' }}
        >
          Change Number
        </h4>
      </div>

      <Form.Item>
        <div className="otp-wraper">
          <OtpInput
            className="otp-inp"
            value={props.otp}
            onChange={(e) => props.setOtp(e)}
            numInputs={4}
            isInputNum={true}
            type='tel'
            // separator={<span>-</span>}

          />
        </div>
      </Form.Item>

      <Form.Item>
        <Button
          width={100}
          style={{ background: "#514C9F", color: "white", padding: "10px 0px" }}
          disabled={props.otp.toString().length === 4 ? false : true}
          loading={props.loading}
          type="primary"
          htmlType="submit"
        >
          Submit OTP
        </Button>
      </Form.Item>
    </Form>
  );
};
export default OtpForm;
