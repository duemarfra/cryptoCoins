import * as React from "react";
import { Dimensions } from "react-native";

import {
  Canvas,
  Circle,
  vec,
  Fill,
  BackdropFilter,
  Blur,
  useClockValue,
  useComputedValue,
} from "@shopify/react-native-skia";

const { width, height } = Dimensions.get("window");
const c = vec(width / 2, height / 2);
const r = c.x;

const interval = 10000;

export default function MyBlur() {
  const clock = useClockValue();

  const opacity = useComputedValue(() => {
    return (clock.current % interval) / interval;
  }, [clock]);

  const radius = useComputedValue(() => {
    return ((clock.current % interval) * r) / interval;
  }, [clock]);

  return (
    <Canvas style={{ width: "100%", height: "100%", position: "absolute" }}>
      <Fill color={"#000000"} />
      <Circle
        r={radius}
        cx={width / 2}
        cy={height / 1.3}
        color="#DAA520"
        opacity={opacity}
      />
      <Circle
        r={radius}
        cx={width / 2}
        cy={height / 4}
        color="#DAA520"
        opacity={opacity}
      />
      <BackdropFilter filter={<Blur blur={20} />}>
        <Fill color={"#DFE3E310"} />
      </BackdropFilter>
    </Canvas>
  );
}
