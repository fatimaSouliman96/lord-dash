import { MdAddCircle } from "react-icons/md";
import { useState } from "react";
import { fetchFunc } from "../../api/fetchData";
import toast from "react-hot-toast";
import type { settings } from "../../types/types";

export default function AddSettings({
  close,
  fetchData,
}: {
  close: () => void;
  fetchData: () => void;
}) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !description) {
      toast.error("يرجى تعبئة جميع الحقول");
      return;
    }

    setLoading(true);
    try {
      const { data: result, error, status } = await fetchFunc<settings>(
        "settings", // رابط API الإعدادات
        "post",
        { title, description }
      );

      if (status === 201 && result) {
        toast.success("تمت إضافة الإعداد بنجاح!");
        fetchData();
        close();
        setTitle("");
        setDescription("");
        return;
      }

      if (error) {
        toast.error(error);
        console.error(`API Error (${status}):`, error);
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
      setDescription("")
      setTitle("")
    }
  };

  return (
    <form>
      <h1 className="text-xl text-center text-blue-950 font-semibold">
        إضافة إعداد جديد
      </h1>

      {/* العنوان */}
      <div className="flex flex-col text-right gap-1 pt-6">
        <label htmlFor="title">العنوان</label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          id="title"
          type="text"
          value={title}
          className="text-right outline-gray-300 p-2 text-blue-950 h-10 border border-gray-200 shadow rounded-xl"
        />
      </div>

      {/* الوصف */}
      <div className="flex flex-col text-right gap-1 pt-4">
        <label htmlFor="description">الوصف</label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          id="description"
          value={description}
          rows={4}
          className="text-right outline-gray-300 p-2 text-blue-950 border border-gray-200 shadow rounded-xl"
        />
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
