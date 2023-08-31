import RNFetchBlob from "rn-fetch-blob";

export const getBase64FromURL = async imageUrl => {
  const resp = await RNFetchBlob.fetch('GET', imageUrl);

  let base64image = resp.data;
  return 'data:image/png;base64,' + base64image;

  // .catch(err => errorHandler(err));
};


