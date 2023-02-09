import { Button, Result } from "antd";
import PopupThank from "../../assets/PopupThank.svg";
import Logo from "../../assets/Logo.svg"
const UserSuccess = () => (


  <div sx={{ width: '50%', margin: 'auto', border : '10px solid grey' }} >
    <div style={{display : "flex", justifyContent : "center", marginTop : "40px"}} >
      <img  src={Logo} alt="Logo" />
    </div>

    <h2 style={{color : "#514C9F", textAlign : "center", marginTop: "60px"}}>Thank You</h2>
    <Result
      style={{width : '400px', margin : "auto"}}
      extra={[<img src={PopupThank} alt="" />]}
      title="Your application is under review"
      subTitle="Your application is under review,
    we will inform you once verified.
     This typically takes around 30 mins..."
    />
  </div>
);
export default UserSuccess;

// Thank you!
// Your application is under review,
// we will inform you once verified.
// This typically takes around 30 mins...
