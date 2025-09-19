import { svg, container, content, progressFill } from './CircularProgress.css';

const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
  const rad = ((angle - 90) * Math.PI) / 180.0;

  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
};

const describeArc = (cx: number, cy: number, r: number, startAngle: number, endAngle: number) => {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M',
    cx,
    cy,
    'L',
    start.x,
    start.y,
    'A',
    r,
    r,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
    'Z',
  ].join(' ');
};

type Props = {
  progress: number;
  children?: React.ReactNode;
};

export const CircularProgress = (props: Props) => {
  const { progress, children } = props;

  const size = 40;
  const radius = size / 2;
  const endAngle = progress * 360;
  const progressPath = describeArc(radius, radius, radius, 0, endAngle);

  return (
    <div className={container} style={{ width: size, height: size }}>
      <svg width={size} height={size} className={svg}>
        <circle cx={radius} cy={radius} r={radius} fill="transparent" />
        {progress < 1 ? (
          <path d={progressPath} className={progressFill} />
        ) : (
          <circle cx={radius} cy={radius} r={radius} className={progressFill} />
        )}
      </svg>
      <div className={content}>{children}</div>
    </div>
  );
};
