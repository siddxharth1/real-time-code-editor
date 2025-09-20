import React, { useEffect, useState } from "react";
import { getLanguages } from "../api";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

const LanguageSelector = ({
  language = { language: "javascript", version: "18.15.0" },
  onLanguageChange,
}) => {
  const [languages, setLanguages] = useState([]);
  useEffect(() => {
    const getLanguagesHandler = async () => {
      const data = await getLanguages();
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
      defaultItems={languages}
      allowsCustomValue={false}
      selectedKey={JSON.stringify(language)}
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
