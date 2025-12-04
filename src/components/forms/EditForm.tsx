import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { fetchFunc } from "../../api/fetchData";
import toast from "react-hot-toast";
import type { faq } from "../../types/types";

export default function EditFAQ({
  close,
  fetchData,
  currentFAQ,
}: {
  close: () => void;
  fetchData: () => void;
  currentFAQ: Record<string, any>;
}) {
  const [question, setQuestion] = useState<string>(currentFAQ?.question || "");
  const [answer, setAnswer] = useState<string>(currentFAQ?.answer || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!question || !answer) {
      toast.error("يرجى تعبئة جميع الحقول");
      return;
    }

    setLoading(true);
    try {
      const { data: result, error, status } = await fetchFunc<faq>(
        `faqs/${currentFAQ.id}`, // رابط تعديل السؤال الحالي
        "put",
        { question, answer }
      );

      if (status === 200 && result) {
        toast.success("تم تعديل السؤال بنجاح!");
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
        تعديل السؤال
      </h1>

      {/* السؤال */}
      <div className="flex flex-col text-right gap-1 pt-6">
        <label htmlFor="question">السؤال</label>
        <input
          onChange={(e) => setQuestion(e.target.value)}
          id="question"
          type="text"
          value={question}
          className="text-right outline-gray-300 p-2 text-blue-950 h-10 border border-gray-200 shadow rounded-xl"
        />
      </div>

      {/* الإجابة */}
      <div className="flex flex-col text-right gap-1 pt-4">
        <label htmlFor="answer">الإجابة</label>
        <textarea
          onChange={(e) => setAnswer(e.target.value)}
          id="answer"
          value={answer}
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
        <MdEdit color="white" />
        {loading ? "جارٍ التعديل..." : "تعديل"}
      </button>
    </form>
  );
}
