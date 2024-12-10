"use client";

import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";

export default function FileUploadSection() {

  return (
      <div className="items-center justify-between p-24">
        <FilePond
          labelIdle='<b>*ONLY PDF Files*</b> Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          allowMultiple={false}
          credits={false}
          server={{
            url: "/api/upload",
          }}
        />
      </div>
  );
}
