import { useEffect, useState } from "react";
import axios from "axios";
import "react-phone-input-2/lib/style.css";
import PhoneNumberForm from "./phoenNumberForm";
import OtpForm from "./otpForm";
import DetailsForm from "./detailsForm";
import UserSuccess from "./userSucess";
import "./index.scss";
import 'font-awesome/css/font-awesome.min.css';
// import bannerImg from "../../assets/Login00.png";
import DashboardImg from "../../assets/Hero Illustration for Doc Onboarding.webp";
import bannerLogo from "../../assets/Carepay_logo_main_no_Padding.webp";

const LogIn = (props) => {
  const [state, setState] = useState({
    contactno: "",
    prefix_1: "",
  });
  const [otpScreenShow, setOtoScreenShow] = useState(false);
  const [otp, setOtp] = useState("");
  const [logInStatus, setLogInStatus] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // setLogInStatus(true)
    if (otpScreenShow === false) {
      setOtp("");
    }
  }, [otpScreenShow]);

  // funciton for send phone number
  const submitPhoneNumber = (values) => {
    setLoading(true);
    let dataForSend = {
      phone_number: `${state.prefix_1.toString() + state.contactno.toString()}`,
      doctor: true
    };

    axios({
      url: "https://www.api.carepay.one/api/send_otp",
      method: "post",
      data: { ...dataForSend },
      withCredentials: true,
    })
      .then((res) => {
        setLoading(false);

        if (res.data.msg === "success") {
          setOtoScreenShow(true);
        } else {
          setSignupError(res.data.message);
        }
      })
      .catch((e) => {
        setSignupError(e);
        setLoading(false);
      });
  };

  // funtion for send otp
  const onFinishOtp = (values) => {

    setLoading(true);
    let dataForSend = {
      phone_number: `${state.prefix_1.toString() + state.contactno.toString()}`,
      otp: otp.toString(),
    };

    axios({
      url: "https://www.api.carepay.one/api/login",
      method: "post",
      data: { ...dataForSend },
      withCredentials: true,
    })
      .then((res) => {
        if (res.status === 202) {
          setLoading(false);
          setLogInStatus(true);
        } else {
          setSignupError(res.data.message);
          setLoading(false);
          
        }
      })
      .catch((e) => {
        // setLogInStatus(true);
        // alert(e?.response?.data?.error);
        console.log(e?.response?.data?.error, "response");

        setLoading(false);
      });
  };

  // function for send details
  const submitDetails = (values) => {
    console.log(values, '1')

    if (!values.gstin) {
      delete values.gstin
    }
    if (!values.cin_llpin) {
      delete values.cin_llpin
    }
    console.log(values, '2')

    setLoading(true);

    if (values.remember === true) {
      delete values.confirm;
      delete values.remember;
      axios({
        url: "https://www.api.carepay.one/api/doctor/create_profile",
        method: "post",
        data: {
          ...values,
          phone_number: state.prefix_1.toString() + state.contactno.toString(),
        },
        withCredentials: true,
      })
        .then((res) => {
          console.log(res)
          setUserCreated(true);
          if (res.data.msg==='sucessfully created') {
            setLoading(false);
            setUserCreated(true);
          } else {
            alert('please try again later')
            setSignupError(res.data.msg);
            setLoading(false);
          }
        })
        .catch((e) => {
          setUserCreated(false);
          alert('please try again later')

          setLoading(false);
        });
    } else {
      alert('accept ')
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleContactChange = (ob) => {
    let onlyNumber = ob.value
      .replace(/[^0-9]+/g, "")
      .slice(
        !!Object.entries(ob.extraVal).length ? ob.extraVal.dialCode.length : 0
      );

    if (ob.value === 0 && ob.value === "") {
      setState({
        contactno: "",
        prefix_1: "",
      });
    } else if (parseInt(ob.value)) {
      setState({
        contactno: onlyNumber,
        prefix_1: ob.extraVal.dialCode,
      });
    }
  };

  if (userCreated) {
    return <UserSuccess />;
  }

  if (logInStatus) {
    return <DetailsForm state={state} onFinish={submitDetails} />;
  }

  if (otpScreenShow) {
    return wraper(
      <OtpForm
        setOtoScreenShow={setOtoScreenShow}
        state={state}
        onFinishOtp={onFinishOtp}
        otp={otp}
        setOtp={setOtp}
        loading={loading}
      />
    );
  }

  return wraper(
    <PhoneNumberForm
      loading={loading}
      onFinish={submitPhoneNumber}
      handleContactChange={handleContactChange}
    />
  );
};
export default LogIn;

const wraper = (content) => {
  return (
    <div className="phn-wraper">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={bannerLogo} alt="BannerLogo" width={'60%'} />
      </div>
      <div className="image">
        <h2
          style={{
            color: "#514C9F",
            paddingTop: "40px",
            fontSize: "28px",
            fontWeight: "700",
            lineHeight: "30px",
            letterSpacing: "2px",
            textAlign: "center",
          }}
        >
          Grow Your Revenue & Patient Retention
        </h2>
        <img src={DashboardImg}></img>
      </div>
      <div className="content">{content}</div>
    </div>
  );
};
