import { Button, Result } from "antd";
const InvalidPath = (props) => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button onClick={() => props.navigate("/login")} type="primary">
        Back Home
      </Button>
    }
  />
);

export default InvalidPath;
