import { MdAddCircle } from "react-icons/md";
import { useState } from "react";
import { postData } from "../../api/postData";
import toast from "react-hot-toast";
import type { faq } from "../../types/types";


export default function AddFAQ({
  close,
  fetchData,
}: {
  close: () => void;
  fetchData: () => void;
}) {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!question || !answer) {
      toast.error("يرجى تعبئة جميع الحقول");
      return;
    }

    setLoading(true);
    try {
      const { data: result, error, status } = await postData<faq>(
        "faqs", // رابط الـ API الخاص بالأسئلة
        "post",
        { question, answer }
      );

      if (status === 201 && result) {
        toast.success("تمت إضافة السؤال بنجاح!");
        fetchData();
        close();
        setQuestion("");
        setAnswer("");
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
        إضافة سؤال جديد
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
        <MdAddCircle color="white" />
        {loading ? "جارٍ الإضافة..." : "إضافة"}
      </button>
    </form>
  );
}
