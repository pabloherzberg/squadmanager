import classNames from 'classnames';

interface TypographyProps {
  className?: string;
  children?: React.ReactNode;
  fontWeight?: FontWeightTypes;
  onClick?: () => void;
}

export type FontWeightTypes =
  | 'light'
  | 'normal'
  | 'bold'
  | 'medium'
  | 'semibold';

export function H1({
  className,
  children,
  fontWeight,
  ...props
}: TypographyProps) {
  return (
    <h1
      className={classNames(
        `
        text-[32px] leading-[120%] font-${fontWeight}`,
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function H2({
  className,
  children,
  fontWeight,
  ...props
}: TypographyProps) {
  return (
    <h2
      className={classNames(
        `text-[24px] leading-[120%] font-${fontWeight}`,
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function H3({
  className,
  children,
  fontWeight,
  ...props
}: TypographyProps) {
  return (
    <h3
      className={classNames(
        `text-[20px] leading-[120%] font-${fontWeight}`,
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}
export function H4({
  className,
  children,
  fontWeight,
  ...props
}: TypographyProps) {
  return (
    <h4
      className={classNames(
        `text-[16px] leading-[120%] font-${fontWeight}`,
        className
      )}
      {...props}
    >
      {children}
    </h4>
  );
}

export function BodyText({
  className,
  children,
  fontWeight,
  ...props
}: TypographyProps) {
  return (
    <p
      className={classNames(
        `text-[14px] leading-[120%]  font-${fontWeight}`,
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function SmallText({
  className,
  children,
  fontWeight,
  ...props
}: TypographyProps) {
  return (
    <p
      className={classNames(
        `text-[12px] leading-[140%]  font-${fontWeight}`,
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
