import { Input, Select, Tooltip } from "@pankod/refine-antd";
import { SearchAction } from "Containers/Actions/ConfigsActions";
import React, { useState } from "react";

import { RiFilterOffLine } from "react-icons/ri";
const { Option } = Select;
interface Props {
  path: string;
  data: any[];
  searchResults: any[];
  setSearchResults: (val: any) => void;
}
export const Search = ({
  path,
  setSearchResults,
  searchResults,
  data,
}: Props) => {
  const [searchType, setSearchType] = useState<string>(
    path === "user" ? "id" : "_id"
  );
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = (value: string) => {
    SearchAction(searchType, value, data, setSearchResults);
  };
  return (
    <>
      <Input.Group compact>
        <Select
          placeholder={"Search as.."}
          style={{ width: 130 }}
          onChange={(val: string) => setSearchType(val)}
        >
          {path.includes("user") && (
            <>
              <Option value="id">ID</Option>
              <Option value="name">Name</Option>
              <Option value="username">Username</Option>
              <Option value="email">Email</Option>
            </>
          )}
          {path.includes("order") && (
            <>
              <Option value="_id">ID</Option>
              <Option value="name">Name</Option>
              <Option value="phonenumber">Phone Number</Option>
              <Option value="email">Email</Option>
            </>
          )}

          {path.includes("product") && (
            <>
              <Option value="_id">ID</Option>
              <Option value="name">Name</Option>
              <Option value="price">Price</Option>
            </>
          )}

          {path.includes("globalLink") && (
            <>
              <Option value="_id">ID</Option>
              <Option value="title">Title</Option>
              <Option value="placeholder">placeholder</Option>
            </>
          )}

          {path.includes("title") && (
            <>
              <Option value="_id">ID</Option>
              <Option value="title">Title</Option>
            </>
          )}
        </Select>
        <Input.Search
          placeholder={"Search..."}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSearch={(value) =>
            value ? handleSearch(value) : setSearchResults([])
          }
          allowClear
          style={{ width: 250 }}
        />
      </Input.Group>
      {searchResults?.length > 0 && (
        <Tooltip
          placement="top"
          title={<p style={{ marginBottom: -1 }}>{"Cancel Search"}</p>}
          style={{ maxWidth: 20 }}
        >
          <RiFilterOffLine
            color="#f40c0c"
            size={30}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSearchResults([]);
              setSearchValue("");
            }}
            className="icons"
          />
        </Tooltip>
      )}
    </>
  );
};
