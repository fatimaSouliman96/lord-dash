import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import PopUp from "../popUp/PopUp";
import EditCity from "../forms/EditCity";
import Delete from "../forms/Delete";
import EditRegion from "../forms/EditRegion";
import EditPackage from "../forms/EditPackage";
import type { city, Package, region } from "../../types/types";
import { fetchFunc } from "../../api/fetchData";
import toast from "react-hot-toast";
import EditProvider from "../forms/EditProvider";
import EditTestimonial from "../forms/EditTestimonial";
import EditBranch from "../forms/EditBranch";
import EditFAQ from "../forms/EditForm";
import EditSettings from "../forms/EditSetting";

type Column = {
  key: string;
  label: string;
};

type TableProps = {
  columns: Column[];
  rows: Record<string, any>[];
  fetchData: () => void;
  loading?: boolean;
  page: string;
  cities?: city[];
  regions?: region[];
  url?: string,
  packages?: Package[]
};

const getValue = (obj: any, key: string) => {
  return key.split(".").reduce((acc, k) => (acc ? acc[k] : ""), obj);
};

const Table: React.FC<TableProps> = ({
  columns,
  rows,
  fetchData,
  url,
  page,
  cities,
  regions,
  packages
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false)
  const [typeForm, setTypeForm] = useState("");
  const [selectedRow, setSelectedRow] = useState<Record<string, any> | null>(null);

  const handleOpenPop = (type?: string, rowData?: Record<string, any>) => {
    if (type) setTypeForm(type);
    if (rowData) setSelectedRow(rowData);
    setOpen((prev) => !prev);
  };

  const deleteElement = async (id: number) => {
    setLoading(true)
    try {
      const { data: result, error, status } = await fetchFunc<city>(
        `${url}/${id}`, "DELETE")

      if (status === 200 && result) {
        toast.success("تم الحذف بنجاح!");
        handleOpenPop()
        return;
      }

      if (error) {
        toast.error(error);
        console.error(`API Error (${status}):`, error);
      } else {
        toast.error("حدث خطأ غير متوقع. حاول مرة أخرى.");
        console.warn("Unexpected login response:", result);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      toast.error(message);
      console.error("Login exception:", err);
    } finally {
      close()
      setLoading(false)
      fetchData()
    }
  }
  return (
    <div className="overflow-x-auto w-full mt-8 rounded-lg">
      <table className="min-w-full text-right">
        <thead>
          <tr className="bg-blue-200">
            {columns.map((col) => (
              <th
                key={col.key}
                className="py-3 px-4 border-l-8 border-white rounded-lg font-semibold text-gray-700"
              >
                {col.label}
              </th>
            ))}
            <th className="py-3 px-4 font-semibold border-l-8 border-white rounded-lg text-gray-700" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-200 hover:bg-gray-50 transition">
              {columns.map((col) => (
                <td key={col.key} className="py-3 px-4">
                  {getValue(row, col.key)}
                </td>
              ))}
              <td className="py-3 px-4 flex gap-4">
                <MdDelete
                  onClick={() => handleOpenPop("1", row)}
                  color="red"
                  size={30}
                  className="cursor-pointer"
                />
                <CiEdit
                  onClick={() => handleOpenPop("2", row)}
                  color="green"
                  size={30}
                  className="cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ PopUp خارج الجدول */}
      {open && selectedRow && (
        <PopUp open={open} onClose={handleOpenPop}>
          {typeForm === "2" && page === "cities" && (
            <EditCity
              fetchData={fetchData}
              close={handleOpenPop}
              id={selectedRow["id"]}
              name={selectedRow["name"]}
            />
          )}
          {typeForm === "2" && page === "regions" && cities && (
            <EditRegion
              cities={cities}
              fetchData={fetchData}
              close={handleOpenPop}
              id={selectedRow["id"]}
              oldName={selectedRow["name"]}
              cityId={selectedRow["city_id"]}
            />
          )}
          {typeForm === "2" && page === "packages" && regions && (
            <EditPackage
              fetchData={fetchData}
              close={handleOpenPop}
              pkg={selectedRow}
              regions={regions || []}
            />
          )}
          {typeForm === "2" && page === "providers" && packages && (
            <EditProvider
              fetchData={fetchData}
              close={handleOpenPop}
              provider={selectedRow}
              packages={packages || []}
            />
          )}
          {typeForm === "2" && page === "clients" && (
            <EditTestimonial
              fetchData={fetchData}
              close={handleOpenPop}
              testimonial={selectedRow}
            />
          )}
          {typeForm === "2" && page === "branches" && (
            <EditBranch
              fetchData={fetchData}
              close={handleOpenPop}
              branch={selectedRow}
            />
          )}
          {typeForm === "2" && page === "faqs" && (
            <EditFAQ
              fetchData={fetchData}
              close={handleOpenPop}
              currentFAQ={selectedRow}
            />
          )}
          {typeForm === "2" && page === "Settings" && (
            <EditSettings
              fetchData={fetchData}
              close={handleOpenPop}
              currentSetting={selectedRow}
            />
          )}
          {typeForm === "1" && (
            <Delete
              loading={loading || false}
              deleteElement={deleteElement}
              id={selectedRow["id"]}
            />
          )}
        </PopUp>
      )}
    </div>
  );
};

export default Table;

