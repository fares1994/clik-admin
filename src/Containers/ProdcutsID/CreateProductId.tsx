import { IResourceComponentsProps } from "@pankod/refine-core";
import React, { useState } from "react";
import {
  Form,
  Input,
  ListButton,
  Typography,
  Create,
  Select,
} from "@pankod/refine-antd";
import {
  CreateMassRecordsAction,
  CreateRecordAction,
} from "Containers/Actions/ConfigsActions";
import { useFormik } from "formik";
import * as XLSX from "xlsx";

const { Text } = Typography;

interface MassInputs {
  createProductsIdMassInput: {
    value: [
      {
        productId?: string;
      }
    ];
    required: boolean;
    type: string;
  };
}

interface Inputs {
  createProductsIdInput: {
    value: {
      productId?: string;
    };
    required: boolean;
    type: string;
  };
}

export const CreateProductId: React.FC<IResourceComponentsProps> = () => {
  const [excelData, setExcelData] = useState<any>(null);
  const [massProducts, setMassProducts] = useState<boolean>(false);

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      productId: "",
    },
    onSubmit: async (submittedValues) => {
      if (massProducts && excelData?.length > 0) {
        const ids = excelData?.map((item: { value: string }) => {
          return { productId: item.value?.toString() };
        });
        const inputs: MassInputs = {
          createProductsIdMassInput: {
            value: ids,
            required: true,
            type: "[CreateProductsIdInput!]",
          },
        };
        CreateMassRecordsAction("createProductsIdMass", inputs);
      }

      if (!massProducts) {
        const inputs: Inputs = {
          createProductsIdInput: {
            value: {},
            required: true,
            type: "CreateProductsIdInput",
          },
        };
        if (submittedValues.productId) {
          inputs.createProductsIdInput.value.productId =
            submittedValues.productId;
        }
        CreateRecordAction("createProductsId", inputs);
      }
    },
  });

  const buttonProps = {
    disables: false,
    loading: false,
    onClick: () => handleSubmit(),
  };

  const handleFile = (e: any) => {
    let selectedFile = e.target.files[0];
    let reader = new FileReader();
    reader.readAsArrayBuffer(selectedFile);
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target?.result, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
    };
  };

  return (
    <Create
      saveButtonProps={buttonProps}
      title={"Create Product ID"}
      pageHeaderProps={{
        extra: (
          <>
            <ListButton>
              <Text>{"Products ID"}</Text>
            </ListButton>
            <Select
              placeholder={massProducts ? "Mass Products" : "Product"}
              options={[
                { label: "Product", value: false },
                { label: "Mass Products", value: true },
              ]}
              onChange={(val) => setMassProducts(val)}
            />
          </>
        ),
      }}
    >
      <Form layout="vertical">
        {massProducts ? (
          <input type="file" onChange={handleFile} required />
        ) : (
          <Form.Item label="Product ID">
            <Input
              name="productId"
              onChange={handleChange}
              value={values.productId}
              placeholder={"product ID..."}
            />
          </Form.Item>
        )}
      </Form>
    </Create>
  );
};
