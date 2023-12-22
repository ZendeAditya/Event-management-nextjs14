import React from "react";

const EventBox = ({ content }: any) => {
  return (
    <div className="h-screen w-full border-2 border-white">
      EventBox {content}
    </div>
  );
};

export default EventBox;
