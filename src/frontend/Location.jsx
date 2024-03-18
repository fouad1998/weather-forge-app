import { invoke } from "@forge/bridge";
import { Label, Select } from "@forge/react";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useDebounce } from "./useDebounce";
import { usePromise } from "./usePromise";

const Location = ({ loading, location: init, onChange }) => {
  const [location, setLocation] = useState(init.label);
  const {
    data,
    loading: isLoading,
    exec,
  } = usePromise(function () {
    if (!location) {
      return Promise.resolve([]);
    }
    return invoke("getLocations", { query: location });
  });

  const execRef = useRef(exec);
  execRef.current = exec;
  const getOptions = useDebounce(() => execRef.current(), 150);

  const options =
    data?.map((location) => ({
      label: location.name + ", " + location.country,
      value: location.url,
    })) || [];

  useEffect(getOptions, [location]);

  return (
    <>
      <Label labelFor="location-input">Location</Label>
      <Select
        id="location-input"
        appearance="default"
        placeholder="Type to search for a location"
        inputValue={location}
        value={init}
        options={options}
        onInputChange={setLocation}
        onChange={onChange}
        isLoading={isLoading}
        isDisabled={loading}
      />
    </>
  );
};

Location.propTypes = {
  loading: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Location;
