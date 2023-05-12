"use client";
import { CountrySelectValue } from "@/app/hooks/useCountry";
import CountrySelect from "../../inputs/country-select.input.component";
import Heading from "../../heading/heading.component";

interface LocationStepProps {
  setCustomValue: (id: string, value: any) => void;
  locationSelected: CountrySelectValue;
}

const LocationStep: React.FC<LocationStepProps> = ({
  setCustomValue,
  locationSelected,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where is your place located"
        subtitle="Help guest find you!"
      />
      <CountrySelect
        value={locationSelected}
        onChange={(value) =>
          setCustomValue("location", value)
        }
      />
    </div>
  );
};

export default LocationStep;
