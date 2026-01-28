import React from "react";
import { Box, Button, Divider, Stack } from "@mui/material";
import { useZTheme } from "../../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { TextRob16Font1S } from "../../../components/Text1S";
import LabelInputMsp from "./LabelInputMsp";
import { EditCirclePencilIcon } from "../../../icons/EditCirclePencilIcon";
import { VisibilityOff } from "../../../icons/Visibility";
import { UploadFileIcon } from "../../../icons/UploadFileIcon";
import { TextRob14Font1Xs } from "../../../components/Text1Xs";
import { TextRob12Font2Xs } from "../../../components/Text2Xs";
import { CircleIcon } from "../../../icons/CircleIcon";
import { useDropzone } from "react-dropzone";
import { useUploadFile } from "../../../hooks/useUploadFile";
import { useZUserProfile } from "../../../stores/useZUserProfile";
import { maskPhone } from "../../../utils/maskPhone";
import { useZMspRegisterPage } from "../../../stores/useZMspRegisterPage";

const StepTwoAdministrator = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();

  const {
    mspDomain,
    setMSPDomain,
    brandLogoUrl,
    setBrandLogo,
    admName,
    setAdmName,
    admEmail,
    setAdmEmail,
    admPhone,
    setAdmPhone,
  } = useZMspRegisterPage();
  const [jobTitle, setJobTitle] = React.useState("");
  const [username, setUsername] = React.useState("");
  const { handleUpload, isUploading } = useUploadFile();
  const { setImage } = useZUserProfile();

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0]; // Seleciona o primeiro arquivo
    const response = await handleUpload(file);

    if (response && response.url) {
      setBrandLogo({
        brandLogoUrl: response.url,
        brandObjectName: response.objectName,
      });
    }
  };

  const handleRemoveLogo = () => {
    setImage({
      imageUrl: "",
      objectName: "",
    });
    setBrandLogo({ brandLogoUrl: "", brandObjectName: "" });
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"] },
    maxSize: 50 * 1024 * 1024, // Limita para 50MB
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "24px",
      }}
    >
      <TextRob16Font1S
        sx={{
          color: theme[mode].black,
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "24px",
        }}
      >
        {t("mspRegister.mspDomain")}
      </TextRob16Font1S>
      <LabelInputMsp
        onChange={(value) => setMSPDomain(value)}
        value={mspDomain}
        label={t("mspRegister.domain")}
        placeholder={"xx.xxx.xxx"}
        required
        icon={<EditCirclePencilIcon fill={theme[mode].blueMedium} />}
      />
      <TextRob16Font1S
        sx={{
          color: theme[mode].black,
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "24px",
          marginTop: "0.5rem",
        }}
      >
        {t("mspRegister.stepTwoTitle")}
      </TextRob16Font1S>
      <Stack
        sx={{
          gap: "24px",
          "@media (min-width: 660px)": {
            alignItems: "center",
            flexDirection: "row",
          },
        }}
      >
        <LabelInputMsp
          onChange={(value) => setAdmName(value)}
          value={admName}
          label={t("mspRegister.completeName")}
          placeholder={"josé da Silva"}
          required
          icon={<EditCirclePencilIcon fill={theme[mode].blueMedium} />}
        />
        <LabelInputMsp
          onChange={(value) => setAdmEmail(value)}
          value={admEmail}
          label={t("mspRegister.email")}
          placeholder={"jose@email.com"}
          required
          icon={<EditCirclePencilIcon fill={theme[mode].blueMedium} />}
        />
      </Stack>
      <Stack
        sx={{
          gap: "24px",
          marginTop: "1rem",
          "@media (min-width: 920px)": {
            alignItems: "center",
            flexDirection: "row",
          },
        }}
      >
        <LabelInputMsp
          onChange={(value) => setAdmPhone(value)}
          value={maskPhone(admPhone)}
          label={t("mspRegister.phone")}
          placeholder={"(00) 00000-0000"}
          icon={<EditCirclePencilIcon fill={theme[mode].blueMedium} />}
        />
        <LabelInputMsp
          onChange={setJobTitle}
          value={jobTitle}
          label={t("mspRegister.position")}
          placeholder={"Administrador"}
          icon={<EditCirclePencilIcon fill={theme[mode].blueMedium} />}
        />
        <LabelInputMsp
          onChange={() => {}}
          value={""}
          label={t("mspRegister.initialPassword")}
          placeholder={t("mspRegister.initialPasswordPlaceholder")}
          required
          disabled
          icon={<VisibilityOff fill={theme[mode].blueMedium} />}
        />
        <LabelInputMsp
          onChange={setUsername}
          value={username}
          label={t("mspRegister.username")}
          placeholder={"jose@email.com"}
          icon={<EditCirclePencilIcon fill={theme[mode].blueMedium} />}
        />
      </Stack>
      <Divider
        sx={{
          borderColor: theme[mode].grayLight,
          margin: "1rem 0",
        }}
      />
      <TextRob16Font1S
        sx={{
          color: theme[mode].black,
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "24px",
        }}
      >
        {t("mspRegister.companyLogo")}
      </TextRob16Font1S>
      <TextRob14Font1Xs
        sx={{
          color: theme[mode].gray,
          fontWeight: 500,
          marginTop: "-1rem",
        }}
      >
        {t("mspRegister.companyLogoSubtitle")}
      </TextRob14Font1Xs>
      <Stack sx={{ gap: "24px", width: "100%" }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
          <Box
            {...getRootProps()}
            sx={{
              maxWidth: "329px",
              width: "100%",
              height: "169px",
              border: `1px solid ${theme[mode].grayLight}`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "16px",
              borderRadius: "16px",
              background: isDragActive
                ? theme[mode].grayLight
                : theme[mode].lightV2,
              cursor: "pointer",
            }}
          >
            <input {...getInputProps()} />
            <UploadFileIcon color={theme[mode].tertiary} />
            <TextRob12Font2Xs
              sx={{
                color: theme[mode].tertiary,
                fontWeight: "400",
                fontSize: "12px",
                maxWidth: "136px",
                textAlign: "center",
                lineHeight: "20px",
                userSelect: "none",
              }}
            >
              {isUploading
                ? t("whiteLabel.loading")
                : t("whiteLabel.clickHere")}
            </TextRob12Font2Xs>
          </Box>
          {brandLogoUrl && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <img
                src={brandLogoUrl}
                alt="Logo carregado"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100px",
                  objectFit: "contain",
                }}
              />
            </Box>
          )}
          <Stack sx={{ gap: "32px" }}>
            {/* above stack buttons of change and remove logo */}
            <Stack
              sx={{
                display: "flex",
                gap: "12px",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <Button
                disableRipple
                sx={{
                  boxSizing: "content-box",
                  padding: "0",
                  border: "none",
                  background: "none",
                  textTransform: "none",
                  textDecoration: "underline",
                  color: theme[mode].blueDark,
                  "&:hover": {
                    color: theme[mode].primary,
                    textDecoration: "underline",
                  },
                  "&focus": {
                    outline: "none",
                  },
                }}
                onClick={open}
              >
                {t("profileAndNotifications.changeImage")}
              </Button>
              <Button
                disableRipple
                sx={{
                  boxSizing: "content-box",
                  padding: "0",
                  border: "none",
                  background: "none",
                  textTransform: "none",
                  textDecoration: "underline",
                  color: theme[mode].blueDark,
                  "&:hover": {
                    color: theme[mode].primary,
                    textDecoration: "underline",
                  },
                  "&focus": {
                    outline: "none",
                    background: "none",
                  },
                }}
                onClick={handleRemoveLogo} // Remove o logo
              >
                {t("profileAndNotifications.removeImage")}
              </Button>
            </Stack>
            {/* above stack of size and format infos */}
            <Stack
              sx={{
                gap: "8px",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "12px",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <CircleIcon color={theme[mode].blueDark} />
                <TextRob14Font1Xs
                  sx={{
                    color: theme[mode].gray,
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  {t("whiteLabel.defaultSize")}
                </TextRob14Font1Xs>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "12px",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <CircleIcon color={theme[mode].blueDark} />
                <TextRob14Font1Xs
                  sx={{
                    color: theme[mode].gray,
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  {t("whiteLabel.maxSize")}
                </TextRob14Font1Xs>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "12px",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <CircleIcon color={theme[mode].blueDark} />
                <TextRob14Font1Xs
                  sx={{
                    color: theme[mode].gray,
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  {t("whiteLabel.acceptedFormats")}
                </TextRob14Font1Xs>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      <Divider
        sx={{
          borderColor: theme[mode].grayLight,
          margin: "1rem 0",
        }}
      />
    </Box>
  );
};

export default StepTwoAdministrator;
