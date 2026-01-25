import { /* Button,*/ Stack } from "@mui/material";
/* import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; */
/* import { useZTheme } from "../../../stores/useZTheme";
import { TextRob16FontL } from "../../../components/TextL"; */
import { useTranslation } from "react-i18next";
/* import { makeEllipsis } from "../../../utils/makeEllipsis"; */
import { useZVM } from "../../../stores/useZVM";
import { DropDowText } from "./DropDowText";
import { useVmResource } from "../../../hooks/useVmResource";

/* interface IProps {
  vmNameLabel: string | undefined;
} */

export const BTNISOsSection = (/* { vmNameLabel }: IProps */) => {
  /*  const { mode, theme } = useZTheme(); */
  const { t } = useTranslation();
  /* const { setIsOpenVMMarketPlace } = useZVM(); */
  const { vmOperatingSystemsOptions } = useVmResource();
  const { vmSO, setVmSO } = useZVM();

  return (
    <Stack
      sx={{
        width: "100%",
        gap: "12px",
      }}
    >
      {/* <TextRob16FontL
        sx={{
          fontWeight: 400,
          lineHeight: "16px",
          color: theme[mode].primary,
        }}
      >
        {t("createVm.operationalSystem")}
      </TextRob16FontL> */}
      <DropDowText
        label={t("createVm.operationalSystem")}
        data={vmOperatingSystemsOptions}
        value={vmSO}
        onChange={setVmSO}
      />
    </Stack>
  );
};
