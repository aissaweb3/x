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
      <div className="grid w-full items-center gap-1.5">
        <Image
          src={`/images/uploads/${currentImg}`}
          alt={"No Image Uploaded"}
          width={200}
          height={200}
          className="w-full bg-[#ffffff47] border h-12 object-contain rounded-t-lg"
        />
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
