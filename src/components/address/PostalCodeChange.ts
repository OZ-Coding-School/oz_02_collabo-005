const PostalCodeChange = (
  results: google.maps.GeocoderAddressComponent[]
): string => {
  let postalCode = "";
  for (let i = 0; i < results.length; i++) {
    const component = results[i];
    if (component.types.includes("postal_code")) {
      postalCode = component.long_name;
      break;
    }
  }
  return postalCode;
};

export default PostalCodeChange;
