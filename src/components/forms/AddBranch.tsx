import { MdAddCircle } from "react-icons/md";
import { useState } from "react";
import { postData } from "../../api/postData";
import toast from "react-hot-toast";
import type { Branch } from "../../types/types";

export default function AddBranch({
  close,
  fetchData,
}: {
  close: () => void;
  fetchData: () => void;
}) {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [status, setStatus] = useState<string>("sub");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !address || !phone || !status) {
      toast.error("يرجى تعبئة جميع الحقول");
      return;
    }

    setLoading(true);
    try {
      const { data: result, error, status: resStatus } = await postData<Branch>(
        "branches",
        "post",
        { name, address, phone, status }
      );

      if (resStatus === 201 && result) {
        toast.success("تمت إضافة الفرع بنجاح!");
        fetchData();
        close();
        setName("")
        setAddress("")
        setPhone("")
        setStatus("")
        return;
      }

      if (error) {
        toast.error(error);
        console.error(`API Error (${resStatus}):`, error);
      } else {
        toast.error("حدث خطأ غير متوقع. حاول مرة أخرى.");
        console.warn("Unexpected response:", result);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      toast.error(message);
      console.error("Exception:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form>
      <h1 className="text-xl text-center text-blue-950 font-semibold">
        إضافة فرع جديد
      </h1>

      {/* الاسم */}
      <div className="flex flex-col text-right gap-1 pt-6">
        <label htmlFor="name">اسم الفرع</label>
        <input
          onChange={(e) => setName(e.target.value)}
          id="name"
          type="text"
          value={name}
          className="text-right outline-gray-300 p-2 text-blue-950 h-10 border border-gray-200 shadow rounded-xl"
        />
      </div>

      {/* العنوان */}
      <div className="flex flex-col text-right gap-1 pt-4">
        <label htmlFor="address">العنوان</label>
        <input
          onChange={(e) => setAddress(e.target.value)}
          id="address"
          type="text"
          value={address}
          className="text-right outline-gray-300 p-2 text-blue-950 h-10 border border-gray-200 shadow rounded-xl"
        />
      </div>

      {/* الهاتف */}
      <div className="flex flex-col text-right gap-1 pt-4">
        <label htmlFor="phone">رقم الهاتف</label>
        <input
          onChange={(e) => setPhone(e.target.value)}
          id="phone"
          type="text"
          value={phone}
          className="text-right outline-gray-300 p-2 text-blue-950 h-10 border border-gray-200 shadow rounded-xl"
        />
      </div>

      {/* الحالة */}
      <div className="flex flex-col text-right gap-1 pt-4">
        <label htmlFor="status">الحالة</label>
        <select
          onChange={(e) => setStatus(e.target.value)}
          id="status"
          value={status}
          className="text-right outline-gray-300 p-2 text-blue-950 h-10 border border-gray-200 shadow rounded-xl"
        >
          <option value="sub">فرعي</option>
          <option value="main">رئيسي</option>
        </select>
      </div>

      {/* الزر */}
      <button
        disabled={loading}
        type="button"
        onClick={handleSubmit}
        className="w-4/12 mt-8 h-10 cursor-pointer rounded-lg bg-blue-950 gap-2 text-white flex items-center justify-center"
      >
        <MdAddCircle color="white" />
        {loading ? "جارٍ الإضافة..." : "إضافة"}
      </button>
    </form>
  );
}
