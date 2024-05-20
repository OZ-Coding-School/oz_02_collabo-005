const setOrderStatusMessage = (orderStatusCode: number | string) => {
  let message = "";
  let status = "";

  switch (orderStatusCode) {
    case 300000:
      message = "Order confirmation";
      status = "orderLoading";
      break;
    case 300001:
      message = "Acceptance of Order";
      status = "orderLoading";
      break;
    case 300002:
    case 300003:
      message = "rejection of an order";
      status = "orderFailed";
      break;
    case 300091:
      message = "Cancel Order - Restaurant";
      status = "orderFailed";
      break;
    case 300092:
      message = "Cancel Order - Customer";
      status = "orderFailed";
      break;
    case 300101:
      message = "Cooking";
      status = "orderLoaing";
      break;
    case 300102:
      message = "Cooking is done";
      status = "orderLoading";
      break;
    case 310000:
      message = "Waiting for payment";
      status = "orderLoading";
      break;
    case 310001:
      message = "Payment Successful";
      status = "orderLoading";
      break;
    case 310002:
      message = "Payment failed";
      status = "orderFailed";
      break;
    case 300300 || 320000:
      message = "Waiting for dispatch";
      status = "orderLoading";
      break;
    case 300301 || 302001:
      message = "Waiting for pickup";
      status = "orderLoading";
      break;
    case 300302 || 302002:
      message = "Delivering";
      status = "orderLoading";
      break;
    case 300303 || 302003:
      message = "Delivery completed";
      status = "orderSuccess";
      break;
  }
  return { message, status };
};

export default setOrderStatusMessage;
