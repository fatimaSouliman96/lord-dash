import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import logo from "../../../public/new-logo.svg";
import type { LoginResponse } from "../../types/types";
import { useNavigate } from "react-router-dom";
import CircularProgress from "../../components/progressBar/CircularProgress";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { fetchFunc } from "../../api/fetchData";
import Cookies from "js-cookie";

// 🧱 1. إنشاء الـ schema باستخدام Zod
const loginSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صالح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  rememberMe: z.boolean().optional(),
});

// 🧠 2. إنشاء type تلقائي من الـ schema
type LoginFormData = z.infer<typeof loginSchema>;

export default function LogIn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // 🔄 فحص الـ localStorage لتسجيل الدخول التلقائي
  useEffect(() => {
    const rememberFlag = localStorage.getItem("rememberMeActive");
    if (rememberFlag === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

  // 📤 إرسال البيانات
  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);

    try {
      const { data: result, error, status } = await fetchFunc<LoginResponse>(
        `login`,
        "post",
        data
      );

      if (status === 200 && result) {
        // خزن التوكن في الكوكيز فقط
        const cookieOptions = {
          secure: true,
          sameSite: "strict" as const,
          expires: 30, // يمكن تغييرها حسب سياساتك
        };
        Cookies.set("token", result.token, cookieOptions);

        // إذا تذكرني مفعل، خزّن علامة في localStorage
        if (data.rememberMe) {
          localStorage.setItem("rememberMeActive", "true");
        } else {
          localStorage.removeItem("rememberMeActive");
        }

        toast.success("تم تسجيل الدخول بنجاح!");
        navigate("dashboard");
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
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center relative">
      <Toaster position='top-center' />
      {loading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
          <CircularProgress indeterminate color="text-blue-950" />
        </div>
      )}

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="w-[30%] m-auto shadow rounded-xl p-16 space-y-4 bg-white relative z-10"
      >
        <div className="w-[50%] mx-auto">
          <img src={logo} className="w-full mx-auto" alt="Logo" />
        </div>

        <h1 className="text-center text-blue-950 text-3xl font-extrabold py-4">
          تسجيل دخول
        </h1>

        {/* 📧 Email Field */}
        <div className="flex flex-col text-right gap-1">
          <label htmlFor="email">الإيميل</label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="text-right outline-gray-300 p-2 text-blue-950 h-10 border border-gray-200 shadow rounded-xl"
            placeholder="xxxxxx@xxxxxx.xxx"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* 🔒 Password Field */}
        <div className="flex flex-col text-right gap-1">
          <label htmlFor="password">كلمة السر</label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="text-right outline-gray-300 p-2 text-blue-950 h-10 border border-gray-200 shadow rounded-xl"
            placeholder="***********"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* 🔘 Remember Me */}
        <div className="flex items-center gap-2 text-right">
          <input
            type="checkbox"
            id="rememberMe"
            {...register("rememberMe", { setValueAs: v => !!v })}
            className="h-4 w-4"
          />
          <label htmlFor="rememberMe">تذكرني</label>
        </div>

        {/* 🚀 Submit Button */}
        <div className="flex flex-col text-right gap-1 pt-4">
          <input
            id="submit"
            type="submit"
            disabled={loading}
            className={`text-center p-2 text-white cursor-pointer bg-blue-950 h-10 border border-gray-200 shadow rounded-xl ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            value={loading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
          />
        </div>
      </form>
    </div>
  );
}


