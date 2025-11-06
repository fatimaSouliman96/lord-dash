import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { postData } from "../../api/postData";
import toast from "react-hot-toast";
import type { Testimonial } from "../../types/types";

export default function EditTestimonial({
  close,
  fetchData,
  testimonial,
}: {
  close: () => void;
  fetchData: () => void;
  testimonial: Record<string, any>;
}) {
  const [name, setName] = useState<string>(testimonial.name);
  const [position, setPosition] = useState<string>(testimonial.position);
  const [comment, setComment] = useState<string>(testimonial.comment);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !position || !comment) {
      toast.error("يرجى تعبئة جميع الحقول");
      return;
    }

    setLoading(true);
    try {
      const { data: result, error, status } = await postData<Testimonial>(
        `testimonials/${testimonial.id}`,
        "put", // أو "put" حسب الـ API عندك
        { name, position, comment } // Laravel-friendly update
      );

      if (status === 200 && result) {
        toast.success("تم تعديل التقييم بنجاح!");
        fetchData();
        close();
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
    }
  };

  return (
    <form>
      <h1 className="text-xl text-center text-blue-950 font-semibold">
        تعديل التقييم
      </h1>

      {/* الاسم */}
      <div className="flex flex-col text-right gap-1 pt-6">
        <label htmlFor="name">الاسم</label>
        <input
          onChange={(e) => setName(e.target.value)}
          id="name"
          type="text"
          value={name}
          className="text-right outline-gray-300 p-2 text-blue-950 h-10 border border-gray-200 shadow rounded-xl"
        />
      </div>

      {/* الوظيفة */}
      <div className="flex flex-col text-right gap-1 pt-4">
        <label htmlFor="position">الوظيفة</label>
        <input
          onChange={(e) => setPosition(e.target.value)}
          id="position"
          type="text"
          value={position}
          className="text-right outline-gray-300 p-2 text-blue-950 h-10 border border-gray-200 shadow rounded-xl"
        />
      </div>

      {/* التعليق */}
      <div className="flex flex-col text-right gap-1 pt-4">
        <label htmlFor="comment">التعليق</label>
        <textarea
          onChange={(e) => setComment(e.target.value)}
          id="comment"
          value={comment}
          rows={3}
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
        <MdEdit color="white" />
        {loading ? "جارٍ الحفظ..." : "حفظ التعديلات"}
      </button>
    </form>
  );
}
