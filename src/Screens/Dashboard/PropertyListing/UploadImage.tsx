import React, { useState } from "react";
import { Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";

type Props = {
  maxFiles?: number;
  accept?: string;
  onChange?: UploadProps["onChange"];
  onPreview?: (file: UploadFile) => void;
};

const UploadImage: React.FC<Props> = ({
  maxFiles = 5,
  accept = "image/*",
  onChange: externalOnChange,
  onPreview: externalOnPreview,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const internalOnChange: UploadProps["onChange"] = (info) => {
    setFileList(info.fileList);
    if (externalOnChange) {
      externalOnChange(info);
    }
  };

  const internalOnPreview = async (file: UploadFile) => {
    if (externalOnPreview) {
      externalOnPreview(file);
    } else {
      let src = file.url as string;
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj!);
          reader.onload = () => resolve(reader.result as string);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow?.document.write(image.outerHTML);
    }
  };

  return (
    <Upload
      accept={accept}
      listType="picture-card"
      fileList={fileList}
      onChange={internalOnChange}
      onPreview={internalOnPreview}
      multiple={true}
    >
      {fileList.length < maxFiles && "+ Upload"}
    </Upload>
  );
};

export default UploadImage;
