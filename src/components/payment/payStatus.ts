const getPayStatus = (statusCode: number) => {
  let message = "";
  switch (statusCode) {
    case 310400:
      message = "Invalid card information";
      break;
    case 310410:
      message = "Lack of balance";
      break;
    case 310500:
      message = "Server internal error";
      break;
    case 310502:
      message = "Payment communication error";
      break;
  }
  return { message };
};

export default getPayStatus;
