import { Combobox, ComboboxInput, ComboboxItem, ComboboxPopup } from "woozui";

type Country = { value: string; label: string };

const countries: Country[] = [
  { value: "al", label: "Albania" },
  { value: "at", label: "Austria" },
  { value: "be", label: "Belgium" },
  { value: "br", label: "Brazil" },
  { value: "ca", label: "Canada" },
  { value: "dk", label: "Denmark" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
  { value: "gr", label: "Greece" },
  { value: "in", label: "India" },
  { value: "it", label: "Italy" },
  { value: "jp", label: "Japan" },
  { value: "xk", label: "Kosovo" },
  { value: "mx", label: "Mexico" },
  { value: "nl", label: "Netherlands" },
  { value: "no", label: "Norway" },
  { value: "pt", label: "Portugal" },
  { value: "es", label: "Spain" },
  { value: "se", label: "Sweden" },
  { value: "ch", label: "Switzerland" },
  { value: "gb", label: "United Kingdom" },
  { value: "us", label: "United States" },
];

export const Example = () => (
  <Combobox items={countries} defaultValue={countries[0]}>
    <ComboboxInput
      aria-label="Country"
      placeholder="Search countries"
      className="w-64"
    />
    <ComboboxPopup empty="No countries found">
      {(country: Country) => (
        <ComboboxItem key={country.value} value={country}>
          <img
            src={`https://flagcdn.com/${country.value}.svg`}
            alt=""
            className="size-5 shrink-0 rounded-full object-cover"
          />
          {country.label}
        </ComboboxItem>
      )}
    </ComboboxPopup>
  </Combobox>
);
