import { Button, Result } from "antd";
import PopupThank from "../../assets/Frame 5707.png";
import Logo from "../../assets/Logo.svg"
const UserSuccess = () => (


  <div sx={{ width: '50%', margin: 'auto', border: '10px solid grey' }} >
    <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }} >
      <img src={Logo} alt="Logo" />
    </div>

    {/* <Result
      style={{  margin: "auto" }}
      extra={[<img src={PopupThank} alt="" />]}
      title="Your application is under review"
      subTitle="Your application is under review,
    we will inform you once verified.
     This typically takes around 30 mins..."
    /> */}
    <div style={{textAlign:'center'}}>   
     <img src={PopupThank} alt="" className="size-handle"  style={{marginTop:'50px',maxWidth:'290px'}}/>
     <h2 style={{ color: "#514C9F", textAlign: "center", marginTop: "20px",fontWeight:'700',marginBottom:'20px' }}>Thank You !</h2>

    <p style={{padding:'10px'}}>Your application is under review,<br/>
      we will inform you once verified.</p>
    <p><strong> This typically takes around 30 mins...</strong></p>
    </div>
  </div>
);
export default UserSuccess;

// Thank you!
// Your application is under review,
// we will inform you once verified.
// This typically takes around 30 mins...
