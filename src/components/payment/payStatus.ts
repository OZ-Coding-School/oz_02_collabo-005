const getPayStatus = (statusCode: number, errorMessage: string) => {
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
    case 200002:
      message = errorMessage || "The restaurant is prepared";
      break;
    case 200003:
      message = errorMessage || "The restaurant is closed";
      break;
    case 210002:
      message = errorMessage || "The menu is soldOut";
      break;
  }
  return { message };
};

export default getPayStatus;
