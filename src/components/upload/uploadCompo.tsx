"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import Modal from "../simple/Modal";
import UploadForm from "./uploadForm";
import { useState } from "react";

export default function UploadCompo({
  currentImg,
  handleUploadSuccess,
}: {
  currentImg: string;
  handleUploadSuccess: any;
}) {
  const [uploading, setUploading] = useState(false);

  const handleUploadSuccess1 = (fileName: string) => {
    handleUploadSuccess(fileName);
    setUploading(false);
  };

  return (
    <>
      <div className="p-4 mt-2 bg-background grid w-full items-center gap-1.5">
        {currentImg ? <p style={{ color: "#00ef09" }}>No Image Uploaded Successfully</p> : <p style={{ color: "#f72e36" }}>No Image Uploaded</p>}
        <Button
          type="button"
          onClick={() => {
            setUploading(true);
          }}
        >
          Upload Image
        </Button>
      </div>
      <Modal
        isOpen={uploading}
        onClose={() => {
          setUploading(false);
        }}
      >
        <UploadForm onUploadSuccess={handleUploadSuccess1} />
      </Modal>
    </>
  );
}
