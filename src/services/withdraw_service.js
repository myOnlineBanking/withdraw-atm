import axios from "axios";
const Swal = require("sweetalert2");
export default {
  sendOtp(firstName, lastName, email, phone, otp) {
    var payload = {
      emailReceiver: email,
      subject: "OTP",
      content: otp,
    };
    console.log("OTP :" + otp);

    fetch("https://my-mailing-server-tt.herokuapp.com/Mailing/sendemail", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(function (response) {
      console.log("Response " + response);
    });
    payload = {
      phone: phone,
      otp: otp,
    };
    if (phone && phone != "") {
      axios
        .post("https://my-sms-otp-service.herokuapp.com/Sms/send", payload)
        .then(function (response) {
          console.log("Response " + response);
        });
    }
  },

  makeWithdraw(cin, reference) {
    const payload = {
      cin: cin,
      reference: reference,
    };
    console.log(payload);

    axios
      .post(
        "https://transfer-client-service-t.herokuapp.com/transfer-client/withdraw",
        payload
      )
      .then((response) => {
        console.log("Response Data: " + JSON.stringify(response.data));
        if (response.data.status == "200") {
          Swal.fire({
            title: "Success!",
            text: response.data.error,
            icon: "success",
            confirmButtonText: "Ok",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: response.data.error,
            icon: "error",
            confirmButtonText: "cancel",
          });
        }
        return JSON.stringify(response.data);
      });
  },
};
