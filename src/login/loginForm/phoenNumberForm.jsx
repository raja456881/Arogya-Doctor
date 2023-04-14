import PI from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button, Checkbox, Form, Input, Alert, message } from "antd";


const PhoneInput = import.meta.env.PROD ? PI.default : PI;
const PhoneNumberForm = (props) => {

  return (
    <Form name="basic" onFinish={() => props.onFinish()} autoComplete="off">
      <h1>Sign Up</h1>
     <Form.Item
        label="Mobile Number"
        name="Mobile Number"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
          { min: 12, message: "Number must be minimum 10 characters." },
        ]}
      >
        <PhoneInput
          inputProps={{
            name: "Mobile Number",
            required: true,
            autoFocus: true,
          }}
          onChange={(val, extra) =>
            props.handleContactChange({
              value: val,
              extraVal: extra,
              field: "contactno",
            })
          }
          enableSearch={true}
          country={"in"}
          value={90}
        />
        {/* {console.log('phone', PhoneInput)} */}
      </Form.Item>

      <Form.Item>
        <Button
          width="100%"
          style={{ backgroundColor : "#514C9F" }}
          loading={props.loading}
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default PhoneNumberForm;
