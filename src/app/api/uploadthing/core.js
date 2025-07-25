import { createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

// Initialize the UploadThing handler
const f = createUploadthing();

// Fake auth function — you can replace this with real auth logic
const auth = (req) => {
  return { id: "fakeId" }; // Return a dummy user ID for now
};

// Define your file upload routes
export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    // Middleware runs before upload
    .middleware(async ({ req }) => {
      const user = await auth(req);

      if (!user) throw new UploadThingError("Unauthorized");

      // This value will be available in `onUploadComplete`
      return { userId: user.id };
    })

    // Callback after upload completes
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("✅ Upload complete for userId:", metadata.userId);
      console.log("📁 Uploaded file URL:", file.ufsUrl);

      // This return value goes to client-side `onClientUploadComplete`
      return { uploadedBy: metadata.userId };
    }),
};
