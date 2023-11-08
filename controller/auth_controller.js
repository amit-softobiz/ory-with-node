const axios = require("axios");
const { Configuration, FrontendApi }= require("@ory/client");
const jq = require('node-jq');
const frontend = new FrontendApi(
  new Configuration({
    basePath: `http://127.0.0.1:4433`,
  }),
)

exports.loginController = async (req, res) => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:4433/self-service/login/api"
    );
    const payLoad ={"method":"password","identifier":req.body.email,"password":req.body.password}
    const response1 = await axios.post(
      `http://127.0.0.1:4433/self-service/login?flow=${response.data.id}`,
      payLoad
    );
    // const dataa = await frontend.performNativeLogout({
    //   performNativeLogoutBody: {
    //     session_token: response1.data.session_token,
    //   },
    // })
    // console.log("dataaaaaa",dataa);
    res.send(response1.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("An error occurred please verify your email and password...");
  }
};

exports.registrationController = async (req, res) => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:4433/self-service/registration/api"
    );
    const flowId = response.data.id;
    const payLoad = {
      "traits.email": req.body.email,
      password: req.body.password,
      "traits.name.first": req.body.firstName,
      "traits.name.last": req.body.lastName,
      method: "password",
    };
    const response1 = await axios.post(
      `http://127.0.0.1:4433/self-service/registration?flow=${flowId}`,
      payLoad
    );
    res.send("success");
  } catch (error) {
    if (error.message == "Request failed with status code 400") {
      return res.status(400).send("email already taken");
    } else {
      res.status(500).send(error);
    }
  }
};

exports.logoutController = async(req, res)=>{
  frontend
  .createBrowserLogoutFlow({ cookie: req.header("cookie") })
  .then(({ data }) => {
    console.log(data.logout_url) // The logout URL
    console.log(data.logout_token) // The logout token
  })
}
exports.registerPage= async(req, res)=>{
  res.render("registration");
}
exports.loginPage= async(req, res)=>{
  res.render("login");
} 
exports.whoamiController= async(req, res)=>{
  try {
    // const authToken = "EAhtvEW5Sc0VzwKuSbh3CLtaRz7lQNRD"
    const authToken = "yr00NqRQsLh4iHDezW0IRIJjaUwS2Y2w"
    const response = await axios.get("http://127.0.0.1:4433/sessions/whoami", {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });
    res.send(response.data);
  } catch (error) {
    console.log(error.message);
  }
}

exports.settingController= async(req, res)=>{
  try {
    const sessionToken = 'EAhtvEW5Sc0VzwKuSbh3CLtaRz7lQNRD';
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${sessionToken}`,
    };
    const response = await axios.get(
      "http://127.0.0.1:4433/self-service/settings/api",{headers}
    );
    const response1 = await axios.get(
      `http://127.0.0.1:4433/self-service/settings/flows?id=${response.data.id}`,{headers}
    );
    
    res.send(response1.data);
  } catch (error) {
    console.log(error.message);
  }

}

exports.updateProfileController = async(req, res)=>{
  try {
    // const sessionToken = 'yr00NqRQsLh4iHDezW0IRIJjaUwS2Y2w';
      const sessionToken = 'yeqEojRIIJgK3wSTPUXA8BCOvVh8zDoM';
    const headers = {
      'Authorization': `Bearer ${sessionToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    const apiUrl = 'http://127.0.0.1:4433/self-service/settings/api';
    const response = await axios.get(apiUrl, { headers });
    const requestData = {
      password: req.body.password,
      method: 'password',
    };
    const response1 = await axios.post(response.data.ui.action, requestData, { headers });

    res.send(response1.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'An error occurred while making the request' });
  }
}

exports.emailverification = async(req, res)=>{
  try {
    const response = await axios.get(
      "http://127.0.0.1:4433/verification"
    );
    res.send(response.data);
  } catch (error) {
    console.log(error.message);
  }
}




