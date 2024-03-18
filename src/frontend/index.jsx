import { invoke } from "@forge/bridge";
import ForgeReconciler, {
  Box,
  Inline,
  LoadingButton,
  Strong,
  Text,
} from "@forge/react";
import React, { useState } from "react";
import Location from "./Location";
import Weather from "./Weather";
import { usePromise } from "./usePromise";

const App = () => {
  const [location, setLocation] = useState({
    label: "London, UK",
    value: "london-city-of-london-greater-london-united-kingdom",
  });

  const { data, loading, exec } = usePromise(function () {
    return invoke("getWeather", { location: location.value });
  });

  async function onWeather() {
    if (!location) {
      return;
    }

    exec();
  }

  return (
    <Box
      backgroundColor="color.background.accent.green.subtler"
      padding="space.200"
    >
      <Box paddingBlockEnd="space.100">
        <Text>
          <Strong>Weather in the city of your choice</Strong>
        </Text>
      </Box>

      <Inline space="space.600">
        <Box>
          <Location
            loading={loading}
            location={location}
            onChange={setLocation}
          />
          <Box paddingBlockStart="space.100">
            <LoadingButton
              isLoading={loading}
              isDisabled={!location}
              onClick={onWeather}
            >
              Update location
            </LoadingButton>
          </Box>
        </Box>

        {data && <Weather {...data} />}
      </Inline>
    </Box>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
