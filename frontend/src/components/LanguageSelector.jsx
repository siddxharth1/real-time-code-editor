import React, { useEffect, useState } from "react";
import { Language_Versions } from "../constants";
import { getLanguages } from "../api";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
// const languages = Object.entries(Language_Versions);

const LanguageSelector = ({
  language = { language: "javascript", version: "18.15.0" },
  onLanguageChange,
}) => {
  const [languages, setLanguages] = useState([]);
  useEffect(() => {
    const getLanguagesHandler = async () => {
      const data = await getLanguages();
      console.log(data);
      setLanguages(data);
    };
    getLanguagesHandler();
  }, []);

  const onSelectionChange = (id) => {
    onLanguageChange(JSON.parse(id));
  };

  return (
    <Autocomplete
      size="sm"
      label="Language"
      placeholder="Search an language"
      defaultSelectedKey={JSON.stringify(language)}
      defaultItems={languages}
      allowsCustomValue={false}
      className="max-w-xs"
      onSelectionChange={onSelectionChange}
    >
      {(lang) => (
        <AutocompleteItem
          className=""
          key={JSON.stringify({
            language: lang.language,
            version: lang.version,
          })}
          textValue={lang.language}
        >
          {lang.language} - {lang.version}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default LanguageSelector;
