"use client";
import { Box, Paper, Typography } from "@mui/material";
import { UploadButton } from "../lib/utils/uploadthing";
import Image from "next/image";
export default function fileUpload() {
  const [uploadUrl, setUploadUrl] = useState(null);
  return (
    <Box>
      <Typography>Upload an image</Typography>
      <UploadButton
        endpoint={"imageUploader"}
        onClientUploadComplete={(res) => {
          console.log("Upload", res);
          setUploadUrl(res?.[0]?.ufsUrl ?? null);
        }}
        onUploadError={(error) => {
          alert("Uploading error", console.log(`${error.message}`));
        }}
        appearance={{
          button: "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700",
        }}
      />
      {uploadUrl && (
        <Paper elevation={3}>
          <Typography>Preview: </Typography>
          <Image
            src={uploadUrl}
            alt="file upload"
            width={200}
            height={200}
          ></Image>
        </Paper>
      )}
    </Box>
  );
}
