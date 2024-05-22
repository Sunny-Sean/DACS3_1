import { useEffect, useRef } from "react";
import { Dimensions, StyleSheet, View, Animated, Button } from "react-native";
import Svg, { G, Line, Circle } from "react-native-svg";

const widow_width = Dimensions.get("window").width;

function LineChart({
  line_chart_data = [],
  containerHeight = 400,
  circleColor = "#ccc",
  circleRadius = 4,
  axisColor = "#fff",
  axisWidth = 2,
}) {
  const marginFor_x_fromLeft = 50;
  const marginFor_y_fromBottom = 50;
  const padding_from_screenBorder = 20;

  const x_axis_x1_point = marginFor_x_fromLeft;
  const x_axis_y1_point = containerHeight - marginFor_y_fromBottom;
  const x_axis_x2_point = widow_width - padding_from_screenBorder;
  const x_axis_y2_point = containerHeight - marginFor_y_fromBottom;
  const gap_between_x_axis_ticks = widow_width / (line_chart_data.length - 1);

  const y_axis_x1_point = marginFor_x_fromLeft;
  const y_axis_y1_point = padding_from_screenBorder;
  const y_axis_x2_point = marginFor_x_fromLeft;
  const y_axis_y2_point = containerHeight - marginFor_y_fromBottom;

  const animated_x_axis_width = useRef(
    new Animated.Value(x_axis_x1_point)
  ).current;

  const animated_y_axis_width = useRef(
    new Animated.Value(y_axis_y2_point)
  ).current;

  const animated_circle_radius = useRef(new Animated.Value(0)).current;

  const AnimatedLine = Animated.createAnimatedComponent(Line);
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const AnimatedSvg = Animated.createAnimatedComponent(Svg);

  useEffect(() => {
    start_axis_circle_animation();
    start_x_y_axis_animation();
  }, []);

  const start_axis_circle_animation = () => {
    Animated.timing(animated_circle_radius, {
      toValue: circleRadius,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  const start_x_y_axis_animation = () => {
    Animated.timing(animated_x_axis_width, {
      toValue: x_axis_x2_point,
      duration: 1500,
      delay: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(animated_y_axis_width, {
      toValue: y_axis_y1_point,
      duration: 1500,
      delay: 500,
      useNativeDriver: true,
    }).start();
  };

  const render_x_y_axis = () => {
    return (
      <G key="x-axis y-axis">
        <AnimatedCircle
          key="x-axis x1y1-circle"
          cx={x_axis_x1_point}
          cy={x_axis_y1_point}
          fill={circleColor}
          r={animated_circle_radius}
        />
        <AnimatedCircle
          key="x-axis x2y2-circle"
          cx={x_axis_x2_point}
          cy={x_axis_y2_point}
          fill={circleColor}
          r={animated_circle_radius}
        />
        <AnimatedCircle
          key="y-axis x1y1-circle"
          cx={y_axis_x1_point}
          cy={y_axis_y1_point}
          fill={circleColor}
          r={animated_circle_radius}
        />
        <AnimatedLine
          key="x-axis"
          x1={x_axis_x1_point}
          y1={x_axis_y1_point}
          x2={animated_x_axis_width}
          y2={x_axis_y2_point}
          stroke={axisColor}
          strokeWidth={axisWidth}
        />
        <AnimatedLine
          key="y-axis"
          x1={y_axis_x1_point}
          y1={animated_y_axis_width}
          x2={y_axis_x2_point}
          y2={y_axis_y2_point}
          stroke={axisColor}
          strokeWidth={axisWidth}
        />
      </G>
    );
  };

  const render_x_axis_labes_and_ticks = () => {
    return line_chart_data.map((item, index) => {
      return (
        <G key={`x-axis labels and ticks ${index}`}>
          <Line
            key={`x-axis-tick ${index}`}
            x1={x_axis_x1_point + gap_between_x_axis_ticks * index}
            y1={x_axis_y1_point}
            x2={x_axis_x1_point + gap_between_x_axis_ticks * index}
            y2={x_axis_y1_point + 10}
            strokeWidth={axisWidth}
            stroke={axisColor}
          />
        </G>
      );
    });
  };

  return (
    <View style={[styles.svgWrapper, { height: containerHeight }]}>
      <AnimatedSvg height="100%" width="100%" style={styles.svgStyle}>
        {render_x_y_axis()}
        {render_x_axis_labes_and_ticks()}
      </AnimatedSvg>
    </View>
  );
}

export default LineChart;

const styles = StyleSheet.create({
  svgWrapper: {
    height: 400,
    backgroundColor: "#000",
  },
  svgStyle: {
    backgroundColor: "#000",
  },
});
