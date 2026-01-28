import React from "react";
import { FormControl, Stack, SxProps, TextField } from "@mui/material";
import { TextRob16FontL } from "../../../components/TextL";
import { useZTheme } from "../../../stores/useZTheme";
import { TextRob12Font2Xs } from "../../../components/Text2Xs";

interface Props {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  sx?: SxProps;
  sxLabel?: SxProps;
  containerSx?: SxProps;
  className?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  icon?: JSX.Element;
}

const LabelInputMsp = ({
  value,
  onChange,
  label,
  placeholder,
  sx = {},
  sxLabel = {},
  containerSx = {},
  className = "",
  type = "text",
  disabled = false,
  required = false,
  icon,
}: Props) => {
  const { theme, mode } = useZTheme();

  return (
    <FormControl
      className={className}
      sx={{
        alignItems: "flex-start",
        width: "100%",
        "@media (min-width: 950px)": {
          maxWidth: "300px",
        },
        gap: "12px",
        position: "relative",
        ...containerSx,
      }}
    >
      <Stack
        sx={{
          display: "flex",
          gap: "12px",
          flexDirection: "row",
        }}
      >
        <TextRob16FontL
          sx={{
            fontWeight: 400,
            lineHeight: "16px",
            color: theme[mode].primary,
            ...sxLabel,
          }}
        >
          {label}
        </TextRob16FontL>
        {required && (
          <TextRob12Font2Xs
            sx={{
              fontWeight: 400,
              lineHeight: "16px",
              color: theme[mode].tertiary,
              ...sxLabel,
            }}
          >
            (Obrigatório)
          </TextRob12Font2Xs>
        )}
      </Stack>
      <TextField
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        sx={{
          width: "100%",
          backgroundColor: theme[mode].grayLight,
          borderRadius: "12px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none",
            },
            "&:hover fieldset": {
              border: "none",
            },
            "&.Mui-focused fieldset": {
              border: `1px solid ${theme[mode].blue}`,
              borderRadius: "12px",
            },
          },
          ".MuiInputBase-input": {
            padding: "4px 8px",
            paddingLeft: "16px",
            ...(icon && { paddingRight: "40px" }),
            height: "32px",
            color: theme[mode].primary,
            ...(type === "password" && { paddingRight: "40px" }),
            "&::placeholder": {
              color: theme[mode].tertiary,
              opacity: 1,
            },
          },
          "& .Mui-disabled": {
            cursor: "not-allowed",
            WebkitTextFillColor: theme[mode].primary + " !important",
            opacity: 1,
          },
          ...sx,
        }}
        id={`outlined-adornment-${label}`}
        placeholder={placeholder}
        aria-describedby={`outlined-${label}-helper-text`}
      />
      <Stack
        sx={{
          width: "28px",
          height: "28px",
          position: "absolute",
          right: "8px",
          top: "36px",
        }}
      >
        {icon && icon}
      </Stack>
    </FormControl>
  );
};

export default LabelInputMsp;
