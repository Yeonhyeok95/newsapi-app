"use client";

import { FidgetSpinner, Oval } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
