import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

const GuestProfile = () => {
  const { userSlug } = useParams();
  return <div>Hello word</div>;
};

export default GuestProfile;
