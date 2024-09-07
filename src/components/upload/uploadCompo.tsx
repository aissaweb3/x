"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import Modal from "../simple/Modal";
import { Card, CardContent } from "../ui/card";
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
          alt={"uploaded image"}
          width={200}
          height={200}
          className="w-full h-48 object-contain rounded-t-lg"
        />
        <Button
          type="button"
          onClick={() => {
            setUploading(true);
          }}
        >
          Upload Nft Image
        </Button>
      </div>
      <Modal
        isOpen={uploading}
        onClose={() => {
          setUploading(false);
        }}
      >
        <Card>
          <CardContent
            style={{ maxHeight: "90vh" }}
            className="relative overflow-hidden"
          >
            <UploadForm onUploadSuccess={handleUploadSuccess1} />
          </CardContent>
        </Card>
      </Modal>
    </>
  );
}
