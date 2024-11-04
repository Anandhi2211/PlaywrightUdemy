export class APiUtils {
  apiContext :any;
  payLoad:string;
  constructor(apiContext : any, payLoad : string) {
    this.apiContext = apiContext;
    this.payLoad = payLoad;
  }
  async getToken() {
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.payLoad,
        // ,
        // headers: {
        //     "Content-Type": "application/json", // Ensure correct headers
        //     "Accept": "application/json"
        //   }
      }
    );
    // expect(loginResponse.ok()).toBeTruthy();
    const jsonLogin = await loginResponse.json();
    const token = jsonLogin.token;
    console.log(token);
    return token;
  }

  async createOrder(orderPayLoad : String) {
    let response = {token : String, orderId : String};
    response.token = await this.getToken();
    console.log(response.token);
    const orderIdResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayLoad,
        headers: {
          Authorization: response.token,
          "Content-Type": "application/json",
        },
      }
    );
    const jsonOrderId = await orderIdResponse.json();
    console.log(jsonOrderId);
    response.orderId = jsonOrderId.orders[0];
    console.log(response.orderId);
    return response;
  }
}

module.exports = {  APiUtils };
