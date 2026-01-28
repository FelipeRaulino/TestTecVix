import React from "react";
import { Box, Divider, Stack } from "@mui/material";
import { useZTheme } from "../../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { TextRob16Font1S } from "../../../components/Text1S";
import LabelInputMsp from "./LabelInputMsp";
import { maskCNPJ } from "../../../utils/maskCNPJ";
import { maskPhone } from "../../../utils/maskPhone";
import { EditCirclePencilIcon } from "../../../icons/EditCirclePencilIcon";
import { maskCEP } from "../../../utils/maskCEP";
import { AbsoluteBackDrop } from "../../../components/AbsoluteBackDrop";
import { toast } from "react-toastify";
import { CheckboxLabel } from "../../../components/CheckboxLabel";
import { useZMspRegisterPage } from "../../../stores/useZMspRegisterPage";

const StepOneInformations = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();

  const {
    companyName,
    setCompanyName,
    locality,
    setLocality,
    cnpj,
    setCnpj,
    phone,
    setPhone,
    sector,
    setSector,
    contactEmail,
    setContactEmail,
    cep,
    setCep,
    city,
    setCity,
    street,
    setStreet,
    countryState,
    setCountryState,
    streetNumber,
    setStreetNumber,
    isPoc,
    setIsPoc,
  } = useZMspRegisterPage();
  const [minimumConsumption, setMinimumConsumption] = React.useState("");
  const [discountPercentage, setDiscountPercentage] = React.useState("");

  const [isLoadingCEP, setIsLoadingCEP] = React.useState(false);

  React.useEffect(() => {
    const fetchAddress = async () => {
      const cleanCEP = cep?.replace(/\D/g, "");

      if (cleanCEP?.length === 8) {
        setIsLoadingCEP(true);
        try {
          const response = await fetch(
            `https://viacep.com.br/ws/${cleanCEP}/json/`,
          );
          const data = await response.json();

          if (!data.erro) {
            setCity(data.localidade);
            setCountryState(data.uf);
            setStreet(data.logradouro);
            setIsLoadingCEP(false);
          } else {
            toast.error("CEP não encontrado.");
            setIsLoadingCEP(false);
          }
        } catch (error) {
          console.error("Erro ao buscar o CEP:", error);
          setIsLoadingCEP(false);
        }
      }
    };

    fetchAddress();
  }, [cep, setCity, setCountryState, setStreet]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "24px",
        flexDirection: "column",
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
        {t("mspRegister.stepOneTitle")}
      </TextRob16Font1S>
      {isLoadingCEP ? (
        <AbsoluteBackDrop open={isLoadingCEP} />
      ) : (
        <>
          <Stack
            sx={{
              gap: "24px",
              "@media (min-width: 950px)": {
                alignItems: "center",
                flexDirection: "row",
              },
            }}
          >
            <LabelInputMsp
              onChange={(value) => setCompanyName(value)}
              value={companyName}
              label={t("mspRegister.companyName")}
              placeholder={"Vituax"}
              required
              icon={<EditCirclePencilIcon fill={theme[mode].blueMedium} />}
            />
            <LabelInputMsp
              onChange={(value) => setLocality(value)}
              value={locality}
              label={t("mspRegister.location")}
              placeholder={"Brasil"}
              required
              icon={<EditCirclePencilIcon fill={theme[mode].blueMedium} />}
            />
            <LabelInputMsp
              onChange={(value) => setCnpj(value)}
              value={maskCNPJ(cnpj)}
              label={t("mspRegister.cnpj")}
              placeholder={"00.000.000/0001-00"}
              required
              icon={<EditCirclePencilIcon fill={theme[mode].blueMedium} />}
            />
          </Stack>
          <Stack
            sx={{
              gap: "24px",
              marginTop: "1.5rem",
              "@media (min-width: 820px)": {
                alignItems: "center",
                flexDirection: "row",
              },
            }}
          >
            <LabelInputMsp
              onChange={(value) => setPhone(value)}
              value={maskPhone(phone)}
              label={t("mspRegister.phone")}
              placeholder={"(00) 00000-0000"}
              icon={<EditCirclePencilIcon fill={theme[mode].blueMedium} />}
            />
            <LabelInputMsp
              onChange={(value) => setSector(value)}
              value={sector}
              label={t("mspRegister.sector")}
              placeholder={"Telecom"}
              required
              icon={<EditCirclePencilIcon fill={theme[mode].blueMedium} />}
            />
            <LabelInputMsp
              onChange={(value) => setContactEmail(value)}
              value={contactEmail}
              label={t("mspRegister.contactEmail")}
              placeholder={"vituax@gmail.com"}
              required
              icon={<EditCirclePencilIcon fill={theme[mode].blueMedium} />}
            />
          </Stack>
          <Stack
            sx={{
              gap: "24px",
              marginTop: "1.5rem",
              "@media (min-width: 660px)": {
                flexDirection: "row",
              },
            }}
          >
            <LabelInputMsp
              onChange={(value) => setCep(value)}
              value={maskCEP(cep)}
              label={t("mspRegister.cep")}
              placeholder={"00000-000"}
              icon={<EditCirclePencilIcon fill={theme[mode].blueMedium} />}
            />
            <LabelInputMsp
              onChange={(value) => setCity(value)}
              value={city}
              label={t("mspRegister.city")}
              placeholder={t("mspRegister.cityPlaceholder")}
              icon={<EditCirclePencilIcon fill={theme[mode].blueMedium} />}
            />
            <LabelInputMsp
              onChange={(value) => setCountryState(value)}
              value={countryState}
              label={t("mspRegister.countryState")}
              placeholder={t("mspRegister.countryStatePlaceholder")}
              icon={<EditCirclePencilIcon fill={theme[mode].blueMedium} />}
            />
          </Stack>
          <Stack
            sx={{
              gap: "24px",
              marginTop: "1.5rem",
              "@media (min-width: 660px)": {
                flexDirection: "row",
              },
            }}
          >
            <LabelInputMsp
              onChange={(value) => setStreet(value)}
              value={street}
              label={t("mspRegister.address")}
              placeholder={t("mspRegister.streetPlaceholder")}
              icon={<EditCirclePencilIcon fill={theme[mode].blueMedium} />}
            />
            <LabelInputMsp
              onChange={(value) => setStreetNumber(value)}
              value={streetNumber}
              label={t("mspRegister.number")}
              placeholder={"1088"}
              icon={<EditCirclePencilIcon fill={theme[mode].blueMedium} />}
            />
          </Stack>
          <Divider
            sx={{
              borderColor: theme[mode].grayLight,
              margin: "1rem 0",
            }}
          />
          <Stack
            sx={{
              gap: "24px",
              "@media (min-width: 920px)": {
                flexDirection: "row",
              },
            }}
          >
            <LabelInputMsp
              onChange={setMinimumConsumption}
              value={minimumConsumption}
              label={t("mspRegister.minConsumption")}
              placeholder={"0"}
            />
            <LabelInputMsp
              onChange={setDiscountPercentage}
              value={discountPercentage}
              label={t("mspRegister.discountPercentage")}
              placeholder={"0"}
              icon={
                <TextRob16Font1S
                  sx={{
                    color: theme[mode].blueMedium,
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "24px",
                  }}
                >
                  %
                </TextRob16Font1S>
              }
            />
            <CheckboxLabel
              label={t("mspRegister.isPoc")}
              checked={isPoc}
              handleChange={() => setIsPoc(!isPoc)}
              sx={{
                "@media (min-width: 920px)": {
                  alignSelf: "flex-end",
                },
              }}
            />
          </Stack>
        </>
      )}
    </Box>
  );
};

export default StepOneInformations;
