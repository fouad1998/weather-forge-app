import { Box, Em, Heading, Image, Inline, Strong, Text } from "@forge/react";
import PropTypes from "prop-types";
import React from "react";

const Weather = ({ temp_c, wind_kph, humidity, condition }) => {
  return (
    <Inline grow="fill" space="space.600">
      <Inline space="space.100" alignBlock="center">
        <Image src={`https:${condition.icon}`} size="large" />
        <Heading as="h1">{temp_c}°C</Heading>
      </Inline>

      <Inline grow="fill" alignInline="end">
        <Box>
          <Text>
            <Strong>Wind:</Strong> <Em>{wind_kph}km/h</Em>
          </Text>
          <Text>
            <Strong>Humidity:</Strong> <Em>{humidity}%</Em>
          </Text>
          <Text>
            <Strong>Condition:</Strong> <Em>{condition.text}</Em>
          </Text>
        </Box>
      </Inline>
    </Inline>
  );
};

Weather.propTypes = {
  temp_c: PropTypes.number.isRequired,
  wind_kph: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
  condition: PropTypes.shape({
    text: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
};

export default Weather;
