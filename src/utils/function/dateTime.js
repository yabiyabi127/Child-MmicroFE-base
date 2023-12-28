import React from "react";

const SplitTime = (numberOfHours) => {
  if (numberOfHours > 24) {
    var Days = Math.floor(numberOfHours / 24);
    var Remainder = numberOfHours % 24;
    var Hours = Math.floor(Remainder);
    return (
      <>
        {`${Days} Hari`}
        {` ${Hours} Jam`}
      </>
    );
  } else {
    return <>{`${numberOfHours} Jam`}</>;
  }
};

export { SplitTime };
