import React, { useState } from "react";

const ImageUpload = () => {
  const [uploadImgUrl, setUploadImgUrl] = useState("");

  const onChangeImageUpload = (e) => {
    const { files } = e.target;
    const uploadFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);
    reader.onloadend = () => {
      setUploadImgUrl(reader.result);
    };
  };

  return (
    <>
      {uploadImgUrl && <img src={uploadImgUrl} alt="img" />}
      <input type="file" accept="image/*" onChange={onChangeImageUpload} />
    </>
  );
};

export default ImageUpload;
