import React from "react";
import { Box, Button, Stack } from "@mui/material";
import { useZTheme } from "../../../stores/useZTheme";
import { useZMspRegisterPage } from "../../../stores/useZMspRegisterPage";
import StepOneInformations from "./StepOneInformations";
import StepTwoAdministrator from "./StepTwoAdministrator";
import { Btn } from "../../../components/Buttons/Btn";
import { TextRob16Font1S } from "../../../components/Text1S";
import { useTranslation } from "react-i18next";
import { useBrandMasterResources } from "../../../hooks/useBrandMasterResources";
import { AbsoluteBackDrop } from "../../../components/AbsoluteBackDrop";
import { isValidCNPJ } from "../../../utils/isValidCNPJ";
import { toast } from "react-toastify";

const MSPRegisterForm = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const {
    activeStep,
    setActiveStep,
    companyName,
    locality,
    cnpj,
    cep,
    city,
    phone,
    sector,
    contactEmail,
    streetNumber,
    mspDomain,
    countryState,
    street,
    isPoc,
    isEditing,
    brandLogoUrl,
    admName,
    admEmail,
    admPhone,
    resetAll,
    setIsEditing,
  } = useZMspRegisterPage();
  const { createAnewBrandMaster, isLoading } = useBrandMasterResources();

  const handleNext = () => {
    if (!isValidCNPJ(cnpj)) {
      toast.error(t("mspRegister.cnpjAlertMessage"));
      return;
    }
    setActiveStep(1);
  };
  const handleBack = () => setActiveStep(0);

  const disabledProceedBtn =
    !companyName || !locality || !cnpj || !sector || !contactEmail;

  const handleCreateMSP = async () => {
    const msp = {
      companyName,
      locality,
      cnpj,
      phone,
      sector,
      contactEmail,
      cep,
      city,
      countryState,
      street,
      streetNumber,
      isPoc,
      mspDomain,
      brandLogo: brandLogoUrl,
      admName,
      admEmail,
      admPhone,
      admPassword: "UserPass@123!#",
      position: "admin",
    };

    await createAnewBrandMaster(msp);
  };

  return (
    <Stack
      sx={{
        width: "100%",
        gap: "26px",
        borderRadius: "16px",
        boxSizing: "border-box",
      }}
    >
      {isLoading && <AbsoluteBackDrop open={isLoading} />}
      {
        <Stack
          sx={{
            background: theme[mode].mainBackground,
            borderRadius: "16px",
            width: "100%",
            padding: "24px",
            boxSizing: "border-box",
          }}
        >
          <Stack
            sx={{
              gap: "40px",
            }}
          >
            {activeStep === 0 && <StepOneInformations />}

            {activeStep === 1 && <StepTwoAdministrator />}

            {/* Action button */}
            {activeStep === 0 ? (
              <Stack
                sx={{
                  "@media (min-width: 660px)": {
                    flexDirection: "row",
                  },
                  alignItems: "center",
                  gap: "24px",
                }}
              >
                <Btn
                  onClick={handleNext}
                  disabled={disabledProceedBtn}
                  sx={{
                    width: "260px",
                    padding: "14px 24px",
                    backgroundColor: theme[mode].blue,
                    borderRadius: "12px",
                    "@media (min-width: 660px)": {
                      minWidth: "160px",
                    },
                  }}
                >
                  <TextRob16Font1S
                    sx={{
                      color: theme[mode].btnText,
                      fontSize: "16px",
                      fontWeight: "500",
                      lineHeight: "20px",
                    }}
                  >
                    {t("mspRegister.proceed")}
                  </TextRob16Font1S>
                </Btn>
                <Btn
                  sx={{
                    width: "260px",
                    padding: "14px 24px",
                    backgroundColor: "transparent",
                    border: "1px solid " + theme[mode].gray,
                    borderRadius: "12px",
                    gap: "8px",
                    ":disabled": {
                      cursor: "not-allowed",
                    },
                  }}
                  onClick={() => {
                    resetAll();
                    setIsEditing([]);
                  }}
                >
                  <TextRob16Font1S
                    sx={{
                      color: theme[mode].gray,
                      fontSize: "16px",
                      fontWeight: "500",
                      lineHeight: "20px",
                    }}
                  >
                    {t("mspRegister.cancel")}
                  </TextRob16Font1S>
                </Btn>
              </Stack>
            ) : (
              <Stack
                sx={{
                  "@media (min-width: 780px)": {
                    flexDirection: "row",
                    justifyContent: "space-between",
                  },
                  alignItems: "center",
                  gap: "24px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "12px",
                    flexDirection: "column",
                    "@media (min-width: 780px)": {
                      flexDirection: "row",
                      justifyContent: "space-between",
                    },
                  }}
                >
                  <Btn
                    onClick={handleCreateMSP}
                    disabled={!mspDomain || isEditing.length > 0}
                    sx={{
                      width: "260px",
                      padding: "14px 24px",
                      backgroundColor: theme[mode].blue,
                      borderRadius: "12px",
                      "@media (min-width: 660px)": {
                        minWidth: "160px",
                      },
                    }}
                  >
                    <TextRob16Font1S
                      sx={{
                        color: theme[mode].btnText,
                        fontSize: "16px",
                        fontWeight: "500",
                        lineHeight: "20px",
                      }}
                    >
                      {t("mspRegister.confirm")}
                    </TextRob16Font1S>
                  </Btn>
                  <Btn
                    sx={{
                      width: "260px",
                      padding: "14px 24px",
                      backgroundColor: "transparent",
                      border: "1px solid " + theme[mode].gray,
                      borderRadius: "12px",
                      gap: "8px",
                      ":disabled": {
                        cursor: "not-allowed",
                      },
                    }}
                    onClick={handleBack}
                  >
                    <TextRob16Font1S
                      sx={{
                        color: theme[mode].gray,
                        fontSize: "16px",
                        fontWeight: "500",
                        lineHeight: "20px",
                      }}
                    >
                      {t("mspRegister.back")}
                    </TextRob16Font1S>
                  </Btn>
                </Box>
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
                    "@media (min-width: 950px)": {
                      marginRight: "4rem",
                    },
                  }}
                  onClick={() => {
                    resetAll();
                  }}
                >
                  {t("mspRegister.clear")}
                </Button>
              </Stack>
            )}
          </Stack>
        </Stack>
      }
    </Stack>
  );
};

export default MSPRegisterForm;
