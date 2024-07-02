Input;
import { commonColors } from '@/../tailwind.config';
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  IconButton,
  InputAdornment,
  OutlinedTextFieldProps,
  TextField,
} from '@mui/material';
import { HTMLInputTypeAttribute, useState } from 'react';

export interface IInputProps extends Omit<OutlinedTextFieldProps, 'variant'> {
  className?: string;
  errorMessage?: string;
  maxLength?: number;
  placeholderFontSize?: string;
  variant?: 'standard' | 'outlined' | 'filled';
  inputTextColor?: string;
}

const defineType = (
  inputType: HTMLInputTypeAttribute | undefined,
  showPassword: boolean
) => {
  if (inputType === 'password' && showPassword) {
    return 'text';
  } else if (inputType === 'password' && !showPassword) {
    return inputType;
  } else {
    return inputType;
  }
};

export function Input({
  className,
  fullWidth = false,
  errorMessage,
  maxLength,
  placeholderFontSize = '12px',
  variant = 'standard',
  inputTextColor = commonColors?.black,
  ...rest
}: IInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const style = {
    '& .MuiOutlinedInput-root': {
      height: 40,
      '&.Mui-focused fieldset': {
        borderColor: commonColors.primary.DEFAULT,
        color: commonColors.primary.DEFAULT,
      },
    },
    '& .MuiOutlinedInput-input': {
      color: inputTextColor,
      fontSize: placeholderFontSize,
    },
    '& label': {
      fontSize: '12px',
      top: '2px',
    },
    '& label.Mui-focused': {
      color: commonColors.primary.DEFAULT,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: commonColors.primary.DEFAULT,
    },
    '& .MuiInputBase-input::placeholder': {
      fontSize: placeholderFontSize,
    },
  };

  return (
    <TextField
      sx={style}
      variant={variant}
      error={!!errorMessage}
      helperText={errorMessage}
      fullWidth={fullWidth}
      className={className}
      size="small"
      data-testid="input-field"
      {...rest}
      type={defineType(rest?.type, showPassword)}
      inputProps={{
        maxLength: maxLength,
        inputTextColor: inputTextColor,
        ...rest?.inputProps,
      }}
      InputProps={{
        startAdornment: rest.type === 'password' && (
          <InputAdornment position="start">
            <Lock
              sx={{
                color: errorMessage
                  ? commonColors.red
                  : commonColors.primary.DEFAULT,
              }}
            />
          </InputAdornment>
        ),
        endAdornment: rest.type === 'password' && (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
              data-testid="password-toggle"
            >
              {showPassword ? (
                <VisibilityOff
                  sx={{
                    color: errorMessage
                      ? commonColors.red
                      : commonColors.primary.DEFAULT,
                  }}
                />
              ) : (
                <Visibility
                  sx={{
                    color: errorMessage
                      ? commonColors.red
                      : commonColors.primary.DEFAULT,
                  }}
                />
              )}
            </IconButton>
          </InputAdornment>
        ),
        ...rest?.InputProps,
      }}
    />
  );
}
